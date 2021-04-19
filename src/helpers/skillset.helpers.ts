import { SkillsetType } from "../types"
import { extractIndex, extractParent, getIndices, getLevel, shiftLevel } from "./index.helpers";

export const createSkillset = ( id?:string, name:string = "", isOrdered:boolean = true ):SkillsetType => {
  const outSkillset:SkillsetType = {
    id: id || "",
    name: name,
    isOrdered: isOrdered,
    skillsets: []
  }
  return outSkillset;
}

export const shiftSkillsetID = (skillset: SkillsetType, shiftValue:number, level?:number) => {
  if (!level) {
    level = getLevel(skillset.id);
  }
  skillset.id = shiftLevel(skillset.id, shiftValue, level);
  skillset.skillsets.forEach( value => {
    shiftSkillsetID(value, shiftValue, level)
  })
}

export const removeSkillset = (skillset: SkillsetType, indexString:string) => {
  const parentIndex = extractParent(indexString);
  let parentSkillset:SkillsetType;
  if (parentIndex) {
    parentSkillset = findSkillset(skillset, parentIndex)
  } else {
    parentSkillset = skillset;
  }
  const level = getLevel(indexString);
  const indexStart = extractIndex(indexString);
  for (let idx = indexStart + 1; idx < parentSkillset.skillsets.length; idx ++) {
    console.log(indexStart);
    shiftSkillsetID(parentSkillset.skillsets[idx], -1, level)
  }
  parentSkillset.skillsets.splice(indexStart, 1)
}

export const findSkillset = (skillset: SkillsetType, indexString:string) => {
  let outSkillset = skillset;
  for (const idx of getIndices(indexString)) {
      outSkillset = outSkillset.skillsets[idx];
  }
  return outSkillset;
}