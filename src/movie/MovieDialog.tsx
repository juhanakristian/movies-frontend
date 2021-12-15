import * as React from "react";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PersonInput from "../components/PersonInput";
import TextField from "../components/TextField";
import { Movie, Person } from "../types";
// id: number;

interface PersonData {
  firstName: string;
  lastName: string;
}

interface MovieData {
  name: string;
  rating: number;
  year: number;

  genres: string[];
  ageLimit: number;
  synopsis: string;

  director: PersonData;
  actors: PersonData;
}

function addMovie(movie: MovieData) {
  return fetch(`${import.meta.env.VITE_BACKEND_HOST}/movies`, {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default function MovieDialog() {
  const navigate = useNavigate();

  const [director, setDirector] = React.useState<PersonData>({
    firstName: "",
    lastName: "",
  });

  const [actors, setActors] = React.useState<PersonData[]>([]);

  const mutation = useMutation<MovieData, unknown, MovieData>(`add`, addMovie, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("Error adding movie");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const movie = {
      name: form.get("name") as string,
      rating: 3,
      year: 2001,
      ageLimit: 18,
      synopsis: "",
      genres: ["Action", "Comedy"],
      director,
      actors: [
        {
          firstName: "Tom",
          lastName: "Hanks",
        },
      ],
    };

    mutation.mutate(movie);
  }

  return (
    <Dialog onDismiss={() => navigate("/")}>
      <div className="flex flex-col">
        <h1 className="text-2xl pb-4">Add movie</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField name="name" placeholder="Name" />
          <TextField name="rating" placeholder="Rating" type="number" />
          <TextField name="ageLimit" placeholder="Age limit" type="number" />
          <TextField name="genres" placeholder="Genres" />
          <TextField name="synopsis" placeholder="Synopsis" rows={5} />
          <PersonInput
            name="Director"
            firstName={director.firstName}
            lastName={director.lastName}
            onChange={(e) =>
              setDirector({ ...director, [e.target.name]: e.target.value })
            }
          />
          <h3 className="text-xl">Actors</h3>
          {actors.map((actor, index) => (
            <div className="flex gap-2 items-center">
              <PersonInput
                key={index}
                firstName={actor.firstName}
                lastName={actor.lastName}
                onChange={(e) =>
                  setActors(
                    actors.map((a, i) =>
                      i === index
                        ? { ...a, [e.target.name]: e.target.value }
                        : a
                    )
                  )
                }
              />
              <div>
                <Button
                  onClick={() =>
                    setActors(actors.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              setActors([...actors, { firstName: "", lastName: "" }])
            }
          >
            ✦ Add actor
          </Button>
          <hr className="mt-2 border-gray-600" />
          <div className="pt-2 flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
