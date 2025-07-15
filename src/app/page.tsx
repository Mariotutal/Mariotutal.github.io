import styles from './page.module.css';
import Scene from '../components/Scene';
import Overlay from '../components/overlay/Overlay';

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene />
      <Overlay />
    </main>
  );
}
