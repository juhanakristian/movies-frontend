import * as React from "react";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import Button from "../components/Button";

function deleteMovie(movieId: number) {
  return fetch(`${import.meta.env.VITE_BACKEND_HOST}/movies/${movieId}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export default function DeleteConfirmDialog() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const movieId = parseInt(params.id ?? "");

  const mutation = useMutation(`delete_${movieId}`, deleteMovie, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("Error deleting movie");
    },
  });

  function handleDelete() {
    mutation.mutate(movieId);
  }

  return (
    <Dialog onDismiss={() => navigate("/")} aria-labelledby="dialog-title">
      <div className="flex flex-col">
        <h1 id="dialog-title" className="text-2xl pb-4">
          Delete movie?
        </h1>
        <p>Are you sure you want to delete this movie?</p>
        <div className="pt-2 flex justify-end gap-4">
          <Button onClick={() => navigate(`/movies/${movieId}`)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </Dialog>
  );
}
