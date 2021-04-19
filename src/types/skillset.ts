export type SkillsetType = {
  name: string,
  id: string,
  isOrdered: boolean,
  progress?: number,
  media?: string,
  lastDate?: Date,
  skillsets: SkillsetType[],
}