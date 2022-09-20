import { InformationTickets } from "./information-tickets.interface";
import { Project } from "./project.inferface";
import { User } from "./user.interface";

export interface Ticket {
    id?: number;
    title?: string;
    description?: string;
    estimateTime?: number;
    createdAt?: string;
    user: User;
    project: Project;
    status: InformationTickets
    priority: InformationTickets
    type:InformationTickets
    ticketsContribution: any[

    ]
    comments: Comment[]
  }
  