import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '../../../app/contexts'
import styles from './ManufacturersMap.module.scss'

interface P {
  handleAccessMap: () => void
}

const ManufacturersMapUpperLayer: React.FC<P> = ({ handleAccessMap }) => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div
      className={cn(styles.upperLayer, styles[theme])}
      onClick={handleAccessMap}
    >Нажмите, для отображения карты</div>
  )
}

export default ManufacturersMapUpperLayer
