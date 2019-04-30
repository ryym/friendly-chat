import { Dispatch } from 'redux';

export type WithDispatch<Props extends {}> = Props & Readonly<{ dispatch: Dispatch }>;
