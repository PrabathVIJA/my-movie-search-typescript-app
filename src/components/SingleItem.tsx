export interface movieDetail {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface ListOfPros {
  movieDetail: movieDetail;

  singleMovieHandler: (movie: movieDetail) => void;
}

export default function SingleItem({
  movieDetail,
  singleMovieHandler,
}: ListOfPros) {
  return (
    <>
      <li className="movie-card">
        <img
          src={
            movieDetail.Poster === "N/A"
              ? "/FallBackImg.jpg"
              : movieDetail.Poster
          }
          alt={movieDetail.Title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/FallBackImg.jpg";
          }}
        />
        <button
          className="Detail-Button"
          onClick={() => {
            singleMovieHandler(movieDetail);
          }}
        >
          Click for more Details
        </button>
      </li>
    </>
  );
}
