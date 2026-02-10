import "../../styles/Components/_cardslider.scss";
// removed unused MdOutlineVerified
import { FaShoppingCart } from "react-icons/fa";
import Rating from "../Features/Rating";

interface Course {
  _id?: string;              // MongoDB ObjectId
  id?: number | string;      // Fallback for compatibility
  title: string;
  instructor: string;
  image?: string;
  path?: string;
  price: number;
  rating?: number;
  totalRatings?: number;
  totalrate?: number;
  bestSeller?: boolean;
  highlights?: string[];
}

interface ModelProps {
  course: Course;
}

function Model({ course }: ModelProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement cart functionality
    alert("Add to cart functionality coming soon!");
  };

  return (
    <div className="course-hover-preview-udemy" style={{ width: "340px" }}>
      {/* Course Image */}
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
        
        {(course.rating || course.rating === 0) && (
          <div style={{ marginBottom: "8px" }}>
            <Rating value={course.rating} review={course.totalRatings || course.totalrate || 0} />
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
          onClick={handleAddToCart}
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
  );
}

export default Model;
