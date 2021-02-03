import React from "react"
import ContentLoader from "react-content-loader"
import { ThemeContext } from "../../../app/contexts"
import styles from './LoaderContentInfo.module.scss'

const LoaderContentInfo = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <ContentLoader
      backgroundColor={theme === 'light' ? '#E1E1E1' : '#636363'}
      foregroundColor={theme === 'light' ? '#cccccc' : '#888888'}
      className={styles.loader}
    >

      <rect x="0" y="0" rx="3" ry="3" width="70%" height="25" />
      <rect x="20" y="35" rx="3" ry="3" width="55%" height="25" />
      <rect x="20" y="70" rx="3" ry="3" width="40%" height="25" />
      <rect x="0" y="105" rx="3" ry="3" width="70%" height="25" />
      <rect x="20" y="140" rx="3" ry="3" width="50%" height="25" />
      <rect x="20" y="175" rx="3" ry="3" width="20%" height="25" />
      <rect x="0" y="210" rx="3" ry="3" width="70%" height="25" />
      <rect x="20" y="255" rx="3" ry="3" width="50%" height="25" />
      <rect x="20" y="290" rx="3" ry="3" width="35%" height="25" />
      <rect x="20" y="325" rx="3" ry="3" width="25%" height="25" />


      <circle cx="80%" cy="20" r="20" />
      <rect x="83%" y="0" rx="3" ry="3" width="17%" height="15" />
      <rect x="86%" y="23" rx="3" ry="3" width="14%" height="15" />

      <circle cx="80%" cy="80" r="20" />
      <rect x="83%" y="60" rx="3" ry="3" width="17%" height="15" />
      <rect x="86%" y="83" rx="3" ry="3" width="14%" height="15" />

      <circle cx="80%" cy="140" r="20" />
      <rect x="83%" y="120" rx="3" ry="3" width="17%" height="15" />
      <rect x="86%" y="143" rx="3" ry="3" width="14%" height="15" />

      <rect x="78%" y="200" rx="3" ry="3" width="22%" height="150" />
    </ContentLoader>
  )}

  export default LoaderContentInfo

