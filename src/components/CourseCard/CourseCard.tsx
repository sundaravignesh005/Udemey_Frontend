import "../../styles/Components/_cardslider.scss";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import Rating from "../Features/Rating";
import { Link } from "react-router-dom";

interface Course {
  _id?: string;             // MongoDB ID (preferred)
  id?: number | string;      // Demo/fallback ID
  title?: string;
  CourseName?: string;
  instructor?: string;
  author?: string;
  image?: string;
  img?: string;
  price?: number | string;
  rating?: number;
  totalRatings?: number;
  bestSeller?: boolean;
}

function CourseCard({ course }: { course: Course }) {
  // Prefer MongoDB _id, fallback to id for demo data
  const courseId = course._id || course.id;
  const courseImage = course.image || course.img;
  const courseTitle = course.title || course.CourseName;
  const courseInstructor = course.instructor || course.author;
  const coursePrice = course.price;

  // Validate if courseId is a valid MongoDB ObjectId (24 hex characters)
  const isValidMongoId = courseId && typeof courseId === 'string' && /^[0-9a-fA-F]{24}$/.test(courseId);
  
  // Only allow navigation if it's a valid MongoDB ID
  const handleClick = (e: React.MouseEvent) => {
    if (!isValidMongoId) {
      e.preventDefault();
      alert("This is a demo course. Please browse courses from the database to purchase.");
      return false;
    }
  };

    return (
      <div className="course-card-hover">
        <div className="course-card">

          {/* CLICK → GO TO BUY NOW PAGE - Only if valid MongoDB ID */}
          {isValidMongoId ? (
            <Link to={`/buy-course/${courseId}`} className="block">
            
            <img src={courseImage} alt={courseTitle} />

            <div className="course-description">
              <h3>
                {courseTitle && courseTitle.length > 50
                  ? `${courseTitle.slice(0, 40)}...`
                  : courseTitle}
              </h3>

              <p>{courseInstructor}</p>

              {course.rating !== undefined && (
                <Rating value={course.rating} review={course.totalRatings || 0} />
              )}

              <h4 className="price">
                <FaIndianRupeeSign />
                {coursePrice}
              </h4>

              <div className="course-upgrade">
                <p className="Premium">
                  <MdOutlineVerified /> Premium
                </p>

                {course.bestSeller && <p className="badge">Bestseller</p>}
              </div>

            </div>
            </Link>
          ) : (
            <div className="block" onClick={handleClick} style={{ cursor: 'pointer' }}>
              <img src={courseImage} alt={courseTitle} />

              <div className="course-description">
                <h3>
                  {courseTitle && courseTitle.length > 50
                    ? `${courseTitle.slice(0, 40)}...`
                    : courseTitle}
                </h3>

                <p>{courseInstructor}</p>

                {course.rating !== undefined && (
                  <Rating value={course.rating} review={course.totalRatings || 0} />
                )}

                <h4 className="price">
                  <FaIndianRupeeSign />
                  {coursePrice}
                </h4>

                <div className="course-upgrade">
                  <p className="Premium">
                    <MdOutlineVerified /> Premium
                  </p>

                  {course.bestSeller && <p className="badge">Bestseller</p>}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

export default CourseCard;
