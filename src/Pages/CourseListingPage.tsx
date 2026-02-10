import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/pages/_course-listing.scss";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  image?: string;
  path?: string;
  price: number;
  rating?: number;
  totalRatings?: number;
  bestSeller?: boolean;
  category?: string;
}

function CourseListingPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/courses");
        console.log("📚 Fetched courses:", res.data.courses);

        const fixedCourses = res.data.courses.map((c: any) => {
          let imagePath = c.image;
          if (imagePath && !imagePath.startsWith("http")) {
            imagePath = `http://localhost:8080/${imagePath.replace(/\\/g, "/").replace(/^\//, "")}`;
          } else if (!imagePath && c.path) {
            imagePath = `http://localhost:8080/${c.path.replace(/\\/g, "/").replace(/^\//, "")}`;
          }

          return {
            ...c,
            image: imagePath || c.image,
          };
        });

        setCourses(fixedCourses);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category).filter(Boolean)))];

  // Filter courses by category
  const filteredCourses = selectedCategory === "All" 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  if (loading) {
    return (
      <div className="course-listing-loading">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="course-listing-page">
      <div className="course-listing-container">
        {/* Category Navigation - Exact Udemy Style */}
        <div className="category-navigation">
          <div className="category-nav-wrapper">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category || "All")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid - Exact Udemy Style */}
        <div className="courses-section">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
              1536: { slidesPerView: 5 },
            }}
            className="courses-swiper"
          >
            {filteredCourses.map((course) => (
              <SwiperSlide key={course._id}>
                <Link 
                  to={`/buy-course/${course._id}`}
                  className="course-card-link"
                >
                  <div className="course-card-udemy-exact">
                    {/* Course Image */}
                    <div className="course-image-wrapper">
                      <img 
                        src={course.image || "https://via.placeholder.com/240x135"} 
                        alt={course.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/240x135?text=No+Image";
                        }}
                      />
                      {course.bestSeller && (
                        <div className="bestseller-badge">Bestseller</div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="course-content">
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-instructor">{course.instructor}</p>
                      
                      {course.rating && (
                        <div className="course-rating">
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

                      <div className="course-price">
                        <span className="price-amount">₹{course.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Show All Link - Exact Udemy Style */}
        {selectedCategory !== "All" && (
          <div className="show-all-section">
            <Link 
              to={`/courses?category=${selectedCategory}`}
              className="show-all-link"
            >
              Show all {selectedCategory} courses →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseListingPage;

