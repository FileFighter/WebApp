export function divideArrayByCondition<T>(
  input: T[],
  condition: (a: T) => boolean
) {
  let output: T[][] = [[], []];

  input.forEach((el: T) => {
    if (condition(el)) {
      output[0].push(el);
    } else {
      output[1].push(el);
    }
  });

  return output;
}
