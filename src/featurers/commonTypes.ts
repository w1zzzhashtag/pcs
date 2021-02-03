
export type errorStackType = undefined | string

export type groupProductsType = {
  groupName: string | null,
  subGroupName: string | null,
  totalProducts: number,
  tovars: groupProductsTovarsType[]
}
export type groupProductsTovarsType = {
  id: number
  imgSrc: string | null
  isQualityMark: boolean
  name: string
  okpdCode: string
  organization: string
  price: number
}


export type tableFiltersType = {
  name: string
  value: string
}
export type tableHeadingsType = {
  title: string
  width: number
}