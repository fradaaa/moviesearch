type MovieCollection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type ItemCredit = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
};

export type CastCredit = ItemCredit & {
  cast_id: number;
  character: string;
  order: number;
  roles?: { credit_id: string; character: string; episode_count: number }[];
};

export type CrewCredit = ItemCredit & {
  department: string;
  job: string;
  jobs?: { credit_id: string; job: string; episode_count: number }[];
};

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: "Clip" | "Featurette" | "Teaser" | "Trailer";
  official: boolean;
  published_at: Date;
  id: string;
};

export type MovieInfo = {
  title: string;
  original_title: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  genres: Genre[];
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: MovieCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
  videos: {
    results: VideoResult[];
  };
};

export type Person = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: Date | null;
  deathday: Date | null;
  gender: 0 | 1 | 2 | 3;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type MovieSearchResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type CreatedByItem = {
  id: number;
  credit_id: string;
  name: string;
  gender: 0 | 1 | 2 | 3;
  profile_path: string;
};

type TVEpisode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: any; // change later
  season_number: number;
  show_id: number;
  still_path: string;
};

type TVSeason = {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type TVSeries = {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedByItem[];
  episode_run_time: any[]; // change later
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: TVEpisode;
  name: string;
  next_episode_to_air: any; //change later
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: TVSeason[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
  videos: {
    results: VideoResult[];
  };
};

type CastInfo = {
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
};

type CrewInfo = {
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
};

type TVCastRole = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type MovieCastResult = MovieSearchResult & CastInfo;

export type TVCastResult = TvSearchResult &
  CastInfo & {
    roles: TVCastRole[];
  };

export type MovieCrewResult = MovieSearchResult & CrewInfo;

export type TVCrewResult = TvSearchResult & CrewInfo;

export type Credit =
  | MovieCastResult
  | TVCastResult
  | MovieCrewResult
  | TVCrewResult;

export type PersonCredits = {
  [k: string]: Credit[];
};

export type TvSearchResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: Date;
  name: string;
  vote_average: number;
  vote_count: number;
  episode_count: number;
};

type KnowFor =
  | (TvSearchResult & { media_type: "tv" })
  | (MovieSearchResult & {
      media_type: "movie";
    });

export type PersonSearchResult = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnowFor[];
};

export type SearchData =
  | {
      type: "movie";
      items: MovieSearchResult[];
    }
  | {
      type: "person";
      items: PersonSearchResult[];
    };

export type TitleImageType = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type TitleImages = {
  id: number;
  backdrops: TitleImageType[];
  logos: TitleImageType[];
  posters: TitleImageType[];
};
