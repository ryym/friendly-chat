import { Middleware, Dispatch, AnyAction } from 'redux';
import logger from 'redux-logger';
import { redyMiddleware, isRedyAction } from 'redy';
import { State } from '../../state';
import { DisplayError } from '../actions';

export const listMiddlewares = () => {
  return [logger, errorCatcher(), redyMiddleware()];
};

// Catch errors thrown in action and dispatch the error handling action.
export const errorCatcher = (): Middleware<{}, State, Dispatch<AnyAction>> => ({
  dispatch,
}) => {
  const dispatchError = (err: any) => {
    console.error('[error catch midleware] ERROR', err);
    if (err instanceof Error) {
      dispatch(DisplayError(err));
    } else {
      dispatch(DisplayError(new Error(err)));
    }
  };

  return next => action => {
    if (isRedyAction(action) && action.meta.creator === DisplayError) {
      return next(action);
    }

    try {
      const result = next(action);
      if (result instanceof Promise) {
        result.catch(dispatchError);
      } else if (isRedyAction(result) && result.promise) {
        result.promise.catch(dispatchError);
      }
      return result;
    } catch (err) {
      dispatchError(err);
    }
  };
};
