"use client";

import { useSpirits, SpiritCard } from "@/entities/spirit";
import { useCaptureSpirit } from "@/features/capture-spirit";
import { useResetSpirits } from "@/features/reset-spirits";
import { Notification } from "@/shared/ui";
import styles from "./SpiritsList.module.scss";

export function SpiritsList() {
  const { data: spirits, isLoading, error } = useSpirits();
  const { capture, isCapturing, notification, clearNotification } =
    useCaptureSpirit();
  const { reset, isResetting } = useResetSpirits();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Загрузка данных мониторинга...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span>Ошибка загрузки данных: {error.message}</span>
      </div>
    );
  }

  if (!spirits || spirits.length === 0) {
    return (
      <div className={styles.empty}>
        <span>Духовные аномалии не обнаружены</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
      <button
        className={styles.resetButton}
        onClick={() => reset()}
        disabled={isResetting}
      >
        {isResetting ? "Сброс..." : "Давай по новой! :)"}
      </button>
      <div className={styles.grid}>
        {spirits.map((spirit) => (
          <SpiritCard
            key={spirit.id}
            spirit={spirit}
            onCapture={capture}
            isCapturing={isCapturing(spirit.id)}
          />
        ))}
      </div>
    </div>
  );
}
