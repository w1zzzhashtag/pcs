import { errorStackType, groupProductsType } from './../commonTypes'

export type catalogGroupProductsType = {
  data: groupProductsType | null
  isLoaded: boolean
  errorStack: errorStackType
}