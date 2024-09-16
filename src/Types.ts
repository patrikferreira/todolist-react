export type Task = {
    id: number;
    description: string;
    isChecked: boolean;
    isImportant: boolean;
}

export type Setting = {
    isChecked?: boolean;
    label: string;
}