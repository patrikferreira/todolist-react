export type User = {
    id: string;
    name: string;
};

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

export type FormDataLogin = {
    email: string;
    password: string;
}

export type FormRegister = {
    username: string;
    email: string;
    password: string;
}

export const MAX_PROJECT_NAME_LENGTH = 25;

export const MAX_TASK_LENGTH = 25;

export const MAX_PROJECTS = 6;
