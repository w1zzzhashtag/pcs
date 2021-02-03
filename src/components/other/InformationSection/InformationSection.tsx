import React from 'react'

interface iProps {
  children: React.ReactNode,
  nameClass: string
}

const InformationSection: React.FC<iProps> = ({ children, nameClass }) => {
  return (
    <section className={nameClass}>
      {children}
    </section>
  )
}

export default InformationSection
