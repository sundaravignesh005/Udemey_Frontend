import HomeBanner from "../components/HomeBanner/HomeBanner"
import TabComponent from "../components/Tabs/Tabs"
import BrandCompanyView from "../components/HomeBanner/BrandCompanyView"
import OnGoals from "../components/ExtraDetails/OnGoals"
import Footer from "../components/Footer/Footer"
import SubScription from "../components/ExtraDetails/SubScription"
import BusinessLeader from "../components/ExtraDetails/BusinessLeader"
import HomeReview from "../components/ExtraDetails/HomeReview"

function Home() {
  return (
    <main>
        <HomeBanner/>
        <TabComponent/>
        <BrandCompanyView/>
        <OnGoals/>
        <SubScription/>
        <HomeReview/>
        <BusinessLeader/>
        <Footer/>
    </main>
  )
}

export default Home
