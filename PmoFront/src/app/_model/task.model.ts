import { Step } from "./step.model";
import { User } from "./user.model";

export class Task {
    taskId!: number
    taskDescription!: string
    dueDate!: Date
    taskProgress!: number
    ponderation!: number
    ponderationProgress!: number
    step!: Step
    user!: User

  }
