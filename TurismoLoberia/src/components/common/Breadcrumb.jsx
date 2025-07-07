import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../styles/breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <li className="breadcrumb-item"></li>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><FaHome/>Inicio</Link>
        </li>
        {pathnames.map((name, idx) => {
          const routeTo = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathnames.length - 1;
          return isLast ? (
            <li
              className="breadcrumb-item active"
              aria-current="page"
              key={routeTo}
            >
              {decodeURIComponent(name)}
            </li>
          ) : (
            <li className="breadcrumb-item" key={routeTo}>
              <Link to={routeTo}>{decodeURIComponent(name)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
