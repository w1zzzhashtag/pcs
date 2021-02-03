import { fsinOptionsType } from './fsinTypes'

export const fetchOptionsConfig = {
  transformResponse: [(res: string) => {
    if(!res) return {}
    const options: fsinOptionsType = JSON.parse(res)
    return {
      name: '',
      priceMax: 0,
      priceMin: 0,
      searchOptionsOrganizations: [
        ...options.searchOptionsOrganizations.map(item => (
          { ...item, checked: true }
        ))
      ],
      searchOptionsCatalogs: [
        { id: 0, name: 'Все' },
        ...options.searchOptionsCatalogs.map(item => ({ ...item }))
      ],
      searchOptionsCatalogsActive: { id: 0, name: 'Все' }
    };
  }]
}

export const sendOptionsConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  transformRequest: [(data: fsinOptionsType) => {
    const options = {
      ...data,
      name: (data.name.trim() !== '')
        ? data.name
        : null,
      searchOptionsCatalogs: (data.searchOptionsCatalogsActive.name !== 'Все')
        ? [{ ...data.searchOptionsCatalogsActive }]
        : null,
      searchOptionsOrganizations: data.searchOptionsOrganizations.filter(item => item.checked)
    }
    return JSON.stringify(options)
  }],
}