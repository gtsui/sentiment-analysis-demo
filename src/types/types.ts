export type ITweet = {
  ts: number;
  username: string;
  url: string;
  author: string;
  content: string;
  isRetweet: boolean;
};

export type IUser = {
  username: string;
  displayName: string;
};
