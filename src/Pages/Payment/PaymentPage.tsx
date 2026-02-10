import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handlePayNow = async () => {
    try {
      // 1️⃣ CALL BACKEND PAYMENT API
      await axios.post("http://localhost:8080/payment/checkout", {
        userId,
        totalAmount: 1, // dummy amount
        courses: [courseId],
      });

      // 2️⃣ GET EXISTING PURCHASES
      const existing = JSON.parse(
        localStorage.getItem("purchasedCourses") || "[]"
      );

      // 3️⃣ GET COURSE DETAILS SAVED FROM CourseDetails PAGE
      const newCourse = {
        _id: courseId,
        title: localStorage.getItem("currentCourseTitle"),
        videoUrl: localStorage.getItem("currentVideoUrl"),
      };

      // 4️⃣ ADD NEW COURSE
      existing.push(newCourse);

      // 5️⃣ SAVE UPDATED PURCHASE LIST
      localStorage.setItem("purchasedCourses", JSON.stringify(existing));

      alert("Payment successful!");

      // 6️⃣ GO TO MY LEARNING PAGE
      navigate("/my-learning");
    } catch (err) {
      console.log(err);
      alert("Payment failed!");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dummy Payment Page</h1>
      <p>Click below to complete the payment</p>

      <button
        onClick={handlePayNow}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          background: "#a435f0",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
