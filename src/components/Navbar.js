import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("AuthToken");
    navigate("./login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
              {localStorage.getItem("AuthToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                >
                  My Orders
                </Link>
              ) : (
                " "
              )}
            </div>
            {!localStorage.getItem("AuthToken") ? (
              <div className="d-flex">
                <Link
                  className="nav-link btn bg-white text-success mx-1"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="nav-link btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div className="nav-link btn bg-white text-success mx-1" onClick={()=>setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div
                  className="nav-link btn bg-white text-danger mx-1"
                  onClick={handleClick}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
