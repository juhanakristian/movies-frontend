import { Movie } from "../types";

interface Props {
  movie: Movie;
  onClick: () => void;
}
export default function MovieListItem({ movie, onClick }: Props) {
  return (
    <li
      className="text-white pt-4 pb-4 border-b-2 border-gray-800 flex justify-between"
      onClick={onClick}
    >
      <span className="font-semibold">
        {movie.name} ({movie.year})
      </span>
      <span>{movie.rating}/5</span>
    </li>
  );
}
