import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkillsetType } from '../types'


interface UpdateSliceType {
  skillset: SkillsetType | null;
}

const initialState: UpdateSliceType = {
  skillset: null
}

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setUpdateSkillset(state, action:PayloadAction<SkillsetType>) {
      state.skillset = action.payload;
    }
  },
  extraReducers: {}
})

export const { setUpdateSkillset } = updateSlice.actions;
export default updateSlice.reducer