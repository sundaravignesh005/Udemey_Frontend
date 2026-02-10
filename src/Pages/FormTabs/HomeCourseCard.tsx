
import React, { useEffect, useState } from "react";
import axios from "axios";

function HomeCourseCard() {
  const maxChar = 78;

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const [couseCardData, setcourseCardData] = useState({
    title: "",
    author: "",
    price: "",
    instructor: "",
    courseDetails: ""
  });

  useEffect(() => {
    const instructorId = localStorage.getItem("instructorId");
    const courseDetailsId = localStorage.getItem("courseDetails");

    if (instructorId && courseDetailsId) {
      setcourseCardData(prev => ({
        ...prev,
        instructor: instructorId,
        courseDetails: courseDetailsId
      }));
    } else {
      alert("Instructor or Course Details ID not found. Please log in and submit course details first.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcourseCardData({ ...couseCardData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setImage(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const course = new FormData();

    Object.entries(couseCardData).forEach(([key, value]) => {
      course.append(key, value);
    });

    if (image) {
      course.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/courseCreation/course-home-card",
        course,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Course card created successfully!");
      console.log(res.data);

      setcourseCardData({
        title: "",
        author: "",
        price: "",
        instructor: "",
        courseDetails: ""
      });
      setImage(null);
      setPreview("");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Course card creation failed");
    }
  };

  return (
    <section>
      <div className="Course-Landing-container">
        <div className="Course-Landing-title">
          <h1>Course Home Page</h1>
        </div>
        <div className="Course-Landing-content">
          <p>
            Your course landing page is crucial to your success on Udemy. If it’s done right,
            it can also help you gain visibility in search engines like Google.
          </p>
          <form onSubmit={handleSubmit} className="course-landing-form">
            <div className="course-title">
              <label>Course title</label>
              <input
                type="text"
                name="title"
                placeholder="Course title"
                maxLength={maxChar}
                value={couseCardData.title}
                onChange={handleChange}
              />
              <p>{couseCardData.title.length}/{maxChar}</p>
            </div>

            <div className="course-title">
              <label>Course Instructor Name</label>
              <input
                type="text"
                name="author"
                placeholder="Author name"
                maxLength={maxChar}
                value={couseCardData.author}
                onChange={handleChange}
              />
              <p>{couseCardData.author.length}/{maxChar}</p>
            </div>

            <div className="primary-focus">
              <label>Price of the Course</label>
              <input
                type="text"
                name="price"
                placeholder="e.g. 1999"
                value={couseCardData.price}
                onChange={handleChange}
              />
            </div>

            <div className="course-image">
              <label>Course Image</label>
              <div className="course-container">
                <div className="display-container">
                  {preview ? (
                    <img src={preview} alt="Preview" className="image-preview" />
                  ) : (
                    <img
                      src="https://s.udemycdn.com/course/750x422/placeholder.jpg"
                      alt="Placeholder"
                    />
                  )}
                </div>
                <div className="course-upload">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomeCourseCard;
