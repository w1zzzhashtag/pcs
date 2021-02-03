import { errorStackType } from "../commonTypes"


export type manufacturerCurrentType = {
  data: manufacturerDataType | null,
  isLoaded: boolean,
  coords: manufacturerCoordsType | null
  errorStack: errorStackType
}

export type manufacturerDataType = {
  address: string,
  description: string | null,
  email: string,
  fullName: string,
  id: number,
  inn: string,
  isFsin: boolean,
  isSmp: boolean,
  kpp: string,
  ogrn: string,
  phone: string,
  shortName: string,
  website: string,
}

export type manufacturerCoordsType = {
  id: number,
  name: string,
  address: string,
  coords: number[],
}