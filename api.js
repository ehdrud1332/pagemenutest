import axios from 'axios';

const makeRequest = (path, params) =>
    axios.get(`http://localhost:1337${path}`, {
        params: {
            ...params,
        }
    });

const getAnything = async(path, params = {}) => {
    try{
        const {
            data: {results},
            //배열
            data
        } = await makeRequest(path, params)
        return [results || data, null]
    } catch (e) {
        return [null, e];
    }
};

export const movieApi = {
    nowPlaying: () => getAnything("/movie/now_playing"),
    popular: () => getAnything("/movie/popular"),
    upcoming: () => getAnything("/movie/upcoming"),
    search: query => getAnything("/search/movie",{query}),
    Detail: id => getAnything(`/movie/${id}`, {append_to_response: "videos"}),
    similar: id => getAnything(`/movie/${id}/similar`),
    Keywords: id => getAnything(`/movie/${id}/keywords`)

};

export const tvApi = {
    today: () => getAnything("/tv/airing_today"),
    thisWeek: () => getAnything("/tv/on_the_air"),
    topRated: () => getAnything("/tv/top_rated"),
    popular: () => getAnything("/tv/popular"),
    search: query => getAnything("/search/tv",{query}),
    Detail: id => getAnything(`/tv/${id}`, {append_to_response: "videos"}),
    similar: id => getAnything(`tv/${id}/similar`),
    Keywords: id => getAnything(`/tv/${id}/keywords`)
}

export const productApi = {
    all : () => getAnything("/products")
}


export const apiImage = (
    path,
    defaultPoster = "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80"

) => (path ? `http://localhost:1337${path}` : defaultPoster );
