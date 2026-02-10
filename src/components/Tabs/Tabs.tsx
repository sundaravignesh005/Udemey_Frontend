import "../../styles/Components/_tabs.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CoursDataScience } from "../../data/course";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import Rating from "../Features/Rating";

function TabComponent() {
  return (
    <section className="Tabs-box">
      <div className="Tabs-container">
        <h1>All the skills you need in one place</h1>
        <p>
          From critical skills to technical topics, Udemy supports your
          professional development.
        </p>
        <div className="Tabs-content">
          <Tabs>
            <TabList className="tab-flex">
              <Tab>Data Science</Tab>
              <Tab>IT Certification</Tab>
              <Tab>LeaderShip</Tab>
              <Tab>Web Development</Tab>
              <Tab>Business Analytics and Intelligent</Tab>
            </TabList>

            <TabPanel>
              <Tabs>
                <TabList className="tab-flex">
                  {CoursDataScience.map((item, idx) => (
                    <Tab key={idx}>{item.name}</Tab>
                  ))}
                </TabList>
                {CoursDataScience.map((course, idx) => (
                  <TabPanel key={course.id || idx} className="TabPanel-flex">
                    {course.courses?.map((c, index) => (
                      <div key={index} className="course-card">
                        <img src={c.img} alt="" />
                        <div className="course-description">
                          <h3>{c.title}</h3>
                          <p>{c.author}</p>
                          <div className="rating">
                            <Rating value={c.rating} review={c.totalRate}/>
                          </div>
                          <h4><FaIndianRupeeSign/>{c.price}</h4>
                          <div className="Premium"><span><MdOutlineVerified/></span>Premium</div>
                        </div>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs>
                <TabList className="tab-flex">
                  <Tab>Inner Tab A</Tab>
                  <Tab>Inner Tab B</Tab>
                </TabList>
                <TabPanel>
                  <h3>Content for Inner Tab A</h3>
                  <p>This is the content for the first inner tab.</p>
                </TabPanel>
                <TabPanel>
                  <h3>Content for Inner Tab B</h3>
                  <p>This is the content for the second inner tab.</p>
                </TabPanel>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <p>LeaderShip content</p>
            </TabPanel>
            <TabPanel>
              <p>Web Development content</p>
            </TabPanel>
            <TabPanel>
              <p>Business Analytics content</p>
            </TabPanel>
          </Tabs>
        </div>
        <p className="All-Data-science-course">Show all Data Science courses</p>
      </div>
    </section>
  );
}

export default TabComponent;
