import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";

import classes from "./Paginate.module.css";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <div
            className={`page-item active ${classes.pageItem} ${
              x + 1 === page && classes.pageItemActive
            }`}
            key={x + 1}
            active={x + 1 === page}
          >
            <Link
              className={`${classes.pageNumLink} ${classes.pageNumLinkActive}`}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
            >
              {x + 1}
            </Link>
          </div>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
