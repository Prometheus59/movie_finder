/**
 * Function to get the average runtime of a tv show (in minutes)
 * @param episodes - Array of episodes
 * @returns number - Average runtime of the tv show (mins)
 * @example
 * getAverageRuntime([139, 139, 139]).then((res) => {
 * console.log(res);
 * });
 * Output: 139
 */

function getAverageRuntime(episodes: number[]) {
  if (episodes.length === 0) return 0;

  let totalRuntime = episodes.reduce(
    (accumulator, episodeLength) => (accumulator += episodeLength),
    0
  );
  return totalRuntime / episodes.length;
}

// const example_show = [100, 200, 200, 150, 100];
// console.log(getAverageRuntime(example_show));

export { getAverageRuntime };
