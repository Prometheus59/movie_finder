// Import images for watch providers
import netflix from "../images/watch_providers/NetflixLogo.png";
import disney from "../images/watch_providers/DisneyLogo.svg";
import crave from "../images/watch_providers/CraveLogo.svg";
import appleTvPlus from "../images/watch_providers/AppleTvPlusLogo.svg";
import paramountPlus from "../images/watch_providers/ParamountPlusLogo.png";

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
    default:
      return false;
  }
}

export { getWatchProviderLogo };
