export interface FilmesPopulares {

    adult: boolean;
    backdrop_path?: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview?: string;
    popularity: number;
    poster_path?: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres: string
}

export interface SeriesPopulares{
    backdrop_path: string;
    first_air_date: Date;
    genre_ids:number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    genres: string
}
