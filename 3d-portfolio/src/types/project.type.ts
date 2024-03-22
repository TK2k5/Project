export interface IProjects {
  title: string
  desc: string
  items: []
}

export interface IProject {
  id: number
  title: string
  sortDesc: string
  desc: string
  images: string[]
  linkCode: string
  linkDemo?: string
  startDate: string
  endDate: string
  status: string
  role: string
  teamSize: number
  technology: {
    frontend: string[]
    backend: string[]
    database: string[]
  }
}

// export interface ITechnology {
//   frontend: string[]
//   backend: string[]
//   database: string[]
// }
