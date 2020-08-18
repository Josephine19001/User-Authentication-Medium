import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../redux/action-creators";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.authentication);

  const handleSignOut = () => {
    dispatch(signOut(history));
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <div className="nav">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {currentUser !== null ? (
              <li onClick={handleSignOut}>
                <Link to="/">Sign out</Link>
              </li>
            ) : (
                <li>
                  <Link to="/">SignIn</Link>
                </li>
              )}

            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
