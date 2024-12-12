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

export type ChatMessageFromBack = {
  id: number;
  date: string;
  sender: string;
  message: string;
};

export type ChatMessageToBack = {
  to: string;
  message: string;
};
