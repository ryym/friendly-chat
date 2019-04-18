import { defineReducer, on } from 'redy';
import { combineReducers } from 'redux';
import { User, SavedMessage } from '../../backend/types';
import { SignInOk, SignOutOk, DeleteMessage, DisplayMessage } from '../actions';
import { State } from '../../state';

const reduceUser = defineReducer<User | null>(null, [
  on(SignInOk, (_, user) => user),
  on(SignOutOk, _ => null),
]);

const reduceMessages = defineReducer<SavedMessage[]>(
  [],
  [
    on(DeleteMessage, (msgs, id) => {
      return msgs.filter(msg => msg.id !== id);
    }),
    on(DisplayMessage, (msgs, msg) => {
      msgs = [...msgs];
      const idx = msgs.findIndex(m => m.id === msg.id);
      if (idx >= 0) {
        msgs[idx] = msg;
      } else {
        msgs.push(msg);
      }
      return msgs;
    }),
  ]
);

export const createReducer = () => {
  return combineReducers<State>({
    user: reduceUser,
    messages: reduceMessages,
  });
};
