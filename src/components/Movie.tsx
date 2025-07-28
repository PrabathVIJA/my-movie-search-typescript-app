import type { movies } from "../App.tsx";
import { MdArrowBack } from "react-icons/md";
import Title from "../components/Title.tsx";

interface movieprop {
  feature: movies[];
  title: string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Movie({ feature, title, onClick }: movieprop) {
  return (
    <>
      <div className="individual-movie-container">
        <div className="footer-movie">
          <button onClick={() => onClick(false)}>
            <MdArrowBack size={24} />
          </button>
          <Title title={title} />
          <div></div>
        </div>
        <div className="movie-details">
          {feature.map((featureMovie) => (
            <div key={featureMovie.imdbID}>
              <img
                src={
                  featureMovie.Poster === "N/A"
                    ? "/FallBackImg.jpg"
                    : featureMovie.Poster
                }
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/FallBackImg.jpg";
                }}
              />
              <div className="title-year">
                <p>{featureMovie.Title}</p>
                <p>{featureMovie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
