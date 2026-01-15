import { SpiritsList } from '@/widgets/spirits-list';
import styles from './page.module.scss';

export default function MonitoringPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Центр мониторинга духовных аномалий</h1>
        <p className={styles.subtitle}>Токийский отдел захвата ёкаев</p>
      </header>
      <section className={styles.content}>
        <SpiritsList />
      </section>
    </main>
  );
}
