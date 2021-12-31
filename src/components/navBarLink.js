import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function NavBarLink({ exact, name, path }) {
  const routeMatch = useRouteMatch({
    exact,
    path,
  });

  return (
    <Link className={`nav-link ${routeMatch && "active"}`} to={path}>
      {name}
    </Link>
  );
}

export default NavBarLink;
