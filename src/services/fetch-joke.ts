import { useCallback, useEffect, useState } from "react";
export function useFetchJoke(callback: (maybe_joke: JokeApiResponse) => void) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const fetchNewJoke = useCallback(async () => {
    setIsFetching(true);

    await fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching data");
        return res.json();
      })
      .then((res) => {
        const joke = res as JokeApiResponse;
        if (!joke) throw new Error("Missing joke in Chuck Norris API response");
        callback(joke);
      })
      .catch((error: Error) => {
        console.error(error);
        setError("[useFetchJoke] error fetchign joke");
      })
      .finally(() => setIsFetching(false));
  }, [callback]);
  //fetch joke
  useEffect(() => {
    fetchNewJoke();
  }, []);

  return { fetchNewJoke, fetchingJoke: isFetching, errorFetchingJoke: error };
}
