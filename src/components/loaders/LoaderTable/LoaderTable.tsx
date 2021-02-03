import React from 'react'
import ContentLoader from 'react-content-loader'
import { ThemeContext } from '../../../app/contexts'
import styles from './LoaderTable.module.scss'


const LoaderTable = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >
      <rect x="0%" y="15%" rx="3" ry="3" width="5.5%" height="70%" />
      <rect x="7%" y="15%" rx="3" ry="3" width="40%" height="70%" />
      <rect x="49%" y="15%" rx="3" ry="3" width="7%" height="70%" />
      <rect x="58%" y="15%" rx="3" ry="3" width="5%" height="70%" />
      <rect x="65%" y="15%" rx="3" ry="3" width="8%" height="70%" />
      <rect x="75%" y="15%" rx="3" ry="3" width="5%" height="70%" />
      <rect x="82%" y="15%" rx="3" ry="3" width="11%" height="70%" />
      <rect x="94%" y="25%" rx="10" ry="10" width="1.9%" height="50%" />
      <rect x="97%" y="25%" rx="10" ry="10" width="1.9%" height="50%" />

    </ContentLoader>
  )
}

export default LoaderTable