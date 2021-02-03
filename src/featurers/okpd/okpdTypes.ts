

export type initialStateType  = {
  data: dataType[],
  nestedData: {
    [index: string]: dataType[]
  },
  isLoaded: boolean
}

export type dataType = {
  id: number
  code: string
  name: string
  isFolder: boolean
  isChecked: boolean
}

export type incomingDataType = {
  id: number
  code: string
  name: string
  isFolder: boolean
}