import axios from "axios";
import { THEMOVIEDB_API_HOST, THEMOVIEDB_API_KEY, THEMOVIEDB_LANG } from "../utils/constants";

export function getTopRatedMoviesApi(PAGE = 1) {
    const url = `${THEMOVIEDB_API_HOST}/movie/top_rated?api_key=${THEMOVIEDB_API_KEY}&language=${THEMOVIEDB_LANG}&page=${PAGE}`;

    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        });
}

export function getGenreMovieApi(idGenres) {
    const url = `${THEMOVIEDB_API_HOST}/genre/movie/list?api_key=${THEMOVIEDB_API_KEY}&lenguage=${THEMOVIEDB_LANG}`;

    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            const arrayGenres = [];
            idGenres.map((id) => {
                result.genres.map((item) => {
                    if (item.id === id) arrayGenres.push(item.name);
                });
            });
            return arrayGenres;
        });
}
