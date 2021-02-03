import { errorStackType } from '../commonTypes'
import { manufacturerDataType, manufacturerCoordsType } from './../manufacturerCurrent/manufacturerCurrentTypes'

export type manufacturersType = {
  data: manufacturerDataType[],
  isLoaded: boolean,
  coords: manufacturerCoordsType[],
  sortBy: manufacturersSortByType[],
  sortActive: null | manufacturersSortByType
  errorStack: errorStackType
}


export type manufacturersSortByType = {
  id: number,
  name: string,
  query: string
}

export type manufacturersValuesFormType = {
  name: string
  inn: string
  productName: string
}

