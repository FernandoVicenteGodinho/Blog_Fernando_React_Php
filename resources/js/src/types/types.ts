export interface INotification {
    color: 'success' | 'danger' | 'warning' | 'info' | '';
    message: string;
}

export   interface IUser {
    name: string;
    email: string;
    profession: string;
    website: string;
    linkedin: string;
    github: string;
}

export interface IPost {
    id: string;
    title: string;
    body: string;
    resume: string;
    user: Array<IUser>;
    created_at: string;
    updated_at: string;
}
