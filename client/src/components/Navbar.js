import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () =>{
    localStorage.removeItem('currentUser');
    window.location.href='/'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand">
          Mero Hotel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            {user ? (
              <div className="dropdown ">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <Link to={'/profile'} className="dropdown-item">
                  Profile
                  </Link>
                  {user.isAdmin === true &&
                  <Link to={'/dashboard'} className="dropdown-item">
                  Dashboard
                  </Link>}
                  <Link to={'/'} className="dropdown-item" onClick={logout}>
                  Logout
                  </Link>
                  
                </div>
              </div>
            ) : (
              <>
                <li className="nav-item active">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
