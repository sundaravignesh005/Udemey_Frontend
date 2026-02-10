import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useParams, Link } from "react-router-dom";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  videoUrl?: string;
  image?: string;
  path?: string;
  description?: string;
  price?: number;
}

function MyLearning() {
  const { courseId } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [singleCourse, setSingleCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoading(false);
          return;
        }

        // If courseId is provided, fetch single course
        if (courseId) {
          // Validate MongoDB ObjectId
          if (!/^[0-9a-fA-F]{24}$/.test(courseId)) {
            alert("Invalid course ID");
            setLoading(false);
            return;
          }

          try {
            const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
            const course = res.data.course || res.data;
            
            // Fix image path
            let imagePath = course.image;
            if (imagePath && !imagePath.startsWith("http")) {
              imagePath = `http://localhost:8080/${imagePath.replace(/\\/g, "/").replace(/^\//, "")}`;
            } else if (!imagePath && course.path) {
              imagePath = `http://localhost:8080/${course.path.replace(/\\/g, "/").replace(/^\//, "")}`;
            }

            setSingleCourse({
              ...course,
              image: imagePath || course.image,
            });
          } catch (err: any) {
            console.error("Error fetching course:", err);
            alert(err.response?.data?.message || "Course not found or you don't have access");
          }
        } else {
          // Fetch all purchased courses
          const res = await axios.get(`http://localhost:8080/api/courses/user/${userId}/purchased-courses`);
          
          console.log("My Learning - Purchased courses:", res.data);
          
          if (res.data.courses && res.data.courses.length > 0) {
            const coursesWithVideos = res.data.courses.map((c: any) => {
              let imagePath = c.image;
              if (imagePath && !imagePath.startsWith("http")) {
                imagePath = `http://localhost:8080/${imagePath.replace(/\\/g, "/").replace(/^\//, "")}`;
              } else if (!imagePath && c.path) {
                imagePath = `http://localhost:8080/${c.path.replace(/\\/g, "/").replace(/^\//, "")}`;
              }

              return {
                ...c,
                videoUrl: c.videoUrl || "",
                image: imagePath || c.image || "",
                title: c.title || "Untitled Course",
                instructor: c.instructor || "Unknown"
              };
            });
            setCourses(coursesWithVideos);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, searchParams]);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  // Single course view
  if (courseId && singleCourse) {
    return (
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <Link 
          to="/my-learning"
          style={{
            display: "inline-block",
            marginBottom: "24px",
            color: "#a435f0",
            textDecoration: "none",
            fontWeight: "600"
          }}
        >
          ← Back to My Learning
        </Link>

        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>
          {singleCourse.title}
        </h1>
        <p style={{ fontSize: "16px", color: "#6a6f73", marginBottom: "24px" }}>
          By {singleCourse.instructor}
        </p>

        {singleCourse.videoUrl ? (
          <div style={{ marginTop: "24px" }}>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              maxWidth: "1000px",
              paddingTop: "56.25%",
              background: "#000",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "24px"
            }}>
              <video
                src={singleCourse.videoUrl}
                controls
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain"
                }}
                playsInline
              />
            </div>
            {singleCourse.description && (
              <div style={{ 
                padding: "24px",
                background: "#f7f9fa",
                borderRadius: "8px"
              }}>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>
                  About this course
                </h2>
                <p style={{ color: "#1c1d1f", lineHeight: "1.6" }}>
                  {singleCourse.description}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ 
            padding: "40px", 
            background: "#f7f9fa", 
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "16px", color: "#6a6f73" }}>
              ⏳ No video uploaded yet. The instructor is preparing content. Check back soon!
            </p>
          </div>
        )}
      </div>
    );
  }

  // List view
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "24px" }}>My Learning</h1>

      {courses.length === 0 ? (
        <div style={{
          padding: "60px 40px",
          textAlign: "center",
          background: "#f7f9fa",
          borderRadius: "8px",
        }}>
          <p style={{ fontSize: "18px", color: "#6a6f73", marginBottom: "16px" }}>
            You haven't purchased any courses yet.
          </p>
          <Link
            to="/authenticated-home"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#a435f0",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "24px" }}>
          {courses.map((c) => (
            <div
              key={c._id}
              style={{
                padding: "24px",
                border: "1px solid #d1d7dc",
                borderRadius: "8px",
                background: "#fff",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                {c.title}
              </h2>
              <p style={{ fontSize: "14px", color: "#6a6f73", marginBottom: "16px" }}>
                By {c.instructor}
              </p>

              {c.videoUrl ? (
                <Link
                  to={`/my-learning/${c._id}`}
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    background: "#a435f0",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Continue Learning →
                </Link>
              ) : (
                <p style={{ fontSize: "14px", color: "#6a6f73" }}>
                  ⏳ Content coming soon
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;
