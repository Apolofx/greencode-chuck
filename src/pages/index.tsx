"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";
import { Geist, Anybody } from "next/font/google";
import { useFetchJoke } from "@/services/fetch-joke";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import { getStoreInstance, LocalStorageJokeCollection } from "@/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anybody = Anybody({
  variable: "--font-anybody",
  subsets: ["latin"],
});

export default function Home() {
  const FETCHING_MESSAGE = "Fetching joke...";
  const [joke, setJoke] = useState<JokeApiResponse>({
    id: "",
    value: "",
  });
  const [jokeSaved, setJokeSaved] = useState(false);
  const [store, setStore] = useState<LocalStorageJokeCollection>();

  const toggleSaved = () => {
    setJokeSaved((prev) => !prev);
  };
  const { fetchNewJoke, fetchingJoke } = useFetchJoke(setJoke);

  // get store
  useEffect(() => {
    setStore(getStoreInstance());
  }, []);

  //reset joke "saved" value each time we create a new job
  useEffect(() => {
    setJokeSaved(false);
  }, [joke]);

  useEffect(() => {
    if (!store) return;
    (async () => {
      if (jokeSaved === false && joke.id) await store.delete(joke.id);
      else await store.add({ id: joke.id, rate: 0, value: joke.value });
    })();
  }, [jokeSaved, joke]);

  return (
    <div
      className={`${anybody.className} ${geistSans.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="sm:w-1/2 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl w-full">
          Wellcome to Chuck Norris jokes retriever
        </h1>
        <div>
          <p className="w-full text-center sm:text-left min-h-[60px]">
            {fetchingJoke ? FETCHING_MESSAGE : joke?.value}
          </p>
          {}
        </div>
        <div className="flex w-full justify-between items-center">
          <IconButton
            iconName="heart"
            onClick={toggleSaved}
            filled={jokeSaved}
          />

          {/* primary and sec cta's sections */}
          <div className="flex gap-2">
            <Link href="/collection">
              <button className="rounded-lg  hover:shadow-md  px-4 py-2 cursor-pointer transition-all duration-200 border-1">
                view collection
              </button>
            </Link>
            <button
              onClick={fetchNewJoke}
              className="rounded-lg border-none bg-gray-100 hover:shadow-md hover:bg-gray-200 px-4 py-2 cursor-pointer transition-all duration-200"
            >
              new joke
            </button>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
