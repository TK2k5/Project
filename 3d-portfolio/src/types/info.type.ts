export interface IInfo {
  id: number
  name: string
  description: string
  email: string
  phone: string
  address: string
  education: IEducation
}

export interface IEducation {
  id: number
  school: string
  major: string
  degree?: string
  graduation?: string
  gpa?: number
}
