import { Project } from "./project.model";
import { Role } from "./role.model";
import { Task } from "./task.model";

export class User {

    userFirstName!: string;
    userLastName!: string;
    userName!: string;
    userPassword!: string;
    userEmail!: string;
    role!: Role[];
    projects!: Project[];
    tasks!: Task[];  // Add this line

  }
