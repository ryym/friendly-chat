export const unsubscribeAsync = (promise: Promise<() => void>) => () => {
  promise.then(unsubscribe => unsubscribe());
};
