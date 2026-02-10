import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropDown from "../components/isAuthenticatedHome/Navabar/DropDown"
import HomeBanner from "../components/isAuthenticatedHome/AdBanner/HomeBanner"
import CourseSlider from "../components/isAuthenticatedHome/AuthCourseSlider/CourseSlider"
import DynamicCourseCard from "../components/CourseCard/DynamicCourseCard"
import Footer from "../components/Footer/Footer"

interface Course {
  _id: string;
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

function AuthenticatedHome() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/courses");
        console.log("📚 Fetched courses from MongoDB:", res.data.courses);

        // Fix image paths
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
            totalrate: c.totalRatings || c.totalrate || 0,
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

  // Split courses into different categories for different sliders
  const recommendedCourses = courses.slice(0, 8);
  const javaCourses = courses.filter(c => 
    c.category?.toLowerCase().includes("java") || 
    c.title?.toLowerCase().includes("java")
  ).slice(0, 8);
  const nodeCourses = courses.filter(c => 
    c.category?.toLowerCase().includes("node") || 
    c.title?.toLowerCase().includes("node")
  ).slice(0, 8);
  const webDevCourses = courses.filter(c => 
    c.category?.toLowerCase().includes("web") || 
    c.title?.toLowerCase().includes("web")
  ).slice(0, 8);

  return (
    <>
     <header>
        <DropDown/>
    </header>
    <main>
      <HomeBanner/>
      {!loading && (
        <>
          {recommendedCourses.length > 0 && (
            <CourseSlider title="Recommended for you" courses={recommendedCourses} />
          )}
          {javaCourses.length > 0 && (
            <CourseSlider title="Java Courses" courses={javaCourses} />
          )}
          {nodeCourses.length > 0 && (
            <CourseSlider title="Node.js Courses" courses={nodeCourses} />
          )}
          {webDevCourses.length > 0 && (
            <CourseSlider title="Web Development Courses" courses={webDevCourses} />
          )}
          {courses.length > 0 && (
            <CourseSlider title="All Courses" courses={courses.slice(0, 10)} />
          )}
        </>
      )}
      <DynamicCourseCard/>
      
      {/* Browse All Courses Link */}
      {courses.length > 0 && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <Link 
            to="/courses"
            style={{
              color: "#5624d0",
              fontSize: "14px",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Browse all courses →
          </Link>
        </div>
      )}
    </main>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default AuthenticatedHome