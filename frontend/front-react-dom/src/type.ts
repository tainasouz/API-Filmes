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

export interface SeriesPopulares {
    backdrop_path: string;
    first_air_date: Date;
    genre_ids: number[];
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

export interface Detalhes {
    backdrop_path: string,
    cast: Cast[],
    certification: CertificationType,
    genres: string[],
    id: number,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: Date,
    title: string,
    vote_average: number,
}
type CertificationType = {
    iso_3166_1: string,
    certification: string
}
type Cast = {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    character: string,
    credit_id: string,
    order: number

}

export interface ResultadoPesquisa {
    adult: boolean,
    backdrop_path: string,
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    release_date: Date,
    video: boolean,
    vote_average:number,
    vote_count: number
}

export interface NavbarType {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}