import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ApiManager } from "../services/ApiManager";
import * as Yup from "yup";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaVenusMars } from "react-icons/fa";

function SigninAndSignup({ login }) {
  const [activeTab, setActiveTab] = useState("signin");
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const formikSignIn = useFormik({
    initialValues: {
      signInEmail: "",
      signInPassword: "",
    },
    validationSchema: Yup.object({
      signInEmail: Yup.string().email("Invalid email").required("Email Required"),
      signInPassword: Yup.string().required("Password Required"),
    }),
    onSubmit: async (values,{setSubmitting}) => {
      try {
        const auth={
          Email: values.signInEmail,
          PasswordHash: values.signInPassword
        }
        const response = await ApiManager.PostApiCall("http://localhost:5090/api/Login", auth);

        if (!response.ok) {
          setErrorMsg("Invalid credentials");
        } else {
          const token = await response.text();
          localStorage.setItem("authtoken", token);
          const res=await ApiManager.GetApiCall(`http://localhost:5090/api/Users/${values.signInEmail}`);
          const user=await res.json();
          localStorage.setItem("uid",user.id);
          localStorage.setItem("uname",user.fullName);
          login();
          navigate("/Dashboard");
        }
      } catch (error) {
        console.error("Login Error:", error);
      }
      setSubmitting(false);
    },
  });

  const formikSignUp = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      age: "",
      gender: "",
      mobile: "",
      passwordHash: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name Required"),
      email: Yup.string().email("Invalid email").required("Email Required"),
      age: Yup.number().positive().integer().required("Age Required"),
      gender: Yup.string().required("Gender Required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a 10-digit phone number")
        .required("Mobile Number Required"),
      passwordHash: Yup.string().required("Password Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("passwordHash")], "Passwords must match")
        .required("Confirm Required"),
    }),
    onSubmit: async (values,{setSubmitting}) => {
      try {
        const response = await ApiManager.PostApiCall("http://localhost:5090/api/Users", values);

        if (!response.ok) {
          setErrorMsg("Registration failed.");
        } else {
          setShowModal(true);
        }
      } catch (error) {
        console.error("Sign Up Error:", error);
      }
      setSubmitting(false);
    },
  });

  const closeModal = () => {
    setShowModal(false);
    setActiveTab("signin");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "signin" ? "active" : ""}`} onClick={() => setActiveTab("signin")}>
              Sign In
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "signup" ? "active" : ""}`} onClick={() => setActiveTab("signup")}>
              Sign Up
            </button>
          </li>
        </ul>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        {activeTab === "signin" && (
          <form onSubmit={formikSignIn.handleSubmit}>
            <div className="mb-3">
              <label className="form-label"><FaEnvelope /> Email</label>
              <input type="email" className="form-control" {...formikSignIn.getFieldProps("signInEmail")} />
              {formikSignIn.touched.signInEmail && formikSignIn.errors.signInEmail ? (
                <div className="text-danger">{formikSignIn.errors.signInEmail}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaLock /> Password</label>
              <input type="password" className="form-control" {...formikSignIn.getFieldProps("signInPassword")} />
              {formikSignIn.touched.signInPassword && formikSignIn.errors.signInPassword ? (<div className="text-danger">{formikSignIn.errors.signInPassword}</div>) : null}
            </div>
            <button type="submit" className="btn btn-primary" disabled={formikSignIn.isSubmitting}>
            {formikSignIn.isSubmitting ? "Singing in..." : "Sign in"}
          </button>
          </form>
        )}

        {activeTab === "signup" && (
          <form onSubmit={formikSignUp.handleSubmit}>
            <div className="mb-3">
              <label className="form-label"><FaUser /> Full Name</label>
              <input type="text" className="form-control" {...formikSignUp.getFieldProps("fullName")} />
              {formikSignUp.touched.fullName && formikSignUp.errors.fullName ? (<div className="text-danger">{formikSignUp.errors.fullName}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaEnvelope /> Email</label>
              <input type="email" className="form-control" {...formikSignUp.getFieldProps("email")} />
              {formikSignUp.touched.email && formikSignUp.errors.email ? (<div className="text-danger">{formikSignUp.errors.email}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaVenusMars /> Gender</label>
              <select className="form-select" {...formikSignUp.getFieldProps("gender")}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formikSignUp.touched.gender && formikSignUp.errors.gender ? (<div className="text-danger">{formikSignUp.errors.gender}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"> Age</label>
              <input type="text" className="form-control" {...formikSignUp.getFieldProps("age")} />
              {formikSignUp.touched.age && formikSignUp.errors.age ? (<div className="text-danger">{formikSignUp.errors.age}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaPhone /> Mobile</label>
              <input type="text" className="form-control" {...formikSignUp.getFieldProps("mobile")} />
              {formikSignUp.touched.mobile && formikSignUp.errors.mobile ? (<div className="text-danger">{formikSignUp.errors.mobile}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaLock /> Password</label>
              <input type="password" className="form-control" {...formikSignUp.getFieldProps("passwordHash")} />
              {formikSignUp.touched.passwordHash && formikSignUp.errors.passwordHash ? (<div className="text-danger">{formikSignUp.errors.passwordHash}</div>) : null}
            </div>
            <div className="mb-3">
              <label className="form-label"><FaLock /> Confirm Password</label>
              <input type="password" className="form-control" {...formikSignUp.getFieldProps("confirmPassword")} />
              {formikSignUp.touched.confirmPassword && formikSignUp.errors.confirmPassword ? (<div className="text-danger">{formikSignUp.errors.confirmPassword}</div>) : null}
            </div>
            <button type="submit" className="btn btn-primary" disabled={formikSignUp.isSubmitting}>
            {formikSignUp.isSubmitting ? "Register..." : "Register"}
          </button>
          </form>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Successful</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Your account has been created successfully! You can now log in.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SigninAndSignup;
