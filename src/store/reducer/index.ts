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

    on(DisplayMessage, (msgs, newMsg) => {
      if (newMsg.timestamp == null) {
        return msgs.concat(newMsg);
      }

      msgs = [...msgs];
      let idx = null;
      let exists = false;
      for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i];
        if (msg.id === newMsg.id) {
          idx = i;
          exists = true;
          break;
        }
        if (msg.timestamp == null || msg.timestamp > newMsg.timestamp) {
          idx = i;
          break;
        }
      }

      if (idx == null) {
        msgs.push(newMsg);
      } else {
        msgs.splice(idx, exists ? 1 : 0, newMsg);
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
