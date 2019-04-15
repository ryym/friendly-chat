import { createStore, applyMiddleware } from 'redux';
import { redyMiddleware } from 'redy';
import logger from 'redux-logger';
import { createReducer } from './reducer';

export const configureStore = () => {
  return createStore(createReducer(), applyMiddleware(logger, redyMiddleware()));
};
