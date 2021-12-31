import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { UNANSWERED } from "./home";
import { setAuthedUser } from "../store/slices/authedUser.slice";
import { setShowQuestionType } from "../store/slices/common.slice";
import NavBarLink from "./navBarLink";

function NavBar({ navBarLinks, authedUser, dispatch, history }) {
  const [navBarHeaderWidth, setNavBarHeaderWidth] = useState(171);
  const navBarHeader = useRef(null);

  // Dynamically create extra spaces between the center and right side
  // so that the center nav bar links are centered correctly
  useEffect(() => {
    if (navBarHeader && navBarHeader.current)
      setNavBarHeaderWidth(navBarHeader.current.offsetWidth);
  }, [setNavBarHeaderWidth]);

  const onSignout = () => {
    dispatch(setAuthedUser(null));
    dispatch(setShowQuestionType(UNANSWERED));
    history.push("/");
  };

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm"
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" ref={navBarHeader} to="/">
          Would You Rather?
        </Link>
        <button
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            {navBarLinks.map((navBarLink) => (
              <li className="nav-item" key={navBarLink.path}>
                <NavBarLink
                  exact={navBarLink.exact}
                  name={navBarLink.name}
                  path={navBarLink.path}
                />
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              minWidth: navBarHeaderWidth,
            }}
          >
            {authedUser && (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <div
                    aria-expanded="false"
                    className="nav-path dropdown-toggle bg-dark text-light"
                    data-bs-toggle="dropdown"
                    style={{ userSelect: "none" }}
                  >
                    {authedUser.name}
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onSignout}
                        type="button"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProp = ({ authedUser, users }) => ({
  authedUser: authedUser && users[authedUser],
});

export default withRouter(connect(mapStateToProp)(NavBar));
