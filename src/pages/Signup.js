import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [encodedImage, setEncodedImage] = useState("");

  function generateRandomnumber(Accounttype) {
    if (Accounttype === "Savings") {
      return Number("" + 101 + Math.floor(Math.random() * 10000000 + 1));
    } else if (Accounttype === "Current") {
      return Number("" + 202 + Math.floor(Math.random() * 10000000 + 1));
    }
  }
  const handleImage = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setEncodedImage(reader.result);
    };
  };

  const saveUsertoDB = (values, generateRandomnumber) => {
    let endpoint = "http://localhost:5000/user/signup";

    let Accountnum = generateRandomnumber;
    let AccountBalance = 2000;
    let recentTransaction = [];
    let wallets = [];
    let userInfo = {
      ...values,
      Accountnum,
      AccountBalance,
      recentTransaction,
      wallets,
    };
    axios.post(endpoint, userInfo).then((res) => {
      if (res.data.status) {
        setResponse(res.data.message);
        setLoading(false);
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Gender: "",
      Accounttype: "",
      email: "",
      password: "",
      image: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      saveUsertoDB(
        { ...values, image: encodedImage },
        generateRandomnumber(values.Accounttype)
      );
    },

    validate: (values) => {
      let errors = {};
      if (values.FirstName === "") {
        errors.FirstName = "FirstName is required!";
      }
      if (values.LastName === "") {
        errors.LastName = "last Name is required!";
      }
      return errors;
    },
  });

  return (
    <form className="form signup-form" onSubmit={formik.handleSubmit}>
      {response && (
        <Alert key="success" variant="success">
          {response}
        </Alert>
      )}
      <h1>Sign Up</h1>
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        name="FirstName"
        placeholder="First Name"
      />
      <br />
      {formik.touched.FirstName && (
        <div className="error">{formik.errors.FirstName}</div>
      )}
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        name="LastName"
        placeholder="Last Name"
      />
      <br />
      {formik.touched.LastName && (
        <div className="error">{formik.errors.FirstName}</div>
      )}
      <select
        onBlur={formik.handleBlur}
        name="Gender"
        onChange={formik.handleChange}
      >
        <option selected disabled>
          Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <br />
      <div className="error">{formik.errors.Gender}</div>
      <select
        onBlur={formik.handleBlur}
        name="Accounttype"
        onChange={formik.handleChange}
      >
        <option selected disabled>
          Account type
        </option>
        <option value="Savings">Savings</option>
        <option value="Current">Current</option>
      </select>
      <br />
      <div className="error">{formik.errors.Accounttype}</div>
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="email"
        type="email"
        placeholder="Email"
      />
      <br />
      <div className="error">{formik.errors.email}</div>
      <input
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        name="password"
        type="password"
        placeholder="password"
      />
      <br />
      <div className="error">{formik.errors.password}</div>
      <label htmlFor="image">Select a Profile picture</label>
      <input
        type="file"
        onChange={(e) => handleImage(e)}
        // onChange={(e) => {
        //   handleImage(e);

        //   // formik.setFieldValue("image", encodedImage);
        // }}
        name="image"
      />

      <button type="submit">
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : (
          "Create Account"
        )}
      </button>
      <p>
        Have an account?{" "}
        <Link className="link" to="/">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
