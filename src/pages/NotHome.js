import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

function NotHome() {
  return (
    <div className="NotHome">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default NotHome;
