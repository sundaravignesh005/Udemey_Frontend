import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../styles/Components/_courseCreation.scss";
import { FaGreaterThan, FaIndianRupeeSign } from "react-icons/fa6";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FaRegHeart } from "react-icons/fa";

interface CourseDetailsType {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  instructor: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  totalRatings: number;
  bestSeller?: boolean;
  highlights?: string[];
  path?: string;
  videoUrl?: string;
  category?: string;
  level?: string;
  language?: string;
  learners?: number;
  lastUpdated?: string;
}

function CourseDetails() {
  const navigate = useNavigate();

  // ✅ PARAM NAME MUST MATCH YOUR ROUTER
  const { id } = useParams(); 
  console.log("PARAM ID:", id);
 // <-- If router uses /courses/:id

  const [course, setCourse] = useState<CourseDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${id}`);

        const c = res.data.course;

        // 🔥 fix backend local image path
        const finalImage =
          c.image && c.image.startsWith("http")
            ? c.image
            : `http://localhost:8080/${(c.path || "").replace(/\\/g, "/")}`;

        setCourse({ ...c, image: finalImage });

      } catch (err) {
        console.log(err);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="course-details">
      <div className="course-detail-background">
        <div className="course-detail-content">

          <div className="course-container-1">
            <h3>
              <span>Development</span> <FaGreaterThan />
              <span> Web Development</span> <FaGreaterThan />
              <span> JavaScript</span>
            </h3>

            <div className="course-detail-title">
              <h1>{course.title}</h1>

              <div className="badges">
                {course.bestSeller && <p className="badge">Bestseller</p>}
                <p className="badge purple">Role Play</p>
              </div>

              <p className="author">
                Created by <Link to="/">{course.instructor}</Link>
              </p>
            </div>
          </div>

          <div className="course-container-2">
            <div className="course-box">

              <img src={course.image} alt={course.title} />

              <Tabs>
                <TabList className="tab-flex">
                  <Tab>Personal</Tab>
                  <Tab>Teams</Tab>
                </TabList>

                <TabPanel>
                  <div className="tab-course-content">
                    <h1 className="course-price">
                      <FaIndianRupeeSign /> {course.price}
                    </h1>

                    <div className="Btn">
                      <button onClick={() => navigate("/cart")} className="Cart">
                        Add to cart
                      </button>

                      <button className="like-course">
                        <FaRegHeart />
                      </button>

                      {/* Udemy-style Buy Now with Stripe */}
                      <button
                        onClick={async () => {
                          const userId = localStorage.getItem("userId");
                          if (!userId) {
                            alert("Please login to purchase courses");
                            navigate("/login");
                            return;
                          }

                          try {
                            const res = await axios.post(
                              "http://localhost:8080/stripe/create-checkout-session",
                              {
                                title: course.title,
                                price: course.price,
                                demoId: course._id,
                                userId: userId,
                              }
                            );
                            window.location.href = res.data.url;
                          } catch (err) {
                            console.error("Stripe error:", err);
                            alert("Payment failed. Please try again.");
                          }
                        }}
                        className="Purchases"
                      >
                        Buy now
                      </button>
                    </div>

                    <p>30-Day Money-Back Guarantee</p>
                    <p>Full Lifetime Access</p>
                  </div>
                </TabPanel>

                <TabPanel>
                  <p>Teams Plan</p>
                </TabPanel>
              </Tabs>

            </div>
          </div>

        </div>
      </div>

      {/* ⭐ UDEMY-STYLE FULL COURSE DETAILS */}
      <div className="course-instruction-container">
        <h2>What You'll Learn</h2>
        <div className="course-instruction-box">
          <ul>
            {course.highlights?.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Content Section */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Course Content</h2>
        {course.videoUrl ? (
          <div style={{ marginTop: "20px" }}>
            <video
              src={course.videoUrl}
              controls
              style={{ width: "100%", maxWidth: "800px", borderRadius: "8px" }}
            />
          </div>
        ) : (
          <p style={{ marginTop: "20px", color: "#666" }}>
            Course content will be available after purchase.
          </p>
        )}
      </div>

      {/* Course Description */}
      {course.description && (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2>Description</h2>
          <p style={{ marginTop: "20px", lineHeight: "1.8", color: "#333" }}>
            {course.description}
          </p>
        </div>
      )}

      {/* Course Requirements */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2>Requirements</h2>
        <ul style={{ marginTop: "20px", lineHeight: "2" }}>
          <li>No prior experience needed</li>
          <li>Basic computer skills</li>
          <li>Internet connection</li>
        </ul>
      </div>

      {/* Instructor Section */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid #ddd" }}>
        <h2>Instructor</h2>
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#A435F0", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "24px", fontWeight: "bold" }}>
            {course.instructor.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{course.instructor}</h3>
            <p style={{ color: "#666" }}>Expert Instructor</p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", background: "#f7f9fa", display: "flex", gap: "40px", flexWrap: "wrap" }}>
        <div>
          <strong>Rating:</strong> {course.rating.toFixed(1)} ⭐ ({course.totalRatings} ratings)
        </div>
        {course.learners && (
          <div>
            <strong>Students:</strong> {course.learners.toLocaleString()}
          </div>
        )}
        {course.level && (
          <div>
            <strong>Level:</strong> {course.level}
          </div>
        )}
        {course.language && (
          <div>
            <strong>Language:</strong> {course.language}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
