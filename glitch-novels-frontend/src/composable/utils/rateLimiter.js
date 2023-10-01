export const useRateLimiting = () => {
  const debounce = (action, delay, options = { isAsyncOperation: false }) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);

      // If the action is an async operation, return a promise to be resolved/rejected later. Otherwise, simply execute
      // the action.
      if (options.isAsyncOperation) {
        return new Promise((resolve) => {
          timeoutId = setTimeout(() => {
            // If the timeout is cleared, the promise will never be resolved, i.e., the await / then() block following
            // this promise will not be executed.
            action
              .apply(this, args) //
              .then((result) => resolve(result));
          }, delay);
        });
      } else {
        timeoutId = setTimeout(() => {
          action.apply(this, args);
        }, delay);
      }
    };
  };

  const throttle = () => {
    //TODO: Implement throttle.
  };

  return { debounce, throttle };
};
