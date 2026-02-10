import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FreeMode, Pagination } from "swiper/modules";
import { cardSlider } from "../../data/course";
import "../../styles/Components/_cardslider.scss";
import Rating from "./Rating";

export function CardSlider() {
  return (
    <div className="card-slider-wrapper">
      <div className="card-slider-wrapper-title"><h1>Learners are viewing</h1></div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        navigation={true}
        // loop={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination,Navigation]}
        className="mySwiper"
      >
        {cardSlider.map((course) => (
          <SwiperSlide key={course.id}>
            <div className="course-card">
              <img src={course.img} alt="" />
              <div className="course-description">
                <h3>{course.title}</h3>
                <p>{course.author}</p>
                {/* <p className="review">{c.rating} Rating with {c.totalRate} review</p> */}
                <p><Rating value={course.rating} review={course.totalRate}  /></p>
                <h4>
                  <FaIndianRupeeSign />
                  {course.price}
                </h4>
                <p className="Premium">
                  <span>
                    <MdOutlineVerified />
                  </span>
                  Premium
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
