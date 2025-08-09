import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Banner } from "../components/Banner";

//Storing the hero image gallery image links in a list so they can easily be updated.
const images = [
  "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p186423_b_v8_ae.jpg",
  "https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-clementoni-1000-pieces-netflix-squid-game.webp",
  "https://socialastro.com/uploads/images/202505/image_870x_683041657290b.jpg",
  "https://m.media-amazon.com/images/I/81q77Q39nEL.jpg",
  "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "https://m.media-amazon.com/images/I/81VVAVqWtzL._UF1000,1000_QL80_.jpg",
  "https://fr.web.img2.acsta.net/pictures/19/08/02/15/12/4423178.jpg",
  "https://preview.redd.it/new-poster-for-sinners-v0-0sdqlcbgv9qe1.jpeg?width=1080&crop=smart&auto=webp&s=1aae6761687fe55208847c473b99d2cce3a8023b",
  "https://m.media-amazon.com/images/I/71JFMQYhn7L._UF894,1000_QL80_.jpg"
].map((image) => ({
  id: crypto.randomUUID(),
  image
}));

function Home() {
  //Checking if the user is signed in.
  const { user } = useAuthContext();

  return (
    <div>
      <div id="home">
        <div>
          <p className="slogan">All Your Media. Simplified.</p>
          <p className="caption">Track all your favorite entertainment in one place.</p>
          <Link to="/signup" className="btn">{!user && 'Start'} {user && 'Continue'} Tracking</Link>
          <Banner images={images} speed={17000} />
        </div>
      </div>
    </div>
  );
}

export default Home;
