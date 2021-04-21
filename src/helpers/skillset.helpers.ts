// import { SkillsetType } from "../types"
// import { extractIndex, extractParent, getIndices, getLevel, shiftLevel } from "./index.helpers";


export const getLevelLimits = (levels:number[], level:number) => {
  if (level === 0) {
    return {start:0, end:levels[0]};
  } 
  const start = levels.slice(0, level).reduce((sum, val) => sum + val );
  return {start, end:start + levels[level]};
}

// export const createSkillset = ( id?:string, name:string = "", isOrdered:boolean = true ):SkillsetType => {
//   const outSkillset:SkillsetType = {
//     id: id || "",
//     name: name,
//     isOrdered: isOrdered,
//     skillsets: []
//   }
//   return outSkillset;
// }

// export const shiftSkillsetID = (skillset: SkillsetType, shiftValue:number, level?:number) => {
//   if (!level) {
//     level = getLevel(skillset.id);
//   }
//   skillset.id = shiftLevel(skillset.id, shiftValue, level);
//   skillset.skillsets.forEach( value => {
//     shiftSkillsetID(value, shiftValue, level)
//   })
// }

// export const removeSkillset = (skillset: SkillsetType, indexString:string) => {
//   console.log(indexString);
//   const parentIndex = extractParent(indexString);
//   const parentSkillset = parentIndex ? findSkillset(skillset, parentIndex) : skillset;
//   const level = getLevel(indexString);
//   const indexStart = extractIndex(indexString);
//   console.log(parentSkillset.skillsets.splice(indexStart, 1));
//   for (let idx = indexStart; idx < parentSkillset.skillsets.length; idx ++) {
//     shiftSkillsetID(parentSkillset.skillsets[idx], -1, level);
//   }
// }

// export const findSkillset = (skillset: SkillsetType, indexString:string) => {
//   let outSkillset = skillset;
//   for (const idx of getIndices(indexString)) {
//       outSkillset = outSkillset.skillsets[idx];
//   }
//   console.log(outSkillset.id)
//   return outSkillset;
// }