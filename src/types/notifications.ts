// Interface para os dados retornados pela API
export interface ApiNotification {
    userId: number;
    id: number;
    title: string;
    body: string;
}
  
  // Interface para o formato interno das notificações no componente
export interface Notification {
    id: string;
    title: string;
    description: string;
    status: string[];
}