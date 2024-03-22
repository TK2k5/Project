export interface IOverview {
  id: number
  title: string
  desc: string
  experience?: string
  projects?: number
  clients?: number
  languages?: string[]
  works: IWork[]
}

export interface IWork {
  id: number
  title: string
  image: string
}
