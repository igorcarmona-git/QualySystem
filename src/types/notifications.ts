
// Interface para o formato interno das notificações no componente
export interface Notification {
    id: string;
    title: string;
    description: string;
    status: string[];
}

export interface StatusNotification {
    id: number;
    status: string;
}