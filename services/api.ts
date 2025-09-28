export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  }
}

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}` : `/discover/movie?sort_by=popularity.desc`;

  const res = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  })

  if (!res.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", res.statusText);
  }

  const data = await res.json();

  return data.results;
}

// const url =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjEzYzA2NjUyZGY3ZmRmZTFkZDZiY2I0M2JjMTViYiIsIm5iZiI6MTc1ODk4ODI4Mi4yNjQ5OTk5LCJzdWIiOiI2OGQ4MDdmYTVmMGE5NGIxN2MzOGI1MzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oVRDJ1t1UbCAq2tWprBLkInvZ_t_9qMiPiXB9zUQsxs",
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
