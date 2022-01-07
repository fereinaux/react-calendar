import './App.css';
import Calendar from './compoments/calendar/calendar';
import Reminder from './compoments/reminder/reminder';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="reminder" element={<Reminder />} />
        <Route path="reminder/:id" element={<Reminder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
