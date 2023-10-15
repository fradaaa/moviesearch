type Images = {
  backdrop: "w300" | "w780" | "w1280" | "original";
  logo: "w45" | "w154" | "w185" | "w300" | "w500" | "original";
  poster: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
  profile: "w45" | "w185" | "h632" | "original";
  still: "w92" | "w185" | "w300" | "original";
};

type GetImageHelpers = {
  [K in keyof Images as `get${Capitalize<K>}`]: <T extends Images[K]>(
    imagePath: string,
    size: T,
  ) => string;
};

const secure_base_url = "https://image.tmdb.org/t/p/";

const getImagePath = (...args: string[]) =>
  secure_base_url.concat(args.join(""));

export const getImageURL: GetImageHelpers = {
  getBackdrop: (imagePath, size) => getImagePath(size, imagePath),
  getLogo: (imagePath, size) => getImagePath(size, imagePath),
  getPoster: (imagePath, size) => getImagePath(size, imagePath),
  getProfile: (imagePath, size) => getImagePath(size, imagePath),
  getStill: (imagePath, size) => getImagePath(size, imagePath),
};
