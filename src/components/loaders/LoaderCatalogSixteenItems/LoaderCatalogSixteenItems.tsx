import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderCatalogSixteenItems.module.scss'

const LoaderCatalogSixteenItems = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >
      <rect x="1.25%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="13.75%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="26.25%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="38.75%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="51.25%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="63.75%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="76.25%" y="0" rx="3" ry="3" width="10%" height="90%" />
      <rect x="88.75%" y="0" rx="3" ry="3" width="10%" height="90%" />
    </ContentLoader>
  )
}

export default LoaderCatalogSixteenItems

