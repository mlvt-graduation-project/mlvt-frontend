// project status
export enum ProjectStatus {
    Complete = 'complete',
    InProgress = 'inProgress',
    Failed = 'failed',
    Raw = 'raw',
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