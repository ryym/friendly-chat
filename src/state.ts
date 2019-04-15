import { User, SavedMessage } from './backend/types';

export type State = Readonly<{
  user: User | null;
  messages: SavedMessage[];
}>;

export const initialState = (): State => ({
  user: null,
  messages: [],
});
