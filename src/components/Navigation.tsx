import { NavLink } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className="Navigation">
      <NavLink to="/">Search movie</NavLink>
      <NavLink to="/my-favorites">Favorites</NavLink>
    </nav>
  );
};

export default Navigation;
