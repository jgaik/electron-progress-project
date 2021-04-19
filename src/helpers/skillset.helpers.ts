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

export const removeSkillset = (skillset: SkillsetType, indexString:string) => {
  const parentIndex = extractParent(indexString);
  let parentSkillset:SkillsetType;
  if (parentIndex) {
    parentSkillset = findSkillset(skillset, parentIndex)
  } else {
    parentSkillset = skillset;
  }
  const shiftIdRecurrent = (skillsets:SkillsetType[], shiftValue:number, level:number) => {
    skillsets.forEach(skillset => {
      skillset.id = shiftLevel(skillset.id, shiftValue, level);
      if (skillset.skillsets.length > 0) shiftIdRecurrent( skillset.skillsets, shiftValue, level)
    });
  }
  const level = getLevel(indexString);
  const indexStart = extractIndex(indexString);
  for (let idx = indexStart + 1; idx < parentSkillset.skillsets.length; idx ++) {
    parentSkillset.skillsets[idx].id = shiftLevel(parentSkillset.skillsets[idx].id, -1, level)
    shiftIdRecurrent(parentSkillset.skillsets[idx].skillsets, -1, level)
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