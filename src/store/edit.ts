import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSkillset, extractParent, findSkillset, removeSkillset } from '../helpers';
import { SkillsetType } from '../types'


interface EditSliceType {
  skillset: SkillsetType;
  showEdit: boolean;
  isNew: boolean;
  currentId: string;
}

interface UpdateSkillsetType {
  name?: string,
  id?: string;
  newId?: string;
  isOrdered?: boolean;
  media?: string;
  lastDate?: Date;
}

const initialState: EditSliceType = {
  skillset: createSkillset(),
  showEdit: false,
  isNew: true,
  currentId: "",
}

const ediSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setSkillset(state, action:PayloadAction<SkillsetType>) {
      state.skillset = action.payload;
      state.isNew = false;
    },
    clearSkillset(state) {
      state.skillset = initialState.skillset;
      state.currentId = initialState.currentId;
      state.isNew = true;
    },
    addSkillset(state, action:PayloadAction<SkillsetType>) {
      const parentIndex= extractParent(action.payload.id);
      if (parentIndex) {
        findSkillset(state.skillset, parentIndex).skillsets.push(action.payload)
      } else {
        state.skillset.skillsets.push(action.payload)
      }
    },
    updateSkillset(state, action:PayloadAction<UpdateSkillsetType>) {
      let refSkillset = state.skillset;
      if (action.payload.id) {
        refSkillset = findSkillset(state.skillset, action.payload.id)
        if (action.payload.newId) {
          action.payload.id = action.payload.newId;
          delete action.payload.newId;
        }
      }
      if (typeof action.payload.isOrdered === 'boolean') refSkillset.isOrdered = action.payload.isOrdered;
      refSkillset.name = action.payload.name || refSkillset.name;
      refSkillset.id = action.payload.id || refSkillset.id;
      refSkillset.media = action.payload.media || refSkillset.media;
      refSkillset.lastDate = action.payload.lastDate || refSkillset.lastDate;
    },
    deleteSkillset(state, action:PayloadAction<string>) {
      removeSkillset(state.skillset, action.payload)
    },
    toggleShowEdit(state) {
      state.showEdit = !state.showEdit;
    },
    setCurrentId(state, action:PayloadAction<string>) {
      state.currentId = action.payload
    }
  },
  extraReducers: {}
})

export const { setSkillset, clearSkillset, toggleShowEdit, updateSkillset, addSkillset, setCurrentId, deleteSkillset } = ediSlice.actions;
export default ediSlice.reducer