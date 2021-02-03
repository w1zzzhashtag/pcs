import { incomingDataType, dataType } from "./catalogProductTypes"

// export const fetchDataConfig = {
//   transformResponse: [(res: string) => {
//     if(!res) return {}
//     const data:incomingDataType = JSON.parse(res)
//     return {
//       ...data,
//       imagesDTO: data.imagesDTO.map(image => ({
//         ...image, 
//         url: 'http://api.promcase.ru/' + image.url
//       }))
//     } as dataType
//   }]
// }

// export const sendDataConfig = {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   transformRequest: [(data: dataType) => {
//     const req: incomingDataType = {
//       ...data,
//       id: data.id as number,
//       ktruCharacteristicsInfo: null
//     }
//     return JSON.stringify(req)
//   }]
// }