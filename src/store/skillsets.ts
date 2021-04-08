import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkillsetType } from '../types'


interface SkillsetsSliceType {
  skillsets: SkillsetType[],
  count: number
  showAdd: boolean,
  showUpdae: boolean
}

const initialState: SkillsetsSliceType = {
  skillsets: [],
  count: 0,
  showAdd: false,
  showUpdae: false
}

const skillsetsSlice = createSlice({
  name: 'skillsets',
  initialState,
  reducers: {
    setShowAdd(state, action:PayloadAction<boolean>) {
      state.showAdd = action.payload;
    },
    setShowUpdate(state, action:PayloadAction<boolean>) {
      state.showUpdae = action.payload;
    },
    addSkillset(state, action:PayloadAction<SkillsetType>) {
      state.skillsets.push(action.payload);
      state.count += 1;
    }
  },
  extraReducers: {}
})

export const { setShowAdd, setShowUpdate } = skillsetsSlice.actions;
export default skillsetsSlice.reducer