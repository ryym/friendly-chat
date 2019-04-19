export interface User {
  readonly uid: string | null;
  readonly displayName: string;
  readonly photoURL: string;
}

export interface Message {
  readonly name: string;
  readonly content: MessageContent;
  readonly profilePicUrl: string;
}

export interface SavedMessage extends Message {
  readonly id: string;
  // Timestamp in milli seconds.
  readonly timestamp: number | null;
}

export type MessageContent =
  | { type: 'TEXT'; text: string }
  | { type: 'IMAGE'; imageUrl: string };
