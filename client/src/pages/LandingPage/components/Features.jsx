import React from 'react'
import {employerFeatures , jonSeekerFeatures} from '../../../utils/data'

const Features = () => {
  return (
    <section className=''>
        <div className=''>
            <div className=''>
                <h2>
                    Everything You Need to 
                    <span className=''>Success</span>
                </h2>
                <p className=''>
                    Whether you're looking for your next opportunity or the perfect candidate, We have the tools and features to make it happen.
                </p>
            </div>
            <div className=''>
                {/* job seeker section */}
                <div>
                    <div className=''>
                        <h3>
                            For Job Seekers
                        </h3>
                        <div className='' />
                    </div>
                    <div className=''>
                        {
                            jonSeekerFeatures.map((feature, index) => (
                                <div key={index} className=''>
                                    <div className=''>
                                        <feature.icon className=''/>
                                    </div>
                                    <div>
                                        <h3 className=''>
                                            {feature.title}
                                        </h3>
                                        <p className=''>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* employers section */}
                <div>
                    <div className=''>
                        <h3 className=''>
                            For Employers
                        </h3>
                        <div className=''/>
                    </div>
                    <div className=''>
                        {
                            employerFeatures.map((feature, index) => (
                                <div key={index} className=''>
                                    <div className=''>
                                        <feature.icon className=''/>
                                    </div>
                                    <div>
                                        <h4 className=''>
                                            {feature.title}
                                        </h4>
                                        <p className=''>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features