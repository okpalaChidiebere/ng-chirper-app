import { Tweet, User } from './_DATA';

export type FormatedTweet = {
  name: string;
  id: string;
  timestamp: number;
  text: string;
  avatar: string;
  likes: Number;
  replies: Number;
  hasLiked: Boolean;
  parent: null | {
    author: string;
    id: string;
  };
};

//takes in an information about a new tweet and formats it in a way that suits our Redux store
export function formatTweet(
  tweet: Tweet,
  author: User,
  authedUser: string,
  parentTweet: Tweet | null
): FormatedTweet {
  const { id, likes, replies, text, timestamp } = tweet;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet
      ? null
      : {
          author: parentTweet.author,
          id: parentTweet.id,
        },
  };
}
