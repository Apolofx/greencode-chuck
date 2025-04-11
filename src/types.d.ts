type Joke = {
  id: string;
  value: string;
  rate: Rate;
};

interface JokeApiResponse {
  id: string;
  value: string;
}

type Rate = 0 | 1 | 2 | 3 | 4 | 5;
