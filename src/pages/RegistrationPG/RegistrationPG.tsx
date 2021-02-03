import React from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../app/contexts'
import { StepFirst, StepThree, StepTwo } from './children'
import { RootStoreType } from '../../app/rootReducer'

import { defaultPageVariants } from '../../app/variants'
import styles from './RegistrationPG.module.scss'

const TOTAL_STEPS = 3

const RegistrationPG = () => {
  const { theme } = React.useContext(ThemeContext)
  const { stepNumber } = useSelector((state: RootStoreType) => state.registration)

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >

      <span className={styles.countSteps}>
        Шаг <span className={styles.countSteps__number}>
          {stepNumber}
        </span> из <span className={styles.countSteps__number}>
          {TOTAL_STEPS}
        </span>
      </span>

      <div className={cn(styles.inner, styles[theme])}>
        {stepNumber === 1 && <StepFirst />}
        {stepNumber === 2 && <StepTwo />}
        {stepNumber === 3 && <StepThree />}
        <div className={styles.range}>
          <div className={styles.range__line}>
            <span
              className={styles.range__progress}
              style={{ width: (stepNumber - 1) * 100 / TOTAL_STEPS + '%' }}
            ></span>
          </div>
        </div>
      </div>

    </motion.div>
  )
}

export default RegistrationPG
