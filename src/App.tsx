import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { GrClearOption } from "react-icons/gr";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import Title from "./components/Title.tsx";
import { ToastContainer, toast } from "react-toastify";

import { ClipLoader } from "react-spinners";
import "./App.css";
import SingleItem from "./components/SingleItem.tsx";
import type { movieDetail } from "./components/SingleItem.tsx";
const Movie = lazy(() => import("./components/Movie.tsx"));

const key: string = "1445ada9";
export interface movies {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}
function App() {
  const [listOfMovies, setMovies] = useState<movies[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showMovieDetails, setMovieDetails] = useState<boolean>(false);
  const [singleMovie, setMovie] = useState<movieDetail[]>([]);

  // for handling input data
  const inputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let cleaned = value.replace(/[^a-zA-Z0-9 ]/g, "");

    if (cleaned.startsWith(" ")) {
      cleaned = cleaned.trimStart();
    }

    setInput(cleaned);
  }, []);
  // for clearing input field
  const clearInputHandler = useCallback(() => {
    setInput("");
  }, []);

  function singleMovieHandler(movie: movieDetail) {
    setMovieDetails(true);
    setMovie([movie]);
  }
  useEffect(() => {
    if (input.trim().length <= 1) {
      setMovies([]);
      return;
    }
    const timer = setTimeout(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${input}`
          );

          if (!response.ok) {
            if (response.status === 404) {
              throw new Error("The requested resource was not found.");
            } else if (response.status === 401) {
              throw new Error("Invalid API key.");
            } else {
              throw new Error("Something went wrong. Please try again.");
            }
          }

          const data = await response.json();

          if (!data.Search || data.Search.length === 0) {
            throw new Error(`${data.Error}`);
          }

          setMovies(data.Search);
        } catch (e) {
          if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("An unexpected error occurred");
          }
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <>
      {showMovieDetails ? (
        <Suspense fallback={<ClipLoader color="white" size={40} />}>
          <Movie
            feature={singleMovie}
            title="Movie Detail Page"
            onClick={setMovieDetails}
          />
        </Suspense>
      ) : (
        <>
          <div className="header">
            <Title title="Movie Search" />
            <div className="input-container">
              <Input
                placeholder="Enter the movie"
                type="text"
                value={input}
                onChange={inputHandler}
              />
              <Button onClick={clearInputHandler}>
                <GrClearOption />
              </Button>
            </div>
          </div>
          <h2 className="movie-title">Movies</h2>
          <div className="movie-container">
            {listOfMovies?.map((movie) => (
              <SingleItem
                movieDetail={movie}
                key={movie.imdbID}
                singleMovieHandler={singleMovieHandler}
              />
            ))}
          </div>
        </>
      )}

      {loading && (
        <div className="loader">
          <ClipLoader color="white" size={40} />
        </div>
      )}
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
