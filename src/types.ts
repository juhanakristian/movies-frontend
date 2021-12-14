export interface Person {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Movie {
  id: number;
  name: string;
  rating: number;
  year: number;

  genres: string[];
  ageLimit: number;
  synopsis: string;

  director: Person;
  actors: Person[];
}
