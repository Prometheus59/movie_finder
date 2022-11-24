/**
 * Function to translate runtime from minutes to hours and minutes
 * @param number - Runtime in minutes
 * @returns string - Runtime in hours and minutes
 * @example
 * runtimeToHours(139).then((res) => {
 * console.log(res);
 * });
 * Output: 2h 19m
 */
function runtimeToHours(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}

/**
 * Function to reduce size of paragraph without cutting words
 * @param text - Paragraph to be reduced
 * @param length - Length of the reduced paragraph
 * @returns string - Reduced paragraph
 * @example
 * reduceText("A ticking-time-bomb insomniac and a slippery soap salesman channel", 20).then((res) => {
 * console.log(res);
 * });
 * Output: A ticking-time-bomb
 */
function reduceText(text: string, length: number = 300) {
  const reducedText = text.substring(0, length);
  return reducedText.substring(0, reducedText.lastIndexOf("."));
}

export { runtimeToHours, reduceText };
