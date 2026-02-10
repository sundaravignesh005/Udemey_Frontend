import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import '../../../styles/Components/Auth/_banner.scss';
import { BannerSlide } from "../../../data/AuthCourse";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function HomeBanner() {
    const [userName,setuserName ] = useState<String | null>(null)

    useEffect(()=>{
        const fetchUser = async()=>{
           try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/auth/user-Info',{
                headers: {Authorization : `Bearer ${token}`}
            });
            setuserName(response.data.name)
           }catch(err){
            console.log('Error fetching ',err)
           }
        };
        fetchUser()
    },[])

    const FirstLetter = userName ? userName.charAt(0).toUpperCase(): ''
  return (
    <section>
        <div className="user-info">
            <div className="User-Name">
                <p>{FirstLetter}</p>
            </div>
            <div className="User-Welcome">
                <h1>Welcome back,{userName ? ` ${userName}` : ''}</h1>
                <p>Web Developer <Link to='/'>Edit occupation and intrest </Link></p>
            </div>
        </div>
      <div className="Banner">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,  
            disableOnInteraction: false
          }}
          className="mySwiper"
        >
          {BannerSlide.map((authCourse) => (
            <SwiperSlide key={authCourse.id}>
              <div className="Banner-Container">
                <div className="Banner-img">
                  <img src={authCourse.img} alt={authCourse.title} />
                </div>
                <div className="Banner-content">
                  <h1>{authCourse.title}</h1>
                  <p>{authCourse.description}</p>
                  <div className="course-link">
                    <p><Link to="">{authCourse.link}</Link></p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="Acess-Container">
         <div className="Acess-Content">
            <p>Training 2 or more people? <span>Get your team access to Udemy's top 30,000+ courses</span></p>
            <div className="Acess-btn">
              <button className="udemy-business"><Link to='/'>Get Udemy Business</Link></button>
              <button>Dismiss</button>
            </div>
         </div>
      </div>
    </section>
  );
}

export default HomeBanner;
