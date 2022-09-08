import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const endpoint = "http://localhost:5000/user/login";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      axios.post(endpoint, values).then((res) => {
        if (res.data.status) {
          setResponse(res.data.response);
          setStatus(res.data.status);
          setLoading(false);
          navigate(`/home/dashboard/${res.data.result._id}`);
        } else {
          setResponse(res.data.response);
          setStatus(res.data.status);
          setLoading(false);
        }
      });
      // if (localStorage.AllUser) {
      //   let alluser = JSON.parse(localStorage.AllUser);
      //   let user = alluser.find(
      //     (user) =>
      //       user.email === values.email && user.password === values.password
      //   );
      //   if (user !== undefined) {
      //     localStorage.currentUser = JSON.stringify(user);
      //     navigate("/home/dashboard");
      //   } else {
      //     alert("User not found");
      //   }
      // } else {
      //   alert("Please Create an Account First");
      //   navigate("/signup");
      // }
    },
    validate: (values) => {
      let errors = {};
      if (values.email === "") {
        errors.email = "email is required!";
      }
      if (values.password === "") {
        errors.password = "password is required!";
      }

      return errors;
    },
  });

  return (
    <form className="form login-form" onSubmit={formik.handleSubmit}>
      {response && (
        <Alert
          key={status ? "success" : "danger"}
          variant={status ? "success" : "danger"}
        >
          {response}
        </Alert>
      )}
      <h1>Login</h1>

      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        name="email"
        placeholder="Email"
      />
      <br />
      {formik.touched.email && (
        <div className="error">{formik.errors.email}</div>
      )}
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        name="password"
        placeholder="Password"
      />
      <br />
      {formik.touched.password && (
        <div className="error">{formik.errors.password}</div>
      )}
      <button type="submit">
        {loading ? <Spinner animation="border" variant="light" /> : "Login"}
      </button>
      <p>
        Dont have an account?
        <Link className="link" to="/signup">
          {" "}
          Create account
        </Link>
      </p>
    </form>
  );
};

export default Login;
