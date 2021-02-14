import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore , combineReducers , applyMiddleware} from 'redux';
import { composeWithDevTools , devToolsEnhancer  } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'; 
import gameReduecer from './Store/Reduecers/gameReducer'
import roundReduecer from './Store/Reduecers/roundReducer'
import cardReduecer from './Store/Reduecers/cardReducer'

const composeEnhancers = composeWithDevTools({
  name:'arik',
  trace:true
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const rootReduecer = combineReducers({
  game:gameReduecer,
  round:roundReduecer,
  cards:cardReduecer
});

const store = createStore(rootReduecer,composeEnhancers(
  applyMiddleware(thunk),
));
// <React.StrictMode>
// /* </React.StrictMode> */
// 
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
