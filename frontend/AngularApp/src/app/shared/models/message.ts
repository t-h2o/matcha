export type Message = {
  id?: number;
  senderUsername: string;
  text: string;
};

export type Notification = {
  id: number;
  title: string;
  content: string;
  timestamp: number;
  date?: string;
};

export type ChatMessageFromBack = {
  timestamp: string;
  sender: string;
  message: string;
};

export type ChatNotificationMsg = {
  title: string;
  content: string;
};

export type ChatMessageToBack = {
  to: string;
  message: string;
};
