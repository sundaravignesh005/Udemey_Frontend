import "../../styles/Components/Instructor/_coursecreationdashboard.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import CourseLandingPage from "../../Pages/FormTabs/CourseLandingPage";
import PricingPage from "../../Pages/FormTabs/PricingPage";
import HomeCourseCard from "../../Pages/FormTabs/HomeCourseCard";
import IntendedLeaners from "../../Pages/FormTabs/IntendedLeaners";
import InstructorVideoUpload from "./InstructorVideoUpload";

function CourseCreationDashBoard() {
  const [courseId, setCourseId] = useState<string | null>(null);

  // ⭐ GET courseId FROM URL OR LOCALSTORAGE
  const { courseId: urlCourseId } = useParams();
  
  useEffect(() => {
    // Try to get courseId from URL first
    if (urlCourseId) {
      setCourseId(urlCourseId);
      localStorage.setItem("courseDetails", urlCourseId);
    } else {
      // Otherwise get from localStorage (set after course creation)
      const storedCourseId = localStorage.getItem("courseDetails") || localStorage.getItem("currentCourseId");
      if (storedCourseId) {
        setCourseId(storedCourseId);
      }
    }
    // Listen for storage changes (when course is created)
    const handleStorageChange = () => {
      const newCourseId = localStorage.getItem("courseDetails") || localStorage.getItem("currentCourseId");
      if (newCourseId && newCourseId !== courseId) {
        setCourseId(newCourseId);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const newCourseId = localStorage.getItem("courseDetails") || localStorage.getItem("currentCourseId");
      if (newCourseId && newCourseId !== courseId) {
        setCourseId(newCourseId);
      }
    }, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [urlCourseId, courseId]);
  return (
    <section>
      <div className="course-container">
        <Tabs>
          <div className="course-container-layout">
            <div className="course-list-type">
              <TabList className="custom-tab-list">
            
                <div>
                  <h3>Publish your course</h3>
                  <Tab>
                    <span><input type="radio" readOnly checked /></span>
                    Course landing page
                  </Tab>
                  <Tab>
                    <span><input type="radio" readOnly /></span>
                    Pricing
                  </Tab>
                  <Tab>
                    <span><input type="radio" readOnly /></span>
                    Intended learners
                  </Tab>

                  <Tab>
                    <span><input type="radio" readOnly /></span>
                    Course messages
                  </Tab>

                  <Tab>
                    <span><input type="radio" readOnly /></span>
                    Upload Video
                  </Tab>
                </div>

              </TabList>

              <button>Submit for Review</button>
            </div>

            <div className="course-list-form">

              {/* REAL PANELS */}
              <TabPanel>
                <CourseLandingPage />
              </TabPanel>

              <TabPanel>
                <PricingPage />
              </TabPanel>

              <TabPanel>
                <IntendedLeaners />
              </TabPanel>

              <TabPanel>
                <HomeCourseCard />
              </TabPanel>

              {/* ⭐ VIDEO UPLOAD TAB (with courseId) */}
              <TabPanel>
                {courseId ? (
                  <InstructorVideoUpload courseId={courseId} />
                ) : (
                  <div style={{ padding: "40px", textAlign: "center" }}>
                    <p style={{ color: "#c14532", fontSize: "16px", fontWeight: "700", marginBottom: "16px" }}>
                      ⚠️ Missing courseId
                    </p>
                    <p style={{ color: "#6a6f73", marginBottom: "24px", fontSize: "14px" }}>
                      Please create a course first using the "Course landing page" tab above.
                    </p>
                    <p style={{ color: "#6a6f73", fontSize: "14px" }}>
                      After creating a course, the course ID will be automatically saved and you can upload videos here.
                    </p>
                    <button
                      onClick={() => {
                        const stored = localStorage.getItem("courseDetails");
                        if (stored) {
                          setCourseId(stored);
                          alert(`Course ID found: ${stored}`);
                        } else {
                          alert("No course ID found. Please create a course first.");
                        }
                      }}
                      style={{
                        marginTop: "20px",
                        padding: "10px 20px",
                        background: "#a435f0",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "700"
                      }}
                    >
                      Check for Course ID
                    </button>
                  </div>
                )}
              </TabPanel>

              {/* Additional TabPanels to match Tab count */}
              <TabPanel>
                <p>Basic Info - Create your content</p>
              </TabPanel>
              <TabPanel>
                <p>Curriculum - Create your content</p>
              </TabPanel>
              <TabPanel>
                <p>Pricing - Create your content</p>
              </TabPanel>
              <TabPanel>
                <p>Basic Info - Plan your course</p>
              </TabPanel>
              <TabPanel>
                <p>Curriculum - Plan your course</p>
              </TabPanel>
              <TabPanel>
                <p>Pricing - Plan your course</p>
              </TabPanel>
              <TabPanel>
                <p>Additional content</p>
              </TabPanel>
              <TabPanel>
                <p>Additional content</p>
              </TabPanel>

            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default CourseCreationDashBoard;
