import axios from "axios";
import { useState } from "react";
import Loader from "../components/Loader";

import Error from "../components/Error";
import Success from "../components/Success";

const Registerscreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const register = (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const user = {
        name,
        email,
        password
      };
      setLoading(true);
      axios
        .post("api/users/register", user)
        .then((response) => {
          console.log(response);
          setLoading(false);
          setSuccess(true);
          setName('');
          setEmail('');
          setPassword('');
          setCpassword('');
          // resolve(response);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
          // reject(error);
        });
    } else {
      alert("passwords do not match");
    }
  };

  return (
    <div className="container">
      {loading && <Loader /> }
      {error && <Error /> }
      
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5">
          <h1>Registration</h1>
          <form onSubmit={register}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          {success && <Success message='Registration Success' /> }

        </div>
      </div>
    </div>
  );
};

export default Registerscreen;
