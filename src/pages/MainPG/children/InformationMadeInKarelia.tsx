import React from 'react'
import { regionItemType } from './../../../featurers/region/regionTypes'
import { InformationSection } from './../../../components'
import informationBackgroundImageMadeInKarelia from './../../../assets/images/InformationSection/madeInKarelia_bgi.jpg'

interface P {
  activeRegion: regionItemType
}

const InformationMadeInKarelia: React.FC<P> = ({ activeRegion }) => {
  return (
    <InformationSection nameClass={'information fullwidth'}>
      <img
        src={informationBackgroundImageMadeInKarelia}
        alt="Сделано в Карелии"
        className="information__bgi" />
      <div className="information__bgc brown"></div>

      <h2 className="information__title">
        Сделано в Карелии
      </h2>

      <div className="information__inner">
        <div className="information__inner__content wide">
          <p className="information__inner__desc">
            Система добровольной сертификации "Сделано в Карелии" была зарегистрирована в апреле 2018 года Федеральным агентством по техническому регулированию и метрологии.
          </p>
          <p className="information__inner__desc">
            Официальным оператором выступает АО "Корпорация развития Республики Карелия". Любой местный товаропроизводитель может обратиться в Корпорацию, и по итогам лабораторных исследований продукции получить право на использование товарного знака "Сделано в Карелии".
          </p>
          <p className="information__inner__desc">
            Обладатели знака "Сделано в Карелии" получают определённые преференции в вопросах продвижения своей продукции на территории как нашей страны, так и за рубежом и, конечно, качественно выделяют свои товары на прилавках не только нашего региона, но и за его пределами.
          </p>
        </div>

        {activeRegion.madeInKarelia && (
          <img
            src={process.env.PUBLIC_URL + activeRegion.madeInKarelia.image_large}
            alt={activeRegion.features.titleName}
            className="information__inner__imgMadeInKarelia large" />
        )}
      </div>
    </InformationSection>
  )
}

export default InformationMadeInKarelia
