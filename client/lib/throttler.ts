// TODO: remove if unused!
/**
 * throttles calls to a given function with a
 * given threshold. The leading and trailing calls
 * will always be made.
 */
function throttler(fn: (...args: any[]) => void, threshold?: number) {
  let last: number;
  let timer: number;
  let throttled;

  if (threshold) {
    throttled = (...args: any[]) => {
      const now = Date.now();

      if (last !== undefined && now - last < threshold) {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          last = now;
          fn(...args);
        }, threshold - (now - last));
      } else {
        last = now;
        fn(...args);
      }
    };
  }

  return throttled || fn;
}

export default throttler;
