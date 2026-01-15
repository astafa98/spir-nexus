import { getSpirits } from '../spirits/data';

// GET /api/events - SSE поток обновлений
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Отправляем обновления каждые 5 секунд
      const interval = setInterval(() => {
        const spirits = getSpirits();
        const activeSpirits = spirits.filter((s) => s.status === 'active');

        if (activeSpirits.length === 0) {
          return;
        }

        // Выбираем случайного активного духа для обновления
        const randomIndex = Math.floor(Math.random() * activeSpirits.length);
        const spirit = activeSpirits[randomIndex];

        // Случайное изменение уровня энергии
        const energyChange = Math.floor(Math.random() * 21) - 10;
        const newEnergyLevel = Math.max(0, Math.min(100, spirit.energyLevel + energyChange));

        // Возможное изменение уровня угрозы на основе энергии
        let newThreatLevel = spirit.threatLevel;
        if (newEnergyLevel >= 90) {
          newThreatLevel = 'critical';
        } else if (newEnergyLevel >= 70) {
          newThreatLevel = 'high';
        } else if (newEnergyLevel >= 40) {
          newThreatLevel = 'medium';
        } else {
          newThreatLevel = 'low';
        }

        const updatedSpirit = {
          ...spirit,
          energyLevel: newEnergyLevel,
          threatLevel: newThreatLevel,
        };

        const event = {
          type: 'update',
          spirit: updatedSpirit,
        };

        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      }, 5000);

      // Очистка при закрытии соединения
      const cleanup = () => {
        clearInterval(interval);
        controller.close();
      };

      // Сохраняем функцию очистки
      (controller as unknown as { cleanup: () => void }).cleanup = cleanup;
    },
    cancel(controller) {
      const ctrl = controller as unknown as { cleanup?: () => void };
      if (ctrl.cleanup) {
        ctrl.cleanup();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
