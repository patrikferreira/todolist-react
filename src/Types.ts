export type Task = {
    id: number;
    description: string;
    isChecked: boolean;
    isImportant: boolean;
    createdAt: Date;
}

export type TaskList = {
    id: string;
    title: string;
    tasks: Task[];
};