import { useEffect, useState } from "react";
import { getStoreInstance, LocalStorageJokeCollection } from "@/store";
import IconButton from "@/components/IconButton";

// where we save the current state of saved jokes

export default function Collection() {
  const [collection, setCollection] = useState<Joke[]>([]);
  const [store, setStore] = useState<LocalStorageJokeCollection>();

  // util "event emmiter" to update jokes collection
  const [updatedStore, setUpdatedStore] = useState(true);

  // get store
  useEffect(() => {
    setStore(getStoreInstance());
  }, []);

  useEffect(() => {
    if (!store) return;
    (async () => {
      const _collection = await store!.getCollection();
      setCollection(_collection);
    })();
  }, [store, updatedStore]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <main className="sm:w-1/2 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl w-full">Your Chuck Norris Jokes colecction</h1>
        {collection
          .sort((a: Joke, b: Joke) => b.rate - a.rate)
          .map((joke: Joke) => {
            return (
              <JokeCard
                key={joke.id}
                joke={joke}
                handleRateChange={(rate) => {
                  console.log(`changing value ${rate} for joke ${joke}`);
                  store?.update(joke.id, { ...joke, rate });
                  setUpdatedStore((prev) => !prev);
                }}
              />
            );
          })}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}

type JokeCardProps = {
  joke: Joke;
  handleRateChange: (rate: Rate) => void;
};
function JokeCard({ joke, handleRateChange }: JokeCardProps) {
  return (
    <div className="flex flex-col items-start rounded-2xl w-full">
      <p>{joke.value}</p>
      <div className="flex w-full">
        {[1, 2, 3, 4, 5].map((value) => (
          <IconButton
            key={`${joke.id}-rate-star`}
            iconName="star"
            filled={value <= joke.rate}
            onClick={() => handleRateChange(value as Rate)}
          />
        ))}
      </div>
    </div>
  );
}
