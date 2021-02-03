import { errorStackType, groupProductsType } from './../commonTypes'

export type fsinType = {
  data: groupProductsType | null,
  options: fsinOptionsType | null,
  isLoaded: boolean,
  optionsIsLoaded: boolean
  errorStack: errorStackType
}



export type fsinOptionsType = {
  name: string
  priceMax: number
  priceMin: number
  searchOptionsCatalogs: fsinOptionsCatalogsType[]
  searchOptionsOrganizations: fsinOptionsOrganizationsType[],
  searchOptionsCatalogsActive: fsinOptionsCatalogsType
}
export type fsinOptionsCatalogsType = {
  id: number
  name: string
}
export type fsinOptionsOrganizationsType = {
  id: number
  name: string
  checked: boolean
}


