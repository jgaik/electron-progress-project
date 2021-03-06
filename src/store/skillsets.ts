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
      const newSkillset = { ...action.payload,  id: state.count };
      state.skillsets = [ ...state.skillsets, newSkillset ];
      state.count += 1;
    },
    updateSkillset(state, action:PayloadAction<SkillsetType>) {
      const newSkillset = { 
        ...action.payload,  
        progress: action.payload.skills.filter( skill => skill.isDone ).length / action.payload.skills.length };
      state.skillsets = state.skillsets.map( (skillset, id) => newSkillset.id === id ? newSkillset : skillset);
    }
  },
  extraReducers: {}
})

export const { setShowAdd, setShowUpdate, addSkillset, updateSkillset } = skillsetsSlice.actions;
export default skillsetsSlice.reducer