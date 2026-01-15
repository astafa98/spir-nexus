import { NextResponse } from 'next/server';
import { getSpirits, updateSpirit } from '../../data';

// POST /api/spirits/:id/capture - захват духа (30% вероятность ошибки)
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const spirits = getSpirits();
  const spirit = spirits.find((s) => s.id === id);

  if (!spirit) {
    return NextResponse.json(
      { success: false, error: 'Дух не найден' },
      { status: 404 }
    );
  }

  if (spirit.status === 'captured') {
    return NextResponse.json(
      { success: false, error: 'Дух уже захвачен' },
      { status: 400 }
    );
  }

  // 30% вероятность неудачи
  const isFailure = Math.random() < 0.3;

  if (isFailure) {
    return NextResponse.json({
      success: false,
      error: 'Дух ускользнул! Попробуйте снова.',
    });
  }

  const updatedSpirit = updateSpirit(id, { status: 'captured' });

  return NextResponse.json({
    success: true,
    spirit: updatedSpirit,
  });
}
