import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderListItem.module.scss'

const LoaderListItem = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >
      <circle cx="70" cy="80" r="50" />
      <rect x="140" y="29" rx="3" ry="3" width="80%" height="17" />
      <rect x="140" y="64" rx="3" ry="3" width="40%" height="17" />
      <rect x="140" y="97" rx="3" ry="3" width="35%" height="17" />
      <rect x="140" y="132" rx="3" ry="3" width="30%" height="17" />
    </ContentLoader>
  )
}

export default LoaderListItem