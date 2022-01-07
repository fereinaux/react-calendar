import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import moment from 'moment';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux';

function sortState(state){
  return state.sort((a,b) => {

    return moment(a.time).format('HHmm') - moment(b.time).format('HHmm')} )
}

function reducer(state = [{
  date:  moment(new Date()).add(2, 'd'),
  time:  moment(new Date()).add(2, 'd'),
  color: {hex:'#12aa45'},
  title: 'Meeting',
  city:'Recife',
  id: '4324',
  forecast: 'storm'
},
{
  date: moment(new Date()).add(-25, 'd'),
  time: moment(new Date()).add(-25, 'd'),
  color: {hex:'#124a45'},
  title: 'Another One',
  city:'Toronto',
  id: '543'
}], action) {
  let param = action.param;
  switch (action.type) {
    case 'EDIT':
      let editIndex = state.findIndex(reminder => reminder.id == param.id)
      state[editIndex] = param
      return sortState(state)
    case 'INSERT':
      state.push(param)
      return sortState(state)
    case 'DELETE':
      let removeIndex = state.findIndex(reminder => reminder.id == param)
      state.splice(removeIndex, 1)
      return sortState(state)
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
