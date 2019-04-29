import { User, SavedMessage } from './backend/types';

export type State = Readonly<{
  user: User | null;
  messageInput: string;
  messages: SavedMessage[];
  error: Error | null;
}>;

export const initialState = (): State => ({
  user: null,
  messageInput: '',
  messages: [],
  error: null,
});
