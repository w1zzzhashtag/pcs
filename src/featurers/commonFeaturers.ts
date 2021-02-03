

export const getDate = (string: string) => {
  const arrayDate = string.split('T')[0].split('-')
  return `${arrayDate[2]}.${arrayDate[1]}.${arrayDate[0]}`
}
export const getTime = (string: string) => {
  const arrayTime = string.split('T')[1].split('.')
  return arrayTime[0]
}