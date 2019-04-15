import { Dispatch } from 'redy';

export type WithDispatch<Props extends {}> = Props & Readonly<{ dispatch: Dispatch }>;
