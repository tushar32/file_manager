import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 
/* Middleware for redux
With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. 
Middleware extend the store's abilities, and let you write async logic that interacts with the store.

Thunks are the recommended middleware for basic Redux side effects logic, 
including complex synchronous logic that needs access to the store, and 
simple async logic like AJAX requests.
*/

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;