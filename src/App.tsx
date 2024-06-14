import style from './App.module.scss';
import { BookingResult } from './components/BookingResult';

export const App = () => {
  return (
    <div className={style.container}>
      <main>
        <BookingResult />
      </main>
    </div>
  );
}
