import '../../styles/Components/_subscription.scss'
import { NavLink } from 'react-router-dom'
function HomeReview() {
  return (
    <section className='Review'>
        <div className="Review-Container">
            <div className="Review-Title">
                <h1>See what others are achieving through learning</h1>
            </div>
            <div className="Review-Card-Container">
                <div className="Review-Card">
                    <div className='Review-img'>
                        <img src="https://s.udemycdn.com/browse_components/student-quote-unit/quote.svg" alt="" />
                    </div>
                    <div className='Review-Content'>
                        Udemy was rated the <b> most popular online course or certification program</b> for learning how to code according to <NavLink to='/'>StackOverflow’s 2023 Developer survey.</NavLink>
                        <div className='Review-company'>
                            <img src="https://cms-images.udemycdn.com/96883mtakkm8/2PBcNgsQa3SvYWklkiN27r/5b8707cc79c8cae5774d5eb3b88b4001/logo_stackoverflow.svg" alt="" />
                            <p>37,076 responses collected</p>
                        </div>
                        <div className='View-course'>
                            <NavLink to='/'>View Web Development course</NavLink>
                        </div>
                    </div>
                </div>
                <div className="Review-Card">
                    <div className='Review-img'>
                        <img src="https://s.udemycdn.com/browse_components/student-quote-unit/quote.svg" alt="" />
                    </div>
                    <div className='Review-Content'>
                       Udemy was truly a <b>game-changer and a great guide</b>  for me as we brought Dimensional to life.
                       <div className='Review-member'>
                           <div className='Review-grid-img'>
                              <img src="https://cms-images.udemycdn.com/96883mtakkm8/1Djz6c0gZLaCG5SQS3PgUY/54b6fb8c85d8da01da95cbb94fa6335f/Alvin_Lim.jpeg" alt="" />
                           </div>
                           <div className='Review-grid-name'>
                              <h5>Alvin Lim</h5>
                              <p>Technical Co-Founder, CTO at Dimensional</p>
                           </div>
                       </div>
                       <div className='View-course'>
                            <NavLink to='/'>View this iOS & Swift course</NavLink>
                        </div>
                    </div>
                </div>
                <div className="Review-Card">
                    <div className='Review-img'>
                        <img src="https://s.udemycdn.com/browse_components/student-quote-unit/quote.svg" alt="" />
                    </div>
                     <div className='Review-Content'>
                       Udemy gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to <b> get a new role.</b>
                        <div className='Review-member'>
                           <div className='Review-grid-img'>
                              <img src="https://cms-images.udemycdn.com/96883mtakkm8/6dT7xusLHYoOUizXeVqgUk/4317f63fe25b2e07ad8c70cda641014b/William_A_Wachlin.jpeg" alt="" />
                           </div>
                           <div className='Review-grid-name'>
                              <h5>William A. Wachlin</h5>
                              <p>Partner Account Manager at Amazon Web Services</p>
                           </div>
                       </div>
                       <div className='View-course'>
                            <NavLink to='/'>View this AWS course</NavLink>
                        </div>
                    </div>
                </div>
                <div className="Review-Card">
                    <div className='Review-img'>
                        <img src="https://s.udemycdn.com/browse_components/student-quote-unit/quote.svg" alt="" />
                    </div>
                    <div className='Review-Content'>
                       With Udemy Business employees were able to marry the two together, technology and consultant soft skills... to help <b>drive their careers forward.</b> 
                        <div className='Review-member'>
                           <div className='Review-grid-img'>
                              <img src="https://cms-images.udemycdn.com/96883mtakkm8/4w9dYD4F64ibQwsaAB01Z4/c4610e9b1ac65589d8b1374ad10714e2/Ian_Stevens.png" alt="" />
                           </div>
                           <div className='Review-grid-name'>
                              <h5>Ian Stevens</h5>
                              <p>Head of Capability Development, North America at Publicis Sapient</p>
                           </div>
                       </div>
                       <div className='View-course'>
                            <NavLink to='/'>Read full story</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HomeReview