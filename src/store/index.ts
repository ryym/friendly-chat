import { createStore, applyMiddleware } from 'redux';
import { createReducer } from './reducer';
import { listMiddlewares } from './middlewares';

export const configureStore = () => {
  return createStore(createReducer(), applyMiddleware(...listMiddlewares()));
};
