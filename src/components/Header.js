import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const { logout } = useLogout();
  // Checking if the user is signed in.
  const { user } = useAuthContext();

  const handleClick = () => {
    // Prompting log out
    logout();
  }

  return(
    <div className="Header">
      {/* site logo */}
      <Link to="/" className="site-title">
        <img src="https://files.catbox.moe/8bst3m.png" alt=""/>
        <p>MyMediaTracker</p>
      </Link>
      <div style={{"display" : "flex", "gap" : "10px"}}>
        {/* the 'log out' button and email will only show when signed in*/}
        {user && <div>Hello, {user.username}!</div>}
        {user && <button className="button-top" onClick={handleClick}>Log out</button>}
        
        {/* the 'sign up' and 'log in' buttons will only show when signed out*/}
        {!user && <Link to="/signup" className="button-top">Sign up</Link>}
        {!user && <Link to="/login" className="button-top">Log in</Link>}
      </div>
    </div>
  );
}

export default Header;
