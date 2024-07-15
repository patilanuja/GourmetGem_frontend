import { Outlet, Link } from "react-router-dom";
import './App.css';


const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/api/recipes/recipes">Recipes</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;