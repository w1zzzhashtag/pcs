import React from 'react'
import { Placemark } from 'react-yandex-maps'

import { manufacturerCoordsType } from './../../../featurers/manufacturerCurrent/manufacturerCurrentTypes'

interface iProps {
  data: manufacturerCoordsType
}

const PlacemarkWrapper: React.FC<iProps> = ({ data }) => {
  return (
    <Placemark
      key={data.id}
      modules={['geoObject.addon.balloon']}
      options={{ preset: 'islands#blackDotIcon' }}
      defaultGeometry={data.coords}
      properties={{
        iconCaption: `${data.name}`,
        balloonContentHeader: `${data.name}`,
        balloonContentBody: `
          <div class="balloon-content__body">
            Адрес: <span>${data.address}</span>
          </div>`,
        balloonContentFooter: `
          <a  class="placemark__link"
              href='/#manufacturers/${data.id}'
          >
            Перейти на страницу производителя
          </a>`,
      }}
    />
  )
}

export default PlacemarkWrapper
