import "../../styles/Components/_ongoals.scss";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { GoalList } from "../../data/course";
function OnGoals() {
  return (
    <section className="Goal-section">
      <div className="Goal-Container">
        <div className="Goal-Container-Title">
          <h1>Learning focused on your goals</h1>
        </div>
        <Tabs>
          <div className="Goal-Flex-Container">
            <div className="Goal-one">
              <TabList className="tablist">
                {GoalList.map((goal) => (
                  <Tab key={goal.id} className="Goal-list-card">
                    <div className="goal-content">
                      <div className="Goal-content-img">
                        <img src={goal.img} alt={goal.title} />
                      </div>
                      <div className="Goal-content-description">
                        <h2>{goal.title}</h2>
                        <p>{goal.description}</p>
                      </div>
                    </div>
                  </Tab>
                ))}
              </TabList>
            </div>

            <div className="Goal-two">
              {GoalList.map((goal) => (
                <TabPanel className="tabpanel" key={goal.id}>
                  <div className="tab-goal-content">
                    <div className="tab-image">
                      <img src={goal.tabImage} alt={goal.title} />
                    </div>
                  </div>
                </TabPanel>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default OnGoals;
