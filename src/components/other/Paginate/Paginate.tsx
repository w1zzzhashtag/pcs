import React from 'react'
import cn from 'classnames'
import ReactPaginate from 'react-paginate';
import { ThemeContext } from '../../../app/contexts';
import styles from './Paginate.module.scss'

interface P {
  pageCount: number
  onPageChange: (data: { selected: number }) => void
}

const Paginate: React.FC<P> = ({ pageCount, onPageChange }) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        previousLabel='Предыдущая'
        nextLabel='Следующая'
        containerClassName={cn(styles.wrapper, styles[theme], {
          [styles.hidden]: pageCount <= 1
        })}
        pageClassName={styles.page}
        pageLinkClassName={styles.link}
        activeClassName={styles.page__active}
        activeLinkClassName={styles.link__active}
        previousClassName={styles.prev}
        nextClassName={styles.next}
        previousLinkClassName={styles.prev__link}
        nextLinkClassName={styles.next__link} />
    </>
  )
}

export default Paginate
