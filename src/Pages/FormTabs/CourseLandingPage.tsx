import "../../styles/Components/Instructor/_coursecreationdashboard.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseLandingPage() {
  let maxChar = 56;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [userId, setUserId] = useState<string | null>(null);

  const [courseData, setcourseData] = useState({
    title: "",
    author: "",
    courseSub: "",
    description: "",
    price: "",
    language: "",
    level: "",
    catogory: "",
    instructor: "",
  });

  /** 🔥 Load USER ID from localStorage (dual mode works now) */
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
      setcourseData((prev) => ({ ...prev, instructor: id }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setcourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  /** 🔥 Submit course */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!storedUserId || !token) {
      alert("Session expired. Please log in again.");
      return;
    }

    // Client-side validation
    if (!courseData.title.trim()) return alert("Course title required");
    if (!courseData.description.trim())
      return alert("Course description required");
    if (!image) return alert("Please upload a course image");

    const course = new FormData();
    course.append("title", courseData.title);
    course.append("author", courseData.author);
    course.append("courseSub", courseData.courseSub);
    course.append("description", courseData.description);
    course.append("price", courseData.price);
    course.append("language", courseData.language);
    course.append("level", courseData.level);
    course.append("catogory", courseData.catogory);
    course.append("instructor", storedUserId);

    if (image) course.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:8080/courseCreation/course-creation-form",
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const createCourseId = res.data.courseId || res.data.course?._id;
      if (createCourseId) {
        localStorage.setItem("courseDetails", createCourseId);
        localStorage.setItem("currentCourseId", createCourseId);

        window.dispatchEvent(new Event("storage"));

        alert(
          `🎉 Course Created Successfully!\nCourse ID: ${createCourseId}\n\nNavigate to "Upload Video" tab to continue.`
        );
      } else {
        alert("Course saved, but no ID returned. Refresh manually.");
      }

      setcourseData({
        title: "",
        author: "",
        courseSub: "",
        description: "",
        price: "",
        language: "",
        level: "",
        catogory: "",
        instructor: "",
      });
      setPreview("");

    } catch (err: any) {
      console.error("Course creation error:", err.response?.data || err);
      alert(err.response?.data?.message || "Course creation failed");
    }
  };

  return (
    <section>
      <div className="Course-Landing-container">
        <div className="Course-Landing-title">
          <h1>Course landing page</h1>
        </div>

        <div className="Course-Landing-content">
          <p>
            Your course landing page is crucial to your success on Udemy. If
            it’s done right, it can also help you gain visibility in search
            engines like Google. Learn more about{" "}
            <Link to="/">creating your course landing page</Link> and{" "}
            <Link to="/">course title standards</Link>.
          </p>

          <div className="course-landing-form">
            <form onSubmit={handleSubmit}>
              {/* 🔥 Form elements kept same (NO UI CHANGES) */}
              <div className="course-title">
                <label>Course title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  value={courseData.title}
                  maxLength={maxChar}
                  onChange={handleChange}
                />
                <p>{courseData.title.length}/{maxChar}</p>
              </div>

              <div className="course-title">
                <label>Course Price</label>
                <input
                  type="text"
                  name="author"
                  value={courseData.author}
                  placeholder="Author"
                  onChange={handleChange}
                />
              </div>

              <div className="course-title">
                <label>Course subtitle</label>
                <input
                  type="text"
                  name="courseSub"
                  value={courseData.courseSub}
                  placeholder="Insert your course subtitle"
                  onChange={handleChange}
                />
              </div>

              <div className="course-description">
                <label>Course description</label>
                <textarea
                  name="description"
                  placeholder="Insert your course description"
                  value={courseData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="course-basic-info">
                <label>Basic-info</label>
                <div className="basic-info">
                  <select name="language" value={courseData.language} onChange={handleChange}>
                    <option value="">-- Select Language --</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>

                  <select name="level" value={courseData.level} onChange={handleChange}>
                    <option value="">-- Select Level --</option>
                    <option value="Beginner Level">Beginner</option>
                    <option value="Intermediate Level">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <select name="catogory" value={courseData.catogory} onChange={handleChange}>
                    <option value="">-- Select Category --</option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI">Artificial Intelligence</option>
                  </select>
                </div>
              </div>

              <div className="primary-focus">
                <label>What is primarily taught?</label>
                <input
                  type="text"
                  name="price"
                  value={courseData.price}
                  placeholder="ex: 3000"
                  onChange={handleChange}
                />
              </div>

              <div className="course-image">
                <div className="course-container">
                  <div className="display-container">
                    <label>Course image</label>
                    {preview ? (
                      <img src={preview} alt="Preview" className="image-preview" />
                    ) : (
                      <img
                        src="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                        alt="placeholder"
                      />
                    )}
                  </div>
                  <div className="course-upload">
                    <p>
                      Upload course image (750x422px, JPEG/PNG, no text)
                    </p>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
                  </div>
                </div>

                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseLandingPage;
