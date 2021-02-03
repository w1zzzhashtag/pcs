

export type popularProductsType = {
  data: popularProductsDataType[],
  isLoaded: boolean
}

export type popularProductsDataType = {
  id: number
  imgSrc: string | null
  isQualityMark: boolean
  organizationName: string
  price: number
  productName: string
}