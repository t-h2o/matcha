export type Message = {
  id?: number;
  senderUsername: string;
  text: string;
};

export type Notification = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export type ChatMessage = {
  id: number;
  date: string;
  sender: string;
  content: string;
};
