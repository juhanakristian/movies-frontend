import * as React from "react";
import { useSearchParams } from "react-router-dom";

import Button from "../components/Button";
import TextField from "../components/TextField";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [name, setName] = React.useState(searchParams.get("name") || "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSearchParams({ name: form.get("name") as string });
  }

  return (
    <form
      className="search-form flex flex-col gap-2 pb-4"
      onSubmit={handleSubmit}
    >
      <TextField
        name="name"
        placeholder="Search"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
