import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderPersonProfile.module.scss'

const LoaderPersonProfile = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >
      {/* Верхний сектор */}
      <rect x="15%" y="20" rx="8" ry="8" width="70%" height="40" />

      <rect x="0" y="90" rx="8" ry="8" width="40%" height="30" />
      <rect x="0" y="130" rx="8" ry="8" width="100%" height="40" />
      
      <rect x="0" y="200" rx="8" ry="8" width="35%" height="30" />
      <rect x="0" y="240" rx="8" ry="8" width="100%" height="40" />


      <rect x="0" y="310" rx="8" ry="8" width="20%" height="30" />
      <rect x="0" y="350" rx="8" ry="8" width="30%" height="40" />

      <rect x="35%" y="310" rx="8" ry="8" width="20%" height="30" />
      <rect x="35%" y="350" rx="8" ry="8" width="30%" height="40" />

      <rect x="70%" y="310" rx="8" ry="8" width="20%" height="30" />
      <rect x="70%" y="350" rx="8" ry="8" width="30%" height="40" />


      {/* Нижний сектор */}
      <rect x="15%" y="470" rx="8" ry="8" width="70%" height="40" />

      <rect x="0" y="540" rx="8" ry="8" width="35%" height="30" />
      <rect x="0" y="580" rx="8" ry="8" width="48%" height="40" />

      <rect x="52%" y="540" rx="8" ry="8" width="35%" height="30" />
      <rect x="52%" y="580" rx="8" ry="8" width="48%" height="40" />
    </ContentLoader>
  )
}

export default LoaderPersonProfile