import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createIndexString, extractLevel, getLevel, getLevelLimits, shiftLevel, splitIndex } from '../helpers';
import { SkillsetType, SkillType } from '../types'


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
}

const initialState: EditSliceType = {
  skillset: {
    id: "",
    name: "",
    isOrdered: true,
    skills: [],
    levels: [0]
  },
  showEdit: false,
  isNew: true,
  currentId: "",
}

const ediSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setSkillset(state, action:PayloadAction<SkillsetType>) {
      state.skillset = { ...action.payload } ;
      state.isNew = false;
    },
    clearSkillset(state) {
      state = { ...initialState };
      state.isNew = true;
    },
    addSkill(state, action:PayloadAction<SkillType>) {
      const level = getLevel(action.payload.id);
      let posIdx = -1;
      if (state.skillset.levels.length < level + 1) {
        state.skillset.levels = [ ...state.skillset.levels, 0];
      }
      const levelLimits = getLevelLimits(state.skillset.levels, level);
      const splitedIndex = splitIndex(action.payload.id);
      if (splitedIndex.index > 0) {
        posIdx = 1 + state.skillset.skills
        .map( skill => skill.id )
        .indexOf(shiftLevel(action.payload.id, -1), levelLimits.start);
      }
      if (state.skillset.levels[level] === 0) posIdx = levelLimits.start
      let checkIndex:string = splitedIndex.parent || "";
      while (checkIndex && posIdx < 0) {
        let splitCheck = splitIndex(checkIndex);
        const tempSkills = state.skillset.skills
          // eslint-disable-next-line no-loop-func
          .map( skill => extractLevel(skill.id, getLevel(checkIndex)) )
        while (splitCheck.index >= 0) {
          const tempIdx = tempSkills.indexOf(createIndexString(splitCheck), levelLimits.start);
          if (tempIdx >= 0) {
            posIdx = 1 + tempIdx;
            break;
          }
          splitCheck.index --;
        }
        if (!splitCheck.parent) {
          break;
        } 
        checkIndex = splitCheck.parent;
      }
      posIdx = posIdx < 0 ? levelLimits.start : posIdx;
      let tempSkills = state.skillset.skills.slice();
      tempSkills.splice(posIdx, 0, action.payload);
      state.skillset.skills = tempSkills;
      state.skillset.levels = state.skillset.levels.map( (v, i) => i === level ? v + 1 : v);
      
    },
    updateSkill(state, action:PayloadAction<SkillType>) {
      state.skillset.skills = state.skillset.skills.map( skill => skill.id === action.payload.id ? action.payload : skill);
    },
    updateSkillset(state, action:PayloadAction<UpdateSkillsetType>) {
      state.skillset.id = action.payload.newId || state.skillset.id;
      state.skillset.name = action.payload.name || state.skillset.name;
      state.skillset.isOrdered = typeof action.payload.isOrdered === 'boolean' 
      ? action.payload.isOrdered : state.skillset.isOrdered;
    },
    deleteSkill(state, action:PayloadAction<SkillType>) {
      // removeSkillset(state.skillset, action.payload)
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

export const { setSkillset, clearSkillset, toggleShowEdit, updateSkillset, addSkill, updateSkill, setCurrentId, deleteSkill } = ediSlice.actions;
export default ediSlice.reducer