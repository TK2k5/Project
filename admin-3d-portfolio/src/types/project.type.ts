export interface IProject {
  id: number;
  title: string;
  sortDesc?: string;
  desc: string;
  images?: string[];
  linkCode?: string;
  linkDemo?: string;
  startDate?: string;
  endDate?: string;
  status?: 'Completed' | 'In Progress' | 'Planned';
  role?:
    | 'Leader'
    | 'BA'
    | 'QA'
    | 'Developer'
    | 'Designer'
    | 'DevOps'
    | 'Other'
    | 'Intern';
  teamSize?: number;
  techonology: ITechonology;
}

export interface ITechonology {
  frontend?: string[];
  backend?: string[];
  database?: string[];
}

export interface IProjectDocs {
  items: IProject[];
  title: string;
  desc: string;
}
