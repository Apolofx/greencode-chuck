import { useEffect, useState } from "react";
import { getStoreInstance, LocalStorageJokeCollection } from "@/store";
import IconButton from "@/components/IconButton";
import { useRouter } from "next/router";

// where we save the current state of saved jokes

export default function Collection() {
  const router = useRouter();
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
      <nav className="mr-auto">
        <IconButton iconName="goBack" onClick={() => router.back()} />
      </nav>
      <main className="sm:w-1/2 flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {!collection.length ? (
          <h1 className="text-3xl w-full text-gray-400 text-center">
            Your Chuck Norris Jokes colecction is empty
          </h1>
        ) : (
          <h1 className="text-3xl w-full text-center">
            Your Chuck Norris Jokes colecction
          </h1>
        )}
        {collection
          .sort((a: Joke, b: Joke) => b.rate - a.rate)
          .map((joke: Joke) => {
            return (
              <>
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  handleRateChange={(rate) => {
                    store?.update(joke.id, { ...joke, rate });
                    setUpdatedStore((prev) => !prev);
                  }}
                  handleTrashClick={() => {
                    store?.delete(joke.id);
                    setUpdatedStore((prev) => !prev);
                  }}
                />
                <hr className="w-56 h-0.5 mx-auto bg-gray-100 border-0 rounded-sm  dark:bg-gray-700" />
              </>
            );
          })}
      </main>
    </div>
  );
}

type JokeCardProps = {
  joke: Joke;
  handleRateChange: (rate: Rate) => void;
  handleTrashClick: (jokeID: string) => void;
};
function JokeCard({ joke, handleRateChange, handleTrashClick }: JokeCardProps) {
  return (
    <div className="flex flex-col items-start rounded-2xl w-full">
      <p>{joke.value}</p>
      <div className="w-full flex">
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
        <IconButton
          iconName="trash"
          onClick={() => handleTrashClick(joke.id)}
        />
      </div>
    </div>
  );
}
