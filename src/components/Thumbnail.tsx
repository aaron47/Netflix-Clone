import { Movie } from "../../types";

interface Props {
  movie: Movie;
}

const Thumbnail:React.FC<Props> = ({movie}) => {
  return (
    <div>Thumbnail</div>
  )
}

export default Thumbnail