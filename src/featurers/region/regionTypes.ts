
export type regionType = {
  karelia: regionItemType,
  orenburg: regionItemType
  ulyanovsk: regionItemType
  samara: regionItemType
  develop: regionItemType
  active: regionItemType | null
}

export type regionItemType = {
  features: {
    emblem_small: string,
    emblem_large: string,
    logoName: string
    titleName: string
    text: string[]
    queryLink: string
    backroundImage: string
    backGroundClassName: string
  }
  mapConfig: {
    centerCoords: number[]
    zoom: number
  }
  madeInKarelia: madeInKareliaType | null
}

export type madeInKareliaType = {
  image_small: string
  image_large: string,
}