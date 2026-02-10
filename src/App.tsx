import "./main.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Features/Register";
import Home from "./Pages/Home";
import Login from "./components/Features/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProductedRoute";
import AuthenticatedHome from "./Pages/AuthenticatedHome";
import AuthNavbar from "./components/isAuthenticatedHome/Navabar/Navbar";
import InstructorDashBoard from "./Pages/InstructorDashBoard";
import CourseCreationForm from "./Pages/CourseCreationForm";
import CourseDetails from "./components/CourseCard/CourseDetails";
import CartPage from "./components/Features/CartPage";
import PaymentPage from "./Pages/Payment/PaymentPage";
import MyLearning from "./Pages/Payment/MyLearning";
import ChatPage from "./Pages/ChatPage";
import InstructorChatPage from "./Pages/InstructorChatPage";
import InstructorPurchasesPage from "./Pages/InstructorPurchasesPage";
import BuyCoursePageUdemy from "./Pages/BuyCoursePageUdemy";
import MyOrdersPage from "./Pages/MyOrdersPage";
import CourseListingPage from "./Pages/CourseListingPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthProvider, useAuth } from "./context/AuthContext";

const stripePromise = loadStripe("pk_test_************************");

function AppShell() {
  const { isAuthenticated, currentRole, roles, logout } = useAuth();

  return (
    <Elements stripe={stripePromise}>
      <Router>
        {isAuthenticated ? (
          <AuthNavbar onLogout={logout} />
        ) : (
          <Navbar />
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route
            path="authenticated-home"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                currentRole={currentRole}
              >
                <AuthenticatedHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="instructor-dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                currentRole={currentRole}
                requiredRole="instructor"
              >
                <InstructorDashBoard />
              </ProtectedRoute>
            }
          />

          <Route
            path="course-creation-form"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                currentRole={currentRole}
                requiredRole="instructor"
              >
                <CourseCreationForm />
              </ProtectedRoute>
            }
          />

          <Route path="/courses" element={<CourseListingPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/buy-course/:id" element={<BuyCoursePageUdemy />} />
          <Route path="/buy/:id" element={<BuyCoursePageUdemy />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/:courseId" element={<PaymentPage />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/my-learning/:courseId" element={<MyLearning />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/instructor-chat" element={<InstructorChatPage />} />
          <Route
            path="/instructor-purchases"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                currentRole={currentRole}
                requiredRole="instructor"
              >
                <InstructorPurchasesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Elements>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}

export default App;
