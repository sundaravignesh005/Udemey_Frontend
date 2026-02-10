import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/Components/Instructor/_dynamic-course-slider.scss";
import { MdOutlineVerified } from "react-icons/md";
import Rating from "../Features/Rating";
import { FaShoppingCart } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  price: number;
  path?: string;
  image?: string;
  videoUrl?: string;
  highlights?: string[];
  rating?: number;
  totalRatings?: number;
  bestSeller?: boolean;
}

function DynamicCourseSlider() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/courses");
        console.log("BACKEND COURSES:", res.data.courses);

        const fixed = res.data.courses.map((c: any) => {
          let finalImg = c.image;
          
          // Fix image path - handle both 'image' and 'path' fields
          if (finalImg && !finalImg.startsWith("http")) {
            finalImg = `http://localhost:8080/${finalImg.replace(/\\/g, "/").replace(/^\//, "")}`;
          } else if (!finalImg && c.path) {
            finalImg = `http://localhost:8080/${c.path.replace(/\\/g, "/").replace(/^\//, "")}`;
          }

          return {
            ...c,
            image: finalImg || c.image
          };
        });

        setCourses(fixed);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement cart functionality
    alert("Add to cart functionality coming soon!");
  };

  return (
    <div className="card-slider-wrapper">
      <div className="card-slider-wrapper-title">
        <h1>
          Courses For You – <span>Based on your interests</span>
        </h1>
      </div>

      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 }
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id}>
            <div
              className="course-card-udemy"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setHoveredId(course._id);
                setHoverPosition({
                  top: rect.top + window.scrollY - 10,
                  left: rect.right + 15
                });
              }}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link to={`/buy-course/${course._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {/* Course Image */}
                <div className="course-image-wrapper">
                  <img src={course.image} alt={course.title} />
                  {course.bestSeller && (
                    <div className="bestseller-badge">Bestseller</div>
                  )}
                </div>

                {/* Course Content */}
                <div className="course-content-udemy">
                  <h3 className="course-title-udemy">
                    {course.title.length > 50
                      ? course.title.slice(0, 50) + "..."
                      : course.title}
                  </h3>
                  
                  <p className="course-instructor-udemy">By {course.instructor}</p>

                  {course.rating && (
                    <div className="course-rating-udemy">
                      <Rating value={course.rating} review={course.totalRatings || 0} />
                    </div>
                  )}

                  <div className="course-price-udemy">
                    <span className="price-amount">₹{course.price.toLocaleString()}</span>
                  </div>

                  <div className="course-badges-udemy">
                    <div className="premium-badge-udemy">
                      <MdOutlineVerified />
                      <span>Premium</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Udemy-style Hover Preview */}
      {hoveredId && (() => {
        const hoveredCourse = courses.find(c => c._id === hoveredId);
        return hoveredCourse ? (
          <Link 
            to={`/buy-course/${hoveredCourse._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="course-hover-preview-udemy"
              style={{
                position: "fixed",
                top: hoverPosition.top,
                left: hoverPosition.left,
                zIndex: 2000,
                width: "340px",
                background: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                overflow: "hidden",
                pointerEvents: "auto",
                cursor: "pointer"
              }}
              onMouseEnter={() => setHoveredId(hoveredId)}
              onMouseLeave={() => setHoveredId(null)}
            >
            {/* Video/Image Preview */}
            {hoveredCourse.videoUrl ? (
              <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#000" }}>
                <video
                  src={hoveredCourse.videoUrl}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  muted
                  playsInline
                  autoPlay
                  loop
                />
              </div>
            ) : (
              <div style={{ width: "100%", paddingTop: "56.25%", background: "#1c1d1f", position: "relative" }}>
                <img
                  src={hoveredCourse.image}
                  alt={hoveredCourse.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            )}
            
            {/* Course Info */}
            <div style={{ padding: "16px" }}>
              <h4 style={{ 
                fontSize: "14px", 
                fontWeight: "700", 
                marginBottom: "4px", 
                color: "#1c1d1f",
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {hoveredCourse.title}
              </h4>
              <p style={{ fontSize: "12px", color: "#6a6f73", marginBottom: "8px" }}>
                By {hoveredCourse.instructor}
              </p>
              
              {hoveredCourse.rating && (
                <div style={{ marginBottom: "8px" }}>
                  <Rating value={hoveredCourse.rating} review={hoveredCourse.totalRatings || 0} />
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "18px", fontWeight: "700", color: "#1c1d1f" }}>
                  ₹{hoveredCourse.price.toLocaleString()}
                </span>
                {hoveredCourse.bestSeller && (
                  <span style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    background: "#eceb98",
                    color: "#3d3c0a",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}>
                    Bestseller
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToCart(e);
                }}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#a435f0",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#8710d8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#a435f0")}
              >
                <FaShoppingCart />
                Add to cart
              </button>

              {/* Guarantees */}
              <div style={{ fontSize: "11px", color: "#6a6f73", textAlign: "center" }}>
                30-Day Money-Back Guarantee
              </div>
            </div>
          </div>
          </Link>
        ) : null;
      })()}
    </div>
  );
}

export default DynamicCourseSlider;
