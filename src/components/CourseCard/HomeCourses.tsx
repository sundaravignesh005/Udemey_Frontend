import "../../styles/Components/_cardslider.scss";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  image: string;
  price: number;
  rating: number;
  totalRatings: number;
  bestSeller?: boolean;
  highlights?: string[];
}

function CourseCard({ course }: { course: Course }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement cart functionality
    alert("Add to cart functionality coming soon!");
  };

  return (
    <>
      <div 
        className="course-card-udemy"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setIsHovered(true);
          setHoverPosition({
            top: rect.top + window.scrollY - 10,
            left: rect.right + 15
          });
        }}
        onMouseLeave={() => setIsHovered(false)}
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
            <h3 className="course-title-udemy">{course.title}</h3>
            
            <p className="course-instructor-udemy">By {course.instructor}</p>

            {course.rating !== undefined && (
              <div className="course-rating-udemy">
                <span className="rating-value">{course.rating.toFixed(1)}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className={`star ${i < Math.floor(course.rating || 0) ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-count">
                  ({course.totalRatings?.toLocaleString() || 0})
                </span>
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

      {/* Enhanced Udemy-style Hover Preview */}
      {isHovered && (
        <Link 
          to={`/buy-course/${course._id}`}
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {/* Image Preview */}
          <div style={{ width: "100%", paddingTop: "56.25%", background: "#1c1d1f", position: "relative" }}>
            <img
              src={course.image}
              alt={course.title}
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
              {course.title}
            </h4>
            <p style={{ fontSize: "12px", color: "#6a6f73", marginBottom: "8px" }}>
              By {course.instructor}
            </p>
            
            {course.rating !== undefined && (
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#b4690e" }}>
                  {course.rating.toFixed(1)}
                </span>
                <div style={{ display: "flex", gap: "1px", marginRight: "4px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      style={{ 
                        fontSize: "12px", 
                        color: i < Math.floor(course.rating || 0) ? "#f3ca8c" : "#e59819" 
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ fontSize: "12px", color: "#6a6f73" }}>
                  ({course.totalRatings?.toLocaleString() || 0})
                </span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#1c1d1f" }}>
                ₹{course.price.toLocaleString()}
              </span>
              {course.bestSeller && (
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
      )}
    </>
  );
}
export default CourseCard;