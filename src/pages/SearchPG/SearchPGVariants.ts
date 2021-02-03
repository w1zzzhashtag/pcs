
export const textVariants = {
  hidden: {
    opacity: 0,
    y: -200
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: .5 }
  },
}


export const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visibleGray: {
    fill: "rgba(182, 201, 214, 1)",
    opacity: 1,
    pathLength: 1,
    transition: {
      default: { duration: 1.5, ease: "easeInOut", delay: 1.25 },
      fill: { duration: 1.5, ease: [1, 0, 0.8, 1], delay: 1.25 }
    }
  },
  visibleBlue: {
    fill: "rgba(209, 237, 255, 1)",
    opacity: 1,
    pathLength: 1,
    transition: {
      default: { duration: 1, ease: "easeInOut", delay: .75 },
      fill: { duration: 1, ease: [1, 0, 0.8, 1], delay: .75 }
    }
  }
}