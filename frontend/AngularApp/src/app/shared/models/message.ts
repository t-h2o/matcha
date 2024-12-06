export type Message = {
  id?: number;
  senderUsername: string;
  text: string;
};

export type Notification = {
  title: string;
  content: string;
  date: string;
};
