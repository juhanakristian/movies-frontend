import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Movie, Person } from "../types";

function fetchMovie(id: number) {
  return fetch(`${import.meta.env.VITE_BACKEND_HOST}/movies/${id}`).then(
    (res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    }
  );
}

export default function MovieDetails() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const id = parseInt(params.id ?? "");

  const { data, isLoading, isError } = useQuery(`movie_${id}`, () =>
    fetchMovie(id)
  );

  if (isLoading) {
    return (
      <div className="p-4">
        <Button onClick={() => navigate(-1)}>←Back</Button>
        <div className="flex pt-4 flex-col text-white text-lg">
          <h1 className="text-3xl font-bold pb-4 pt-4">
            <div className="animate-pulse w-52 h-12 bg-gray-800 rounded-md"></div>
          </h1>
          <div className="flex justify-between items-baseline">
            <div className="text-gray-300 italic text-sm">
              <div className="animate-pulse w-24 h-6 bg-gray-800 rounded-md"></div>
            </div>
            <div className="text-md font-bold">
              <div className="animate-pulse w-10 h-6 bg-gray-800 rounded-md"></div>
            </div>
          </div>
          <p className="text-gray-300 flex flex-col gap-2 pt-2">
            <div className="animate-pulse h-6 bg-gray-800 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-800 rounded-md"></div>
            <div className="animate-pulse h-6 bg-gray-800 rounded-md"></div>
          </p>
          <div className="font-bold pt-2">
            <div className="animate-pulse w-10 h-6 bg-gray-800 rounded-md"></div>
          </div>
          <h2 className="pt-4 font-bold">
            <div className="animate-pulse w-20 h-6 bg-gray-800 rounded-md"></div>
          </h2>
          <div className="pt-2">
            <div className="animate-pulse w-32 h-6 bg-gray-800 rounded-md"></div>
          </div>
          <h2 className="pt-4 font-bold">
            <div className="animate-pulse w-16 h-6 bg-gray-800 rounded-md"></div>
          </h2>
          <ul>
            <li className="pt-2">
              <div className="animate-pulse w-32 h-6 bg-gray-800 rounded-md"></div>
            </li>
            <li className="pt-2">
              <div className="animate-pulse w-32 h-6 bg-gray-800 rounded-md"></div>
            </li>
            <li className="pt-2">
              <div className="animate-pulse w-32 h-6 bg-gray-800 rounded-md"></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-white text-3xl m-auto font-semibold p-4">
        <h1 className="text-5xl m-auto pb-4">:(</h1>
        <p>Oops, something went wrong</p>
        <button className="pt-2 pb-2" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Button onClick={() => navigate(-1)}>←Back</Button>
      <div className="flex pt-4 flex-col text-white text-lg">
        <h1 className="text-3xl font-bold pb-4 pt-4">
          {data.name} ({data.year})
        </h1>
        <div className="flex justify-between items-baseline">
          <div className="text-gray-300 italic text-sm">
            {data.genres.join(", ")}
          </div>
          <div className="text-md font-bold">{data.rating}/5</div>
        </div>
        <p className="text-gray-300">{data.synopsis}</p>
        <div className="font-bold">PG-{data.ageLimit}</div>
        <h2 className="pt-4 font-bold">Director</h2>
        <div>
          {data.director.firstName} {data.director.lastName}
        </div>
        <h2 className="pt-4 font-bold">Cast</h2>
        <ul>
          {data.actors.map((actor: Person) => (
            <li key={actor.id}>
              {actor.firstName} {actor.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
