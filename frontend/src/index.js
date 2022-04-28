import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import moment from 'moment';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux';

function sortState(state) {
  return state.sort((a, b) => {

    return moment(a.time).format('HHmm') - moment(b.time).format('HHmm')
  })
}

function reducer(state = [], action) {
  let param = action.param;
  switch (action.type) {
    case 'EDIT':
      let editIndex = state.findIndex(reminder => reminder.id === param.id)
      state[editIndex] = param
      return sortState(state)
    case 'INSERT':
      state.push(param)
  
      return sortState(state)
    case 'DELETE':
      let removeIndex = state.findIndex(reminder => reminder.id === param)
      state.splice(removeIndex, 1)
      return sortState(state)
    case 'DELETEBYDAY':      
      return sortState(state.filter(reminder => reminder.date.format('YYYYMMDD') != param.format('YYYYMMDD')))
    default:
      return sortState(state)
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
