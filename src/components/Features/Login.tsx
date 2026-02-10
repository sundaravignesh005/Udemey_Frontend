import "../../styles/Components/_login.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userLogin, setuserLogin] = useState({
    email: "",
    password: "",
  });

  const HandleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        userLogin
      );

      // ⭐ MUST ADD THIS — shows EXACT API RESPONSE
      console.log("LOGIN RESPONSE:", response.data);

      const roles = (response.data.roles || ["student"]).map((r: string) =>
        (r || "student").toLowerCase()
      );
      const currentRole = (response.data.currentRole || roles[0] || "student").toLowerCase();
      const token = response.data.token;
      const userId = response.data.userId;
      const name = response.data.name;
      const email = response.data.email;

      localStorage.setItem("token",token);
      localStorage.setItem("userId",userId);
      localStorage.setItem("role", currentRole);

      // Update global auth context (persists to localStorage via AuthProvider)
      login({
        token,
        userId,
        roles,
        currentRole,
        name,
        email,
      });

      // Reset fields
      setuserLogin({ email: "", password: "" });

      if (currentRole === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/authenticated-home");
      }  

    
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("LOGIN ERROR:", err.response?.data);
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <section>
      <div className="Login-container">
        <div className="Login-Card">
          <div className="Login-content">
            <h1>Login</h1>

            <div className="Login-form">
              <form onSubmit={HandleUserLogin}>
                <div className="Email">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userLogin.email}
                    onChange={(e) =>
                      setuserLogin({ ...userLogin, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="Password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userLogin.password}
                    onChange={(e) =>
                      setuserLogin({ ...userLogin, password: e.target.value })
                    }
                    required
                  />
                </div>

                <button className="Login-btn" type="submit">
                  Login
                </button>

                <div className="Remember-box">
                  <div className="Remember-input">
                    <input type="checkbox" />
                    <p>Remember Me</p>
                  </div>
                  <div className="Forget-password">
                    <NavLink to="/">Forgot your password</NavLink>
                  </div>
                </div>
              </form>
            </div>

            <hr className="Login-line" />

            <div className="Not-Member">
              <p>Not a Member Yet?</p>
              <p className="sign-up-btn">
                <NavLink to="/SignUp">Sign up</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="CopyRight">
        <p className="privacy">Privacy PolicyTerms of Use</p>
        <p>
          Copyright © 2025 by Udemy, Inc. - All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Login;
