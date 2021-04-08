export type SkillsetType = {
  id: number,
  name: string,
  skills: SkillType[],
  progress: number,
  order: OrderEnum
}

export type SkillType = {
  id: number,
  name: string,
  media: string,
  isDone: boolean,
  lastDate: Date
}

export enum OrderEnum {
  Ordered = "ordered",
  Unordered = "unordered",
  Hierarchy = "hierarchy"
}