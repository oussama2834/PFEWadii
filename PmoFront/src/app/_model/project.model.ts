import { Step } from "./step.model"
import { User } from "./user.model"

export class Project {
    projectId !:number
    projectName!: string
    projectDescription!: string
    sponsor!: String
    domain!: String
    nature!: String
    startDate!: Date
  endDate!: Date
  user !: User
  steps !: Step[]

}
