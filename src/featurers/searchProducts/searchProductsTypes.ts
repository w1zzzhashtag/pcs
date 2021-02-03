import { groupProductsType } from './../commonTypes'


export type searchProductsType = {
  data: groupProductsType | null
  isLoaded: boolean
}

export type searchProductsValuesFormType = {
  productName: string,
  okpd2: string,
  organizationName: string,
  priceMin: string,
  priceMax: string,
} 