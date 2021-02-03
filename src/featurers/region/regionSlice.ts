import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { data } from './regionData'
import { regionType } from './regionTypes'

const initialState: regionType = data


const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      const regionName = action.payload
      if (regionName.match('localhost')) state.active = state.develop
      else if (regionName.match('karelia')) state.active = state.karelia
      else if (regionName.match('orenburg')) state.active = state.orenburg
      else if (regionName.match('ulyanovsk')) state.active = state.ulyanovsk
      else if (regionName.match('samara')) state.active = state.samara
      else if (regionName.match('develop')) state.active = state.develop
      else state.active = null
    }
  }
})

export const { setRegion } = regionSlice.actions
export default regionSlice.reducer