import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Calendar from './compoments/calendar';
import CreateReminder from './compoments/reminder/create';
import 'antd/dist/antd.css';
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
