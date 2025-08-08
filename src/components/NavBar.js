import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

function NavBar() {
  // Function that lets us get the current page a user is on.
  const location = useLocation();
  const show = ['/anime', '/book', '/manga', '/movie', '/tv'].includes(location.pathname);
  
  return (
    <div id="sideNav" className="sidepanel">
      <Link to="/search" className={location.pathname === "/search" ? "highlight" : ""}>🔍︎ Search</Link>
      <Link to="/anime">☰ My Media</Link>
      {/* the list links will only show up on list pages*/}
      {show && <div>
        <Link to="/anime" className={location.pathname === "/anime" ? "highlight" : ""}>Anime</Link>
        <Link to="/book" className={location.pathname === "/book" ? "highlight" : ""}>Books</Link>
        <Link to="/manga" className={location.pathname === "/manga" ? "highlight" : ""}>Manga</Link>
        <Link to="/movie" className={location.pathname === "/movie" ? "highlight" : ""}>Movies</Link>
        <Link to="/tv" className={location.pathname === "/tv" ? "highlight" : ""}>TV Shows</Link>
      </div>}
    </div>
  );
}

export default NavBar;
