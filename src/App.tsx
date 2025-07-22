import { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import Input from "./components/Input.tsx";
import Button from "./components/Button.tsx";
import Title from "./components/Title.tsx";
import "./App.css";
const key: string = "1445ada9";
interface movies {
  Title: string;
  Year: string;
  Poster: string;
}
function App() {
  const [listOfMovies, setMovies] = useState<movies[]>([]);
  const [input, setInput] = useState<string>("");
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${key}&s=godfather`
      );
      const data = await response.json();
      setMovies(data.Search);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="header">
        <Title />
        <div className="input-container">
          <Input
            placeholder="Enter the movie"
            type="text"
            value={input}
            onChange={inputHandler}
          />
          <Button>
            <GrClearOption />
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
