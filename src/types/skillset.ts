export type SkillsetType = {
  name: string,
  id: string,
  isOrdered: boolean,
  skills: SkillType[],
  levels: number[]
  progress?: number,
}

export type SkillType = {
  id: string,
  name: string,
  isOrdered: boolean,
  media?: string,
  lastDate?: Date,
  isDone?: boolean
}