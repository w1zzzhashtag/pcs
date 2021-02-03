

export const defaultPageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
}

export const tableItemVariants = {
  hidden: { x: -50, y: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.01
    }
  })
}
