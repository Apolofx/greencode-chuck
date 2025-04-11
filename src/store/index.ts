interface JokeCollection {
  add(joke: Joke): Promise<void>;
  delete(jokeID: string): Promise<void>;
  getCollection(): Promise<Joke[]>;
  getOne(jokeID: string): Promise<Joke>;
  update(jokeID: string, data: Joke): Promise<Joke>;
}
interface CollectionStorage {
  create(joke: Joke): Promise<Joke>;
  delete(jokeID: string): Promise<void>;
  getAll(): Promise<Joke[]>;
  get(jokeID: string): Promise<Joke>;
  update(jokeID: string, data: Joke): Promise<Joke[]>;
}

export class LSCollectionStorageImpl implements CollectionStorage {
  private COLLECTION_NAME = "joke-collection";
  private collection: Joke[] = [];
  constructor(private localStorage: Storage) {
    // check if joke storage present
    const previousCollection = this.localStorage.getItem(this.COLLECTION_NAME);
    if (!previousCollection)
      this.localStorage.setItem(this.COLLECTION_NAME, JSON.stringify([]));
    else this.collection = JSON.parse(previousCollection) as Joke[];
  }

  async create(joke: Joke) {
    //check if not already present
    if (this.collection.find((j) => j.id === joke.id)) return joke;

    this.collection.push(joke);
    this.save();
    return this.collection[-1];
  }

  async delete(jokeID: string) {
    this.collection = this.collection.filter((joke) => joke.id !== jokeID);
    this.save();
  }

  async getAll() {
    // retrieve copy to prevent mutations
    return [...this.collection];
  }

  async get(jokeID: string) {
    const joke = this.collection.find((joke) => joke.id === jokeID);
    if (!joke) throw new Error("Joke not found");
    return joke;
  }

  async update(jokeID: string, data: Joke) {
    const updatedCollection = this.collection.map((joke) => {
      if (jokeID === joke.id) return { ...joke, ...data } as Joke;
      return joke;
    });
    this.collection = updatedCollection;
    this.save();
    return [...updatedCollection];
  }

  private save() {
    this.localStorage.setItem(
      this.COLLECTION_NAME,
      JSON.stringify(this.collection)
    );
  }
}

export class LocalStorageJokeCollection implements JokeCollection {
  constructor(private storage: CollectionStorage) {}
  async add(joke: Joke) {
    this.storage.create(joke);
  }
  async delete(jokeID: string) {
    this.storage.delete(jokeID);
  }
  async getCollection(): Promise<Joke[]> {
    return this.storage.getAll();
  }

  async getOne(jokeID: string) {
    return this.storage.get(jokeID);
  }

  async update(jokeID: string, data: Joke): Promise<Joke> {
    this.storage.update(jokeID, data);
    return this.storage.get(jokeID);
  }
}

export function getStoreInstance() {
  const _localStorage = new LSCollectionStorageImpl(window.localStorage);
  const store = new LocalStorageJokeCollection(_localStorage);
  return store;
}
