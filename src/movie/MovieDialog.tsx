import * as React from "react";

import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";

import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import CheckboxGroupField from "../components/CheckboxGroupField";

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

  const mutation = useMutation<MovieData, unknown, MovieData>(`add`, addMovie, {
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      alert("Error adding movie");
    },
  });

  function handleSubmit(values: any, actions: any) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <Dialog onDismiss={() => navigate("/")}>
      <div className="flex flex-col">
        <h1 className="text-2xl pb-4">Add movie</h1>
        <Formik
          initialValues={{
            name: "",
            rating: 1,
            year: 2021,
            ageLimit: 7,
            synopsis: "",
            genres: [],
            director: {
              firstName: "",
              lastName: "",
            },
            actors: [],
          }}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <div className="flex flex-col gap-4">
                <Field name="name" placeholder="Name" component={TextField} />
                <Field
                  className="p-2 rounded-sm text-black"
                  component="select"
                  name="rating"
                  placeholder="Rating"
                  type="number"
                  onChange={(e: any) => {
                    props.setFieldValue("rating", parseInt(e.target.value));
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Field>
                <Field
                  component={TextField}
                  name="ageLimit"
                  placeholder="Age limit"
                  type="number"
                />
                <h3 className="text-xl">Genres</h3>
                <div className="grid grid-cols-3">
                  <CheckboxGroupField
                    name="genres"
                    value="Action"
                    label="Action"
                  />
                  <CheckboxGroupField
                    name="genres"
                    value="Horror"
                    label="Horror"
                  />
                  <CheckboxGroupField
                    name="genres"
                    value="Drama"
                    label="Drama"
                  />
                  <CheckboxGroupField
                    name="genres"
                    value="Comedy"
                    label="Comedy"
                  />
                  <CheckboxGroupField
                    name="genres"
                    value="Thriller"
                    label="Thriller"
                  />
                </div>
                <Field
                  component={TextField}
                  name="synopsis"
                  placeholder="Synopsis"
                  rows={5}
                />
                <h3 className="text-xl">Director</h3>
                <div className="flex gap-4">
                  <Field
                    component={TextField}
                    name="director.firstName"
                    placeholder="Firstname"
                  />
                  <Field
                    component={TextField}
                    name="director.lastName"
                    placeholder="Lastname"
                  />
                </div>
                <h3 className="text-xl">Actors</h3>
                <FieldArray
                  name="actors"
                  render={(arrayHelpers) => (
                    <div>
                      {props.values.actors.map(
                        (actor: PersonData, index: number) => (
                          <div className="flex gap-4 pb-2" key={index}>
                            <Field
                              component={TextField}
                              name={`actors.${index}.firstName`}
                              placeholder="Firstname"
                            />
                            <Field
                              component={TextField}
                              name={`actors.${index}.lastName`}
                              placeholder="Lastname"
                            />
                            <Button onClick={() => arrayHelpers.remove(index)}>
                              Remove
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            firstName: "",
                            lastName: "",
                          })
                        }
                      >
                        + Add actor
                      </Button>
                    </div>
                  )}
                />
              </div>
              <hr className="mt-2 border-gray-600" />
              <div className="pt-2 flex justify-end gap-4">
                <Button type="submit" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
