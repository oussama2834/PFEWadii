import { Project } from "./project.model";
import { Task } from "./task.model";

export class Step {
  id !: number
  name !: string
  startDate !: Date
  endDate !: Date
  tasks !: Task[]   // Array of Task objects
  project !: Project // Project object
}
