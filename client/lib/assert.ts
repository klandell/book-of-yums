/**
 *
 */

function assert(condition: boolean, message: string, ...args: string[]): void {
  if (!condition) {
    let argIdx = 0;
    const error = new Error((message || '').replace(/%s/g, () => args[argIdx++]));
    error.name = 'Assertion Error';
    throw error;
  }
}

export default assert;
