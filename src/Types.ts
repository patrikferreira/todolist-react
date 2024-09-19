export type Task = {
    id: number;
    description: string;
    isChecked: boolean;
    isImportant: boolean;
    createdAt: Date;
}

export type Setting = {
    isChecked?: boolean;
    label: string;
}