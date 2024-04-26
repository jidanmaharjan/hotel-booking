import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const login = (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    };
    setLoading(true);
    axios
      .post("api/users/login", user)
      .then((response) => {
        console.log(response);
        setLoading(false);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href='/'
        // resolve(response);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        // reject(error);
      });
    
  };

  return (
    <div className="container">
        {loading && <Loader/> }
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 ">
            {error && <Error message='Invalid Credentials' /> }
          <h1>Login</h1>
          <form onSubmit={login}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
