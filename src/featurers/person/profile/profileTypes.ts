import { errorStackType } from "../../commonTypes"

export type profileType = {
  data:  profileDataType | null,
  isLoaded: boolean
  errorStack: errorStackType
}

export type profileDataType = {
  id: number

  fullName: string
  shortName: string
  inn: string
  kpp: string
  ogrn: string
  description: string
  isSmp: boolean
  isFsin: boolean

  address: string
  region: number

  fio: string
  isContact: boolean
  position: string
  personalPhone: string
  website: string
  personalEmail: string
  login: string
  password: string
}


