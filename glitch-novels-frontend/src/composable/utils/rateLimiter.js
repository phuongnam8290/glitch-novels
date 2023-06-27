export const useRateLimiting = () => {
  const debounce = (action, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      return new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          // If the timeout is cleared, the promise will never be resolved, i.e., the await / then() block following
          // this promise will not be executed.
          action
            .apply(this, args) //
            .then((result) => resolve(result));
        }, delay);
      });
    };
  };

  const throttle = () => {
    //TODO: Implement throttle.
  };

  return { debounce, throttle };
};
