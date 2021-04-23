export type SkillsetType = {
  name: string,
  id: number,
  isOrdered: boolean,
  skills: SkillType[],
  levels: number[]
  progress: number,
}

export type SkillType = {
  id: string,
  name: string,
  isOrdered: boolean,
  expandChildren: boolean,
  media?: string,
  lastDate?: Date,
  isDone?: boolean
}