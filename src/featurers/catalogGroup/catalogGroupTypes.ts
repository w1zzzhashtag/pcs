import { errorStackType } from "../commonTypes"

export type catalogGroupType = {
  data: catalogGroupDataType | null
  isLoaded: boolean
  errorStack: errorStackType
}

export type catalogGroupDataType = {
  name: string,
  totalProducts: number,
  groups: catalogGroupDataGroupsType[]
}

export type catalogGroupDataGroupsType = {
  nameGroup: string,
  okpd2Group: number,
  productsCount: number,
  priceMin: number,
  priceMax: number,
  imgSrc: string | null
}