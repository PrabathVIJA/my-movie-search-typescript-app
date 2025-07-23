import { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import Title from "./components/Title.tsx";
import { ClipLoader } from "react-spinners";
import "./App.css";
import SingleItem from "./components/SingleItem.tsx";
import type { movieDetail } from "./components/SingleItem.tsx";
import Movie from "./components/Movie.tsx";
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
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  // for clearing input field
  function clearInputHandler() {
    setInput("");
  }

  function singleMovieHandler(movie: movieDetail) {
    setMovieDetails(true);
    setMovie([movie]);
  }
  useEffect(() => {
    if (input.trim().length <= 1) {
      console.log(input.length);

      setMovies([]);
      return;
    }
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&s=${input}`
      );
      console.log(response);

      const data = await response.json();
      setMovies(data.Search);
      setLoading(false);
    }
    fetchData();
  }, [input]);

  return (
    <>
      {showMovieDetails ? (
        <Movie
          feature={singleMovie}
          title="Movie Detail Page"
          onClick={setMovieDetails}
        />
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
    </>
  );
}

export default App;
