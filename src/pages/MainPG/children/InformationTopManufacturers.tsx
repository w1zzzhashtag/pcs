import React from 'react'
import { InformationSection } from './../../../components'
import informationBackgroundImageTopManufacturers from './../../../assets/images/InformationSection/topManufacturers_bgi.jpg'
import TopManufacturers from '../../../featurers/topManufacturers/TopManufacturers'


const InformationTopManufacturers: React.FC = () => {
  return (
    <InformationSection nameClass={'information fullwidth z-index-hight'}>
      <img
        src={informationBackgroundImageTopManufacturers}
        alt="Топ производителей"
        className="information__bgi half" />
      <div className="information__bgc blue"></div>

      <div className="information__inner">
        <div className="information__inner__content scroll-wrapper">
          <TopManufacturers />
        </div>
      </div>
    </InformationSection>
  )
}

export default InformationTopManufacturers
