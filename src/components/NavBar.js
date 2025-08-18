import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import ThemeOption from "./ThemeOptions";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  // Function that lets us get the current page a user is on.
  const location = useLocation();
  const show = ['/anime', '/book', '/manga', '/movie', '/tv', '/game'].includes(location.pathname);

  // Checking if the user is signed in.
  const { user } = useAuthContext();
  
  return (
    <div id="sideNav" className="sidepanel">
      <Link to="/search" className={location.pathname === "/search" ? "highlight" : ""}>
        <SearchIcon />Search
      </Link>
      <Link to="/anime">
        <MenuIcon />My Media
      </Link>
      {/* the list links will only show up on list pages*/}
      {show && <div>
        <Link to="/anime" className={location.pathname === "/anime" ? "highlight" : ""}>Anime</Link>
        <Link to="/book" className={location.pathname === "/book" ? "highlight" : ""}>Books</Link>
        <Link to="/manga" className={location.pathname === "/manga" ? "highlight" : ""}>Manga</Link>
        <Link to="/movie" className={location.pathname === "/movie" ? "highlight" : ""}>Movies</Link>
        <Link to="/tv" className={location.pathname === "/tv" ? "highlight" : ""}>TV Shows</Link>
        <Link to="/game" className={location.pathname === "/game" ? "highlight" : ""}>Video Games</Link>
      </div>}
      {user && 
      <Link to={'/profile/'+user?.username} className={location.pathname === `/profile/${user?.username}` ? "highlight" : ""}>
        <PersonIcon />My Profile
      </Link>}
      <div className="theme-options">
        <ThemeOption theme="light"/>
        <ThemeOption theme="dark"/>
        <ThemeOption theme="pink"/>
      </div>
    </div>
  );
}

export default NavBar;
