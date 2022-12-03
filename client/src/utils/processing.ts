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
  const minutes = Math.round(runtime % 60);
  if (hours === 0 && minutes === 0) {
    return "N/A";
  } else if (hours === 0) {
    return `${minutes} mins`;
  } else {
    return `${hours}h ${minutes}m`;
  }
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
function reduceText(text: string, length: number = 350) {
  const reducedText = text.substring(0, length);
  const summary = reducedText.substring(0, reducedText.lastIndexOf("."));
  if (summary.length > 0) {
    return summary;
  } else {
    return reducedText.substring(0, reducedText.lastIndexOf(";"));
  }
  // Create another else statement, if text is too short return as much text as possible (without cutting words) and add "..."
}

export { runtimeToHours, reduceText };
