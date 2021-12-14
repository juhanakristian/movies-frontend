import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Movie } from "../types";
import MovieListItem from "./MovieListItem";

function fetchMovies(name: string) {
  return fetch(`${import.meta.env.VITE_BACKEND_HOST}/movies?name=${name}`).then(
    (res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }
  );
}

export default function MovieList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const name = searchParams.get("name") || "";

  const { data, isLoading, isError } = useQuery<Movie[]>(`movies_${name}`, () =>
    fetchMovies(name)
  );

  if (isLoading) {
    return (
      <div className="">
        <ul>
          {[...Array(10).keys()].map((i, index) => (
            <li className="pt-2 pb-2" key={index}>
              <div className="animate-pulse h-12 w-full bg-gray-800 " />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-white text-3xl m-auto font-semibold p-4">
        <h1 className="text-5xl m-auto pb-4">:(</h1>
        <p>Oops, something went wrong</p>
      </div>
    );
  }

  function handleClick(id: number) {
    navigate(`/movies/${id}`);
  }

  return (
    <div className="">
      <ul>
        {data.map((movie) => (
          <MovieListItem
            key={movie.id}
            movie={movie}
            onClick={() => handleClick(movie.id)}
          />
        ))}
      </ul>
    </div>
  );
}
