// Import images for watch providers
import netflix from "../images/watch_providers/NetflixLogo.png";
import disney from "../images/watch_providers/DisneyLogo.svg";
import crave from "../images/watch_providers/CraveLogo.svg";
import appleTvPlus from "../images/watch_providers/AppleTvPlusLogo.svg";
import paramountPlus from "../images/watch_providers/ParamountPlusLogo.png";
import amazonPrimeVideo from "../images/watch_providers/AmazonPrimeVideoLogo.svg";
import StackTv from "../images/watch_providers/StackTvLogo.png";
import AMCPlus from "../images/watch_providers/AMCPlusLogo.png";

/**
 * Function to get a movie's watch provider's logo
 * @param provider_name {string} - Name of the watch provider
 * @returns {string} - Logo of the watch provider
 * @example
 * getWatchProviderLogo("Netflix").then((res) => {
 * console.log(res);
 * });
 * Output: netflix
 */
function getWatchProviderLogo(provider_name: string) {
  switch (provider_name) {
    case "Netflix":
      return netflix;
    case "Disney Plus":
      return disney;
    case "Crave":
      return crave;
    case "Apple TV Plus":
      return appleTvPlus;
    case "Paramount Plus":
      return paramountPlus;
    case "Amazon Prime Video":
      return amazonPrimeVideo;
    case "StackTV Amazon Channel":
      return StackTv;
    case "AMC+ Amazon Channel": // Need to make this smaller, include "AMC+" for text
      return AMCPlus;
    default:
      return false;
  }
}

export { getWatchProviderLogo };
