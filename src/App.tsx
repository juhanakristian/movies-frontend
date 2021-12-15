import logo from "./logo.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter } from "react-router-dom";
import MovieList from "./movieslist/MovieList";
import SearchForm from "./search/SearchForm";
import { Outlet, Route, Router, Routes, useNavigate } from "react-router";
import MovieDetails from "./movie/MovieDetails";
import MovieDialog from "./movie/MovieDialog";
import Button from "./components/Button";

const queryClient = new QueryClient();

function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 p-4">
      <h1 className="text-white text-6xl pb-10 font-bold uppercase">Movies</h1>
      <Button onClick={() => navigate("/movies/add")}>Add Movie</Button>
      <Outlet />
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
          <Route path="/" element={<Home />}>
            <Route path="/movies/add" element={<MovieDialog />}></Route>
          </Route>
          <Route path="/movies/:id" element={<MovieDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
