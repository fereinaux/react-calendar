import './App.css';
import Calendar from './compoments/calendar/calendar';
import CreateReminder from './compoments/calendar/reminder/createReminder';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="reminder" element={<CreateReminder />} />
          <Route path="reminder/:id" element={<CreateReminder />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
