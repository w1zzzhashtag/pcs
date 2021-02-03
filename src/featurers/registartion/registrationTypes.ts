

export type stepFirstType = {
  fullName: string
  shortName: string
  ogrn: string
  inn: string
  kpp: string
  isSmp: boolean
  isFsin: boolean
}

export type stepTwoType = {
  adress: string,
  regionCode: number,
}

export type stepThreeType = {
  fio: string,
  isContact: boolean,
  position: string,
  email: string,
  phone: string,
  login: string,
  password: string,
}

export type initialStateType = {
  values:
    & regDataType 
    & stepFirstType 
    & stepTwoType 
    & stepThreeType
  stepNumber: number
}

export type regDataType = {
  registrationDate: Date | null
}
