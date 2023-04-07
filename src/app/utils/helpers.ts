import { Tweet, User } from './_DATA';

export type FormatedTweet = {
  name: string;
  id: string;
  author: string;
  timestamp: number;
  text: string;
  avatar: string;
  likes: number;
  replies: number;
  hasLiked: boolean;
  parent: null | {
    author: string;
    id: string;
  };
};

//takes in an information about a new tweet and formats it in a way that suits our Redux store
export function formatTweet(
  tweet: Tweet,
  tweetUserInfo: User,
  authedUser: string,
  parentTweet: Tweet | null
): FormatedTweet {
  const { id, likes, replies, text, timestamp, author } = tweet;
  const { name, avatarUrl } = tweetUserInfo;

  return {
    name,
    id,
    author,
    timestamp: Number(timestamp),
    text,
    avatar: avatarUrl,
    likes: likes?.length,
    replies: replies?.length,
    hasLiked: likes?.includes(authedUser) ?? false,
    parent: !parentTweet
      ? null
      : {
          author: parentTweet.author,
          id: parentTweet.id,
        },
  };
}
