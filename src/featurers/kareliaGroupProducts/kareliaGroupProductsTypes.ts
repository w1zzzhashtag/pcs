import { errorStackType, groupProductsType } from './../commonTypes'

export type kareliaGroupProductsType = {
  data: groupProductsType | null
  isLoaded: boolean
  errorStack: errorStackType
}