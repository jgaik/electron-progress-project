import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkillsetType, SkillType } from '../types'


interface UpdateSliceType {
  skillset: SkillsetType | null;
  skill: SkillType | null;
}

const initialState: UpdateSliceType = {
  skillset: null,
  skill: null
}

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setUpdateSkill(state, action:PayloadAction<SkillType>) {
      state.skill = action.payload;
    },
    setUpdateSkillset(state, action:PayloadAction<SkillsetType>) {
      state.skillset = action.payload;
    }
  },
  extraReducers: {}
})

export const { setUpdateSkill, setUpdateSkillset } = updateSlice.actions;
export default updateSlice.reducer