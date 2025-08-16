import './App.css';
import NotHome from './pages/NotHome';
import Home from './pages/Home';
import Header from './components/Header.js';
import Search from './pages/Search';
import Anime from './pages/Anime';
import Book from './pages/Book';
import Manga from './pages/Manga';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Movie from './pages/Movie';
import Tv from './pages/Tv';
import Profile from './pages/Profile';


import { useAuthContext } from './hooks/useAuthContext.js';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  const { user } = useAuthContext();
  
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
        {/* the header is present on every page*/}
        <Header />
        <Routes>
          {/*accessible to everyone*/}
          <Route path="/" element={<Home />} />

          {/*only accessible to logged out users*/}
          <Route path="/signup" element={!user ? <Signup />  : <Navigate to="/search"/>} />
          <Route path="/login" element={!user ? <Login />  : <Navigate to="/search"/>} />

          {/*protected routes only accessible to logged in users*/}
          <Route element={<NotHome />}>
            <Route path="/search" element={user ? <Search /> : <Navigate to="/login"/>} />
            <Route path="/anime" element={user ? <Anime />  : <Navigate to="/login"/>} />
            <Route path="/book" element={user ? <Book />  : <Navigate to="/login"/>} />
            <Route path="/manga" element={user ? <Manga />  : <Navigate to="/login"/>} />
            <Route path="/movie" element={user ? <Movie />  : <Navigate to="/login"/>} />
            <Route path="/tv" element={ user ? <Tv />  : <Navigate to="/login"/>} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
