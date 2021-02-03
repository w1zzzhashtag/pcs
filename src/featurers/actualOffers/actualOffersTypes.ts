

export type actualOffersType = {
  data: actualOffersDataType[],
  isLoaded: boolean
}


export type actualOffersDataType = {
  id: number
  imgSrc: string | null
  isQualityMark: boolean
  organizationName: string
  price: number
  productName: string
}