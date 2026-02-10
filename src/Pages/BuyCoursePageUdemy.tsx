// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/pages/_buy-course-page.scss";

// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51SZVJGRkWvXAmF5OZNMhNxjhm0hXmrZ2djasCwRa17cTarudxPPKgGXW3Dp4kTAWVHH9bVlogvJKW5YhipcvfRq600BAfHE3zj"
// );

// interface Course {
//   _id: string;
//   title: string;
//   price: number;
//   subtitle?: string;
//   description?: string;
//   instructor: string;
//   image?: string;
//   videoUrl?: string;
//   path?: string;
//   highlights?: string[];
//   rating?: number;
//   totalRatings?: number;
//   learners?: number;
//   bestSeller?: boolean;
//   category?: string;
//   level?: string;
//   language?: string;
// }

// function CheckoutForm({ clientSecret, course }: { clientSecret: string; course: Course }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const handlePayment = async () => {
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setErrorMessage(null);

//     try {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/#/my-orders`,
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         setErrorMessage(error.message || "Payment failed");
//         setIsProcessing(false);
//       } else {
//         // Payment succeeded - ensure payment info is stored
//         if (paymentIntent && paymentIntent.id) {
//           const courseId = localStorage.getItem("pendingCourseId");
//           const price = localStorage.getItem("pendingPrice");
//           if (!courseId || !price) {
//             // Store paymentIntentId - backend will get metadata from Stripe
//             localStorage.setItem("pendingPaymentIntentId", paymentIntent.id);
//             // Keep existing courseId and price if available
//             if (courseId) {
//               localStorage.setItem("pendingCourseId", courseId);
//             }
//             if (price) {
//               localStorage.setItem("pendingPrice", price);
//             }
//           }
//         }
//         window.location.href = `${window.location.origin}/#/my-orders`;
//       }
//     } catch (err: any) {
//       setErrorMessage(err.message || "An error occurred");
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="stripe-checkout-form" style={{ marginTop: "20px" }}>
//       <PaymentElement />
      
//       {errorMessage && (
//         <div style={{ 
//           color: "#c14532", 
//           marginTop: "12px", 
//           fontSize: "14px",
//           padding: "8px",
//           background: "#fee",
//           borderRadius: "4px"
//         }}>
//           {errorMessage}
//         </div>
//       )}

//       <button
//         onClick={handlePayment}
//         disabled={isProcessing || !stripe}
//         className="btn-buy-now"
//         style={{
//           marginTop: "20px",
//           width: "100%",
//           padding: "14px",
//           background: isProcessing ? "#6a6f73" : "#a435f0",
//           border: "none",
//           color: "white",
//           borderRadius: "4px",
//           fontSize: "16px",
//           fontWeight: 700,
//           cursor: isProcessing ? "not-allowed" : "pointer",
//           transition: "background 0.2s",
//         }}
//       >
//         {isProcessing ? "Processing..." : `Complete Purchase - ₹${course.price}`}
//       </button>
//     </div>
//   );
// }

// function BuyCoursePageUdemy() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState<Course | null>(null);
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/api/courses/${id}`);
//         const courseData = res.data.course || res.data;
        
//         let imagePath = courseData.image;
//         if (imagePath && !imagePath.startsWith("http")) {
//           imagePath = `http://localhost:8080/${imagePath.replace(/\\/g, "/").replace(/^\//, "")}`;
//         } else if (!imagePath && courseData.path) {
//           imagePath = `http://localhost:8080/${courseData.path.replace(/\\/g, "/").replace(/^\//, "")}`;
//         }
        
//         setCourse({ ...courseData, image: imagePath });
//       } catch (err) {
//         setError("Course not found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCourse();
//     }
//   }, [id]);

//   const handleBuyNow = async () => {
//     if (!course) return;

//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");
//     if (!userId || !token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:8080/api/payments/create", {
//         userId: userId,
//         courseId: course._id,
//         price: course.price,
//       });

//       if (res.data.clientSecret) {
//         // Store payment info for fallback order saving
//         localStorage.setItem("pendingPaymentIntentId", res.data.paymentIntentId);
//         localStorage.setItem("pendingCourseId", course._id);
//         localStorage.setItem("pendingPrice", String(course.price));
//         setClientSecret(res.data.clientSecret);
//       } else {
//         setError("Failed to initialize payment");
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Failed to create payment");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="buy-course-loading">
//         <p>Loading course...</p>
//       </div>
//     );
//   }

//   if (error && !course) {
//     return (
//       <div style={{ padding: "40px", textAlign: "center" }}>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!course) return null;

//   return (
//     <div className="buy-course-page">
//       <div className="breadcrumbs-section">
//         <div className="breadcrumbs-container">
//           <div className="breadcrumbs">
//             <span>Development</span>
//             <span className="separator">/</span>
//             <span>{course.category || "Programming"}</span>
//             <span className="separator">/</span>
//             <span>{course.title}</span>
//           </div>
//         </div>
//       </div>

//       <div className="buy-course-container">
//         <div className="buy-course-layout">
//           <div className="course-info-section">
//             <div className="course-header-dark">
//               <h1 className="course-title-main">{course.title}</h1>
//               {course.subtitle && (
//                 <p className="course-subtitle">{course.subtitle}</p>
//               )}

//               <div className="course-badges">
//                 {course.bestSeller && (
//                   <span className="badge bestseller">Bestseller</span>
//                 )}
//                 <span className="badge premium">Premium</span>
//               </div>

//               <div className="course-instructor-link">
//                 Created by <span className="instructor-name">{course.instructor}</span>
//               </div>

//               <div className="course-metadata">
//                 <div className="metadata-item">
//                   <span>⭐ {course.rating?.toFixed(1) || "4.5"}</span>
//                 </div>
//                 <div className="metadata-item">
//                   <span>👥 {course.learners?.toLocaleString() || 0} students</span>
//                 </div>
//                 <div className="metadata-item">
//                   <span>📚 {course.level || "All Levels"}</span>
//                 </div>
//                 <div className="metadata-item">
//                   <span>🌐 {course.language || "English"}</span>
//                 </div>
//               </div>

//               {course.highlights && course.highlights.length > 0 && (
//                 <div className="what-you-learn">
//                   <h2 className="section-title">What you'll learn</h2>
//                   <div className="highlights-grid">
//                     {course.highlights.slice(0, 6).map((highlight, idx) => (
//                       <div key={idx} className="highlight-item">
//                         <span className="check-icon">✓</span>
//                         <span>{highlight}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {course.description && (
//               <div className="course-description-section">
//                 <h2 className="section-title">Description</h2>
//                 <p className="description-text">{course.description}</p>
//               </div>
//             )}
//           </div>

//           <div className="purchase-card-wrapper">
//             <div className="purchase-card">
//               {course.image && (
//                 <div className="purchase-card-video">
//                   <img
//                     src={course.image}
//                     alt={course.title}
//                     className="purchase-image"
//                   />
//                   <span className="preview-badge">Preview</span>
//                 </div>
//               )}

//               <div className="purchase-content">
//                 <div className="price-section">
//                   <span className="current-price">₹{course.price.toLocaleString()}</span>
//                 </div>

//                 {!clientSecret ? (
//                   <div className="purchase-buttons">
//                     <button
//                       className="btn-buy-now"
//                       onClick={handleBuyNow}
//                       style={{
//                         width: "100%",
//                         padding: "14px",
//                         background: "#a435f0",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                         fontSize: "16px",
//                         fontWeight: 700,
//                         cursor: "pointer",
//                       }}
//                     >
//                       Buy now
//                     </button>
//                   </div>
//                 ) : (
//                   <Elements
//                     stripe={stripePromise}
//                     options={{
//                       clientSecret,
//                       appearance: {
//                         theme: "stripe",
//                       },
//                     }}
//                   >
//                     <CheckoutForm clientSecret={clientSecret} course={course} />
//                   </Elements>
//                 )}

//                 <div className="guarantees">
//                   <p>30-Day Money-Back Guarantee</p>
//                   <p>Full Lifetime Access</p>
//                 </div>

//                 <div className="course-includes">
//                   <h3>This course includes:</h3>
//                   <div className="includes-list">
//                     <div className="include-item">
//                       <span className="include-icon">✓</span>
//                       <span>Full lifetime access</span>
//                     </div>
//                     <div className="include-item">
//                       <span className="include-icon">✓</span>
//                       <span>Certificate of completion</span>
//                     </div>
//                     <div className="include-item">
//                       <span className="include-icon">✓</span>
//                       <span>Access on mobile and TV</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BuyCoursePageUdemy;




import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pages/_buy-course-page.scss";

import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

interface Course {
  _id: string;
  title: string;
  price: number;
  subtitle?: string;
  description?: string;
  instructor: string;
  image?: string;
  videoUrl?: string;
  path?: string;
  highlights?: string[];
  rating?: number;
  totalRatings?: number;
  learners?: number;
  bestSeller?: boolean;
  category?: string;
  level?: string;
  language?: string;
}

function CheckoutForm({
  clientSecret,
  course,
}: {
  clientSecret: string;
  course: Course;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/#/my-orders`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment failed");
        setIsProcessing(false);
      } else {
        if (paymentIntent?.id) {
          localStorage.setItem("pendingPaymentIntentId", paymentIntent.id);
        }
        window.location.href = `${window.location.origin}/#/my-orders`;
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <div className="stripe-checkout-form" style={{ marginTop: "20px" }}>
      <PaymentElement />

      {errorMessage && (
        <div style={{ color: "#c14532", marginTop: "12px" }}>
          {errorMessage}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={isProcessing || !stripe}
        className="btn-buy-now"
        style={{ marginTop: "20px", width: "100%" }}
      >
        {isProcessing ? "Processing..." : `Complete Purchase - ₹${course.price}`}
      </button>
    </div>
  );
}

function BuyCoursePageUdemy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
        const courseData = res.data.course || res.data;

        let imagePath = courseData.image;
        if (imagePath && !imagePath.startsWith("http")) {
          imagePath = `${API_BASE_URL}/${imagePath.replace(/\\/g, "/").replace(/^\//, "")}`;
        }

        setCourse({ ...courseData, image: imagePath });
      } catch {
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  const handleBuyNow = async () => {
    if (!course) return;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/payments/create`, {
        userId,
        courseId: course._id,
        price: course.price,
      });

      if (res.data.clientSecret) {
        localStorage.setItem("pendingPaymentIntentId", res.data.paymentIntentId);
        localStorage.setItem("pendingCourseId", course._id);
        localStorage.setItem("pendingPrice", String(course.price));
        setClientSecret(res.data.clientSecret);
      } else {
        setError("Failed to initialize payment");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create payment");
    }
  };

  if (loading) return <p>Loading course...</p>;
  if (error && !course) return <p>{error}</p>;
  if (!course) return null;

  return (
    <div className="buy-course-page">
      <h1>{course.title}</h1>

      {!clientSecret ? (
        <button className="btn-buy-now" onClick={handleBuyNow}>
          Buy now ₹{course.price}
        </button>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <CheckoutForm clientSecret={clientSecret} course={course} />
        </Elements>
      )}
    </div>
  );
}

export default BuyCoursePageUdemy;
