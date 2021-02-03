import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderSliderForProducts.module.scss'

const LoaderSliderForProducts = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >

      <rect x="0" y="40" rx="8" ry="8" width="18%" height="200" />
      <rect x="0" y="275" rx="3" ry="3" width="18%" height="25" />
      <rect x="0" y="320" rx="3" ry="3" width="14%" height="20" />
      <rect x="0" y="350" rx="3" ry="3" width="6%" height="20" />

      <rect x="20%" y="40" rx="8" ry="8" width="18%" height="200" />
      <rect x="20%" y="275" rx="3" ry="3" width="18%" height="25" />
      <rect x="20%" y="320" rx="3" ry="3" width="14%" height="20" />
      <rect x="20%" y="350" rx="3" ry="3" width="6%" height="20" />

      <rect x="40%" y="40" rx="8" ry="8" width="18%" height="200" />
      <rect x="40%" y="275" rx="3" ry="3" width="18%" height="25" />
      <rect x="40%" y="320" rx="3" ry="3" width="14%" height="20" />
      <rect x="40%" y="350" rx="3" ry="3" width="6%" height="20" />

      <rect x="60%" y="40" rx="8" ry="8" width="18%" height="200" />
      <rect x="60%" y="275" rx="3" ry="3" width="18%" height="25" />
      <rect x="60%" y="320" rx="3" ry="3" width="14%" height="20" />
      <rect x="60%" y="350" rx="3" ry="3" width="6%" height="20" />

      <rect x="80%" y="40" rx="8" ry="8" width="18%" height="200" />
      <rect x="80%" y="275" rx="3" ry="3" width="18%" height="25" />
      <rect x="80%" y="320" rx="3" ry="3" width="14%" height="20" />
      <rect x="80%" y="350" rx="3" ry="3" width="6%" height="20" />

    </ContentLoader>
  )
}

export default LoaderSliderForProducts