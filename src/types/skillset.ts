export type SkillsetType = {
  id: number,
  name: string,
  skills: SkillType[],
  progress: number
}

export type SkillType = {
  id: number,
  name: string,
  media: string,
  isDone: boolean,
  lastDate: Date
}