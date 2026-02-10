import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Components/_register.scss";
import { MdOutlineMailOutline } from "react-icons/md";
import Footer from "../Footer/Footer";

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // ================================
  //       FORM SUBMIT HANDLER
  // ================================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          selectedRole: userData.role, // 👈 FIXED: Backend expects this
        }
      );

      console.log(response.data);

      setUserData({
        name: "",
        email: "",
        password: "",
        role: "",
      });

      alert("Account created successfully!");
      navigate("/login");

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const backendError = err.response?.data;

        console.error("Signup error:", backendError);

        if (backendError?.errors && backendError.errors.length > 0) {
          alert(backendError.errors[0].msg);
        } else {
          alert(backendError?.message || "Signup failed");
        }
      }
    }
  };

  return (
    <>
      <section className="Register-Card">
        <div className="Register-flex">
          <div className="Register-image">
            <img
              src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp"
              alt="Register"
            />
          </div>

          <div className="Register-Form">
            <h1>Sign up with email</h1>

            {/* ================================
                    SIGNUP FORM
            ================================= */}
            <form onSubmit={handleSubmit}>
              <div className="Name">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="Email">
                <input
                  type="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="Email">
                <input
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />
              </div>

              {/* 👇 FIXED ROLE DROPDOWN */}
              <div className="Role-based">
                <select
                  value={userData.role}
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
                  required
                >
                  <option value="">Select the Role</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>

              <div className="Recommendation">
                <input type="checkbox" />
                <NavLink to="/">
                  Send me special offers & personalized recommendations
                </NavLink>
              </div>

              <div className="email-btn-box">
                <button className="email-btn" type="submit">
                  Continue with email
                </button>
                <span>
                  <MdOutlineMailOutline />
                </span>
              </div>
            </form>

            <div className="Other-options">
              <span>Other Sign up options</span>
            </div>

            <div className="Other-platform">
              <NavLink to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                  alt="Google"
                />
              </NavLink>
              <NavLink to="/">
                <img
                  src="https://www.pngplay.com/wp-content/uploads/9/Facebook-Free-PNG.png"
                  alt="Facebook"
                />
              </NavLink>
              <NavLink to="/">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                />
              </NavLink>
            </div>

            <p className="Term-and-condition">
              By signing up, you agree to our{" "}
              <NavLink to="/">Terms of Use</NavLink> and{" "}
              <NavLink to="/">Privacy Policy</NavLink>.
            </p>

            <p className="Already-have-account">
              Already have an account?{" "}
              <NavLink to="/Login">Log in</NavLink>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Register;
