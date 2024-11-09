// project status
export enum ProjectStatus {
    Complete = 'complete',
    InProgress = 'inProgress',
    Failed = 'failed',
    Raw = 'raw',
}

export const  mapStatusToProjectStatus = (status: string) => {
    switch (status.toLowerCase()) {
        case 'complete':
            return ProjectStatus.Complete;
        case 'inprogress': // Ensure the string matches exactly what's expected.
            return ProjectStatus.InProgress;
        case 'failed':
            return ProjectStatus.Failed;
        case 'raw':
            return ProjectStatus.Raw;
        default:
            throw new Error(`Unhandled status: ${status}`);
    }
}

export const toDisplayText = (status: ProjectStatus) => {
    switch (status) {
        case ProjectStatus.Complete:
            return 'Completed';
        case ProjectStatus.InProgress:
            return 'In Progress';
        case ProjectStatus.Failed:
            return 'Failed';
        case ProjectStatus.Raw:
            return 'Raw';
    }
}