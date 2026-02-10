import "../../styles/Components/Instructor/_intendedLeaners.scss";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";


interface InstructionForm {
  role: string;
  Budget: string;
  ProjectRisk: string;
  CaseStudy: string;
  Requirement: string;
  AboutCourse: string;
}

function IntendedLeaners() {
  const maxChar = 160;
  const [courseInstructiom, setcourseInstruction] = useState<InstructionForm>({
    role: "",
    Budget: "",
    ProjectRisk: "",
    CaseStudy: "",
    Requirement:"",
    AboutCourse:""

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcourseInstruction({
      ...courseInstructiom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async(e: React.FormEvent) => {
    e.preventDefault();

    const courseDetailId = localStorage.getItem("courseDetails");
    if (!courseDetailId) {
      alert("Course ID not found. Please create course detail first.");
      return;
    }

    try{
    const res = await axios.post("http://localhost:8080/courseCreation/courseInstruction",{
        ...courseInstructiom,
        courseDetailId ,
    })
    console.log(res.data)
      alert("Course Instruction submitted and linked successfully!");
      setcourseInstruction({
        role: "",
        Budget: "",
        ProjectRisk: "",
        CaseStudy: "",
        Requirement:"",
        AboutCourse:""
      });

    }   
    catch(err:any){
        alert(err.response?.data?.message || "Failed to submit instruction");
    }

  };
  return (
    <div className="course-intended-learners">
      <div className="Course-Landing-title">
        <h1>Intended learners</h1>
      </div>
      <div className="Course-Landing-content">
        <p>
          The following descriptions will be publicly visible on your{" "}
          <Link to="/">Course Landing Page</Link> and will have a direct impact
          
        </p>
        <div className="student-learn">
          <h4>What will students learn in your course?</h4>
          <p>
            You must enter at least 4{" "}
            <Link to="/">learning objectives or outcomes</Link> that learners
            can expect to achieve after completing your course.
          </p>
        </div>
        <div className="course-intented-form">
          <form action="" onSubmit={handleSubmit}>
            <div className="course-role">
              <input
                type="text"
                name="role"
                value={courseInstructiom.role}
                onChange={handleChange}
                maxLength={maxChar}
                placeholder="Example:Define the role and responsibility of Project Manager"
              />
              <p>{courseInstructiom.role.length}/{maxChar}</p>
            </div>
            <div className="course-role">
              <input
                type="text"
                name="Budget"
                value={courseInstructiom.Budget}
                onChange={handleChange}
                maxLength={maxChar}
                placeholder="Example:Estimate project timeline and budgets"
              />
              <p>{courseInstructiom.Budget.length}/{maxChar}</p>
            </div>
            <div className="course-role">
              <input
                type="text"
                name="ProjectRisk"
                value={courseInstructiom.ProjectRisk}
                onChange={handleChange}
                maxLength={maxChar}
                placeholder="Example:Identify and manage project risks"
              />
              <p>{courseInstructiom.ProjectRisk.length}/{maxChar}</p>
            </div>
            <div className="course-role">
              <input
                type="text"
                name="CaseStudy"
                value={courseInstructiom.CaseStudy}
                onChange={handleChange}
                maxLength={maxChar}
                placeholder="Example: Complete a case Study to manage a project from conception to completion"
              />
              <p>{courseInstructiom.CaseStudy.length}/{maxChar}</p>
            </div>
            <div className="course-requirement">
              <h4>
                What are the requirements or prerequisites for taking your
                course
              </h4>
              <p>
                List the required skills, experience, tools or equipment
              
              </p>
              <input
                type="text"
                name="Requirement"
                value={courseInstructiom.Requirement}
                onChange={handleChange}
                placeholder="Example: No programming expreience needed.you will learn everything you need to know "
              />
            </div>
            <div className="course-requirement">
              <h4>Who is this course for?</h4>
              <p>
                Write a clear description of the intended learners for your
                c
              </p>
              <input
                type="text"
                name="AboutCourse"
                value={courseInstructiom.AboutCourse}
                onChange={handleChange}
                placeholder="Example: No programming expreience needed.you will learn everything you need to know "
              />
            </div>
            <button type="submit">Submit Instruction</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IntendedLeaners;
