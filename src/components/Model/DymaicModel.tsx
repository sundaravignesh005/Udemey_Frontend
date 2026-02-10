// DynamicModel.tsx
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import "../../styles/Components/Auth/_model.scss";
import { MdOutlineVerified } from "react-icons/md";

interface CourseInstruction {
  role: string;
  Budget: string;
  ProjectRisk: string;
  CaseStudy: string;
  Requirement: string;
  AboutCourse: string;
}

interface CourseModel {
  title: string;
  language: string;
  level: string;
  catogory: string;
  description: string;
  courseInstruction: CourseInstruction;
}

function DynamicModel({ courseCardId }: { courseCardId: string }) {
  const [modelCourse, setModelCourse] = useState<CourseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/courseCreation/course-detail/${courseCardId}`
        );
        setModelCourse(res.data.course);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setLoading(false);
      }
    };

    if (courseCardId) {
      fetchCourse();
    }
  }, [courseCardId]);

  if (loading) return null;
  if (!modelCourse) return null;

  return (
    <div className="hover-model">
      <h3>{modelCourse.title}</h3>
      <p className="Premium">
        <span>
          <MdOutlineVerified />
        </span>
        Premium
      </p>
      <p>
        <strong>Language:</strong> {modelCourse.language}
      </p>
      <p>
        <strong>Level:</strong> {modelCourse.level}
      </p>
      <p>
        <strong>Category:</strong> {modelCourse.catogory}
      </p>
      <p>{modelCourse.description}</p>
      {modelCourse.courseInstruction && (
        <ul>
          <li>
            {" "}
            <span className="tick-icon">
              <TiTick />
            </span>
            {modelCourse.courseInstruction.AboutCourse}
          </li>
          <li>
            {" "}
            <span className="tick-icon">
              <TiTick />
            </span>
            {modelCourse.courseInstruction.Requirement}
          </li>
          <li>
            {" "}
            <span className="tick-icon">
              <TiTick />
            </span>
            {modelCourse.courseInstruction.CaseStudy}
          </li>
        </ul>
      )}
      <div className="Btn">
        <button className="Cart">Go to cart</button>
        <button className="like-course">
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
}

export default DynamicModel;
