

export type CatalogListType = {
  data: CatalogListDataType[],
  isLoaded: boolean
}

export type CatalogListDataType = {
  id: number
  imgSrc: string
  isCatalogEmpty: boolean
  name: string
  okpd2Ktrus: any
}
