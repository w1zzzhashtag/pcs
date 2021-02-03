import { errorStackType } from "../../commonTypes"


export type initialStateType = {
  data: dataType | null,
  isLoaded: boolean,
  errorStack: errorStackType
}

export type dataType = {
  id?: number
  name: string
  okeiName: string
  price: number
  ktruInfo: string
  imageDTO: imagesType[]
  catalogName: string
  okpdCode: string
  specificationDTO: charactsType[]
} 

export type incomingDataType = {
  id: number
  name: string
  okeiName: string
  price: number
  ktruInfo: string
  imageDTO: imagesType[]
  catalogName: string
  okpdCode: string
  specificationDTO: charactsType[]
}

export type imagesType = {
  id: number
  url: string | ArrayBuffer | null
  index: number
  status: 'D' | 'C' | null
}

export type charactsType = {
  id: number
  status?: 'D' | 'C'
} & charactsValuesType

export type charactsValuesType = {
  name: string
  value: string
  unit: string
}