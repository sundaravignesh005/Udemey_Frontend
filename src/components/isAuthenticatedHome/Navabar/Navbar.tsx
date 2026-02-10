import "../../../styles/Components/Auth/_navabar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart, CiBellOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

function AuthNavbar({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const { roles, currentRole, switchRole } = useAuth();
  const [unread, setUnread] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/chat/unread/${userId}`)
        .then((res) => setUnread(res.data.unreadCount))
        .catch(() => setUnread(0));
    }
  }, [userId]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const showSwitch = roles && roles.length > 1;
  const nextRole = currentRole === "instructor" ? "student" : "instructor";

  return (
    <header>
      <nav>
        <div className='navbar'>
          <NavLink to='/authenticated-home'>
            <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Udemy-Logo" />
          </NavLink>

          <div className='nav-list'>
            <NavLink to='/explore'>Explore</NavLink>
            <input type="text" placeholder='Search for Anything' />
            <span><CiSearch /></span>
          </div>

          <div className='nav-list-item'>
            <ul>
              {/* Instructor OR user home switch */}
              <li>
                {currentRole === "instructor" ? (
                  <>
                    <NavLink to='/instructor-dashboard'>Instructor</NavLink>
                    <NavLink to='/instructor-purchases' style={{ marginLeft: "10px" }}>Purchases</NavLink>
                  </>
                ) : (
                  <NavLink to='/authenticated-home'>New Learners</NavLink>
                )}
              </li>

              {/* My learning and orders for users */}
              {currentRole === "student" && (
                <>
                  <li><NavLink to='/my-learning'>My Learning</NavLink></li>
                  <li><NavLink to='/my-orders'>My Orders</NavLink></li>
                </>
              )}

              {/* ❤️ Wishlist */}
              <li><NavLink to=''><span><CiHeart /></span></NavLink></li>

              {/* Cart */}
              <li className='Cart'>
                <NavLink to='/cart'><span><IoCartOutline /></span></NavLink>
              </li>

              {/* 🔔 Notifications */}
              <li><NavLink to=''><span><CiBellOn /></span></NavLink></li>

              {/* 💬 CHAT / MESSAGES BUTTON */}
              <li>
                {currentRole === "student" && (
                  <NavLink to="/chat" className="chat-link">
                    Chat
                    {unread > 0 && <span className="unread-badge">{unread}</span>}
                  </NavLink>
                )}

                {currentRole === "instructor" && (
                  <NavLink to="/instructor-chat" className="chat-link">
                    Messages
                    {unread > 0 && <span className="unread-badge">{unread}</span>}
                  </NavLink>
                )}
              </li>

            </ul>
          </div>

          <div className='logout'>
            {showSwitch && (
              <button
                className="switch-role-btn"
                onClick={() => switchRole(nextRole as any)}
              >
                {currentRole === "instructor" ? "Switch to Student Mode" : "Switch to Instructor Mode"}
              </button>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AuthNavbar;
