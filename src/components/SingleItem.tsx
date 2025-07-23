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
        <img src={movieDetail.Poster} />
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
