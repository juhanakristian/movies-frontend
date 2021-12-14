import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter } from "react-router-dom";
import MovieList from "./movieslist/MovieList";
import SearchForm from "./search/SearchForm";
import { Route, Router, Routes } from "react-router";
import MovieDetails from "./movie/MovieDetails";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="bg-gray-900 p-4">
      <h1 className="text-white text-6xl pb-10 font-bold uppercase">Movies</h1>
      <SearchForm />
      <MovieList />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
