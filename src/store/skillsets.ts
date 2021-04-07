import { createSlice } from '@reduxjs/toolkit'
import { SkillsetType } from '../types'


interface SkillsetsSliceType {
  skillsets: SkillsetType[]
}

const initialState: SkillsetsSliceType = {
  skillsets: []
}

const skillsetsSlice = createSlice({
  name: 'skillsets',
  initialState,
  reducers: {},
  extraReducers: {}
})

export default skillsetsSlice.reducer