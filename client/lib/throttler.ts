/**
 * throttles calls to a given function with a
 * given threshold. The leading and trailing calls
 * will always be made.
 */
function throttler(fn, threshold = 100) {
  let last;
  let timer;

  const throttled = (...args) => {
    const now = Date.now();

    if (last !== undefined && now - last < threshold) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn(...args);
      }, threshold - (now - last));
    } else {
      last = now;
      fn(...args);
    }
  };
  return throttled;
}

export default throttler;
