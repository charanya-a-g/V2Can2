//import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css"

const MainHeader = () => {
  return (
    <header className={classes.header}>
      {/* <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav> */}
      <div className={classes.logo}>V2 Can !</div>
    </header>
  );
};
export default MainHeader;