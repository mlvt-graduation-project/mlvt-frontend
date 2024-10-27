import { ProjectStatus } from "./enums/ProjectStatus";

export interface Project {
    id: string;
    thumbnail: string;
    title: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    type_project: string;
}