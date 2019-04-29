const mustGetEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`The environment variable ${key} does not be defined`);
  }
  return value;
};

export const config = {
  apiKey: mustGetEnv('REACT_APP_FIREBASE_API_KEY'),
  authDomain: mustGetEnv('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  databaseURL: mustGetEnv('REACT_APP_FIREBASE_DATABASE_URL'),
  projectId: mustGetEnv('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: mustGetEnv('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: mustGetEnv('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
};

export type Config = Readonly<typeof config>;
