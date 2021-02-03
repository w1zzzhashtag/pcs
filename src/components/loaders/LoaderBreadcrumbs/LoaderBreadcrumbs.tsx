import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderBreadcrumbs.module.scss'

const LoaderBreadcrumbs = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >
      <rect x="0" y="0" rx="3" ry="3" width="23%" height="25" />
      <rect x="25%" y="0" rx="3" ry="3" width="23%" height="25" />
      <rect x="50%" y="0" rx="3" ry="3" width="23%" height="25" />
      <rect x="85%" y="0" rx="3" ry="3" width="15%" height="25" />
    </ContentLoader>
  )
}

export default LoaderBreadcrumbs

