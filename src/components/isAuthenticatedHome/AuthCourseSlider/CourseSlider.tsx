// CourseSlider.tsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, FreeMode, Pagination } from "swiper/modules";
import "../../../styles/Components/_cardslider.scss";
import CourseCard from "../../CourseCard/CourseCard";
import Model from "../../Model/Model";

interface Course {
  _id: string;              // MongoDB ObjectId
  title: string;
  instructor: string;
  image?: string;
  path?: string;
  price: number;
  rating?: number;
  totalRatings?: number;
  totalrate?: number;
  bestSeller?: boolean;
  category?: string;
}

interface CourseSliderProps {
  title: string;
  courses: Course[];
}

function CourseSlider({ title, courses }: CourseSliderProps) {
  const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent, course: Course) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverPosition({ top: rect.top - 120, left: rect.right + 15 });
    setHoveredCourse(course);
  };

  const handleMouseLeave = () => {
    setHoveredCourse(null);
  };

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="card-slider-wrapper">
      <div className="card-slider-wrapper-title">
        <h1>{title}</h1>
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination, Navigation]}
        className="mySwiper"
      >
        {courses.map((course) => (
          <SwiperSlide key={course._id}>
            <div
              className="course-card-hover"
              onMouseEnter={(e) => handleMouseEnter(e, course)}
              onMouseLeave={handleMouseLeave}
            >
              <CourseCard course={course} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {hoveredCourse && (
        <div
          className="course-model-fixed"
          style={{
            position: "fixed",
            top: hoverPosition.top,
            left: hoverPosition.left,
            zIndex: 2000,
          }}
        >
          <Model course={hoveredCourse} />
        </div>
      )}
    </div>
  );
}

export default CourseSlider;
