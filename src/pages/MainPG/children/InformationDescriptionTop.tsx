import React from 'react'
import cn from 'classnames'
import { regionItemType } from './../../../featurers/region/regionTypes'
import { InformationSection } from './../../../components'

interface P {
  activeRegion: regionItemType
}

const InformationDescriptionTop: React.FC<P> = ({ activeRegion }) => {
  return (
    <InformationSection nameClass={'information fullwidth'}>
      <img
        src={process.env.PUBLIC_URL + activeRegion.features.backroundImage}
        alt="Сделано в Карелии"
        className="information__bgi" />
      <div className={cn("information__bgc", activeRegion.features.backGroundClassName)}></div>

      <h2 className="information__title">
        Каталог продукции выпускаемой предприятиями {activeRegion.features.titleName}
      </h2>

      <div className="information__inner">
        <div className="information__inner__content">
          {activeRegion.features.text.map((item, i) => (
            <p key={i} 
              className="information__inner__desc"
            >{item}</p>
          ))}
        </div>
      </div>
    </InformationSection>
  )
}

export default InformationDescriptionTop
