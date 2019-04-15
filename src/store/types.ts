import { Thunk as RedyThunk } from 'redy';
import { State } from '../state';

export type Thunk<R = void> = RedyThunk<State, R>;
