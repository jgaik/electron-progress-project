import { IndexClass } from "../helpers"

export type SkillsetType = {
  id: number,
  name: string,
  skills: SkillType[],
  progress: number,
  order: OrderEnum,
  levels: number,
}

export type SkillType = {
  id: IndexClass,
  name: string,
  media: string,
  isDone: boolean,
  lastDate: Date,
  isOrdered: boolean
}

export enum OrderEnum {
  Ordered = "ordered",
  Unordered = "unordered",
  Hierarchy = "hierarchy"
}