"use client";

import React, { useState } from "react";
import { MessageSquare, Share2, ThumbsUp, Send, Image as ImageIcon, Globe, MoreHorizontal, CheckCircle2 } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

interface Post {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  avatarBg: string;
  time: string;
  content: string;
  achievement?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  liked: boolean;
  shared: boolean;
}

const initialPosts: Post[] = [
  {
    id: "p1",
    author: "Elena Rostova",
    handle: "@elena_green",
    avatar: "ER",
    avatarBg: "bg-emerald-600",
    time: "2 hrs ago",
    content: "Just completed my 14-day commuting streak! Cycling to work saved about 67.2 kg of CO2 emissions compared to driving my SUV. Feeling healthier and greener! 🚲🌳",
    achievement: "Completed 14-Day Cycle Commute Streak",
    likes: 42,
    comments: [
      { id: "c1", author: "Mark Chen", avatar: "MC", content: "Incredible commitment! Keep it up!", time: "1 hr ago" },
      { id: "c2", author: "Sarah Jenkins", avatar: "SJ", content: "Awesome work! Getting my bike serviced tomorrow to join the trend.", time: "45 mins ago" },
    ],
    shares: 8,
    liked: false,
    shared: false,
  },
  {
    id: "p2",
    author: "Marcus Aurelius",
    handle: "@stoic_nature",
    avatar: "MA",
    avatarBg: "bg-cyan-600",
    time: "5 hrs ago",
    content: "Transitioned my home fully to a cold laundry wash cycle. It might seem minor, but it saves ~75% of active electricity per load. Little actions accumulate when thousands participate. 🌍🔋",
    likes: 19,
    comments: [],
    shares: 2,
    liked: true,
    shared: false,
  },
  {
    id: "p3",
    author: "Sophia Patel",
    handle: "@sophia_eco",
    avatar: "SP",
    avatarBg: "bg-purple-600",
    time: "1 day ago",
    content: "Tested out the new vegan restaurant downtown! Staggeringly good meal and incredibly low carbon burden. Eating plant-based represents the single most significant lifestyle swap to curb individual emissions. 🥗💚",
    achievement: "Dined at Zero-Emission Vegan Cafe",
    likes: 56,
    comments: [
      { id: "c3", author: "Elena Rostova", avatar: "ER", content: "Where is this restaurant? I want to go!", time: "22 hrs ago" },
    ],
    shares: 12,
    liked: false,
    shared: false,
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `p-${Date.now()}`,
      author: "Eco Warrior",
      handle: "@eco_warrior",
      avatar: "EW",
      avatarBg: "bg-emerald-600",
      time: "Just now",
      content: newPostContent,
      likes: 0,
      comments: [],
      shares: 0,
      liked: false,
      shared: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleShare = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shared: !post.shared,
            shares: post.shared ? post.shares - 1 : post.shares + 1,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c-${Date.now()}`,
                author: "Eco Warrior",
                avatar: "EW",
                content: commentText,
                time: "Just now",
              },
            ],
          };
        }
        return post;
      })
    );

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Eco Feed
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Share your actions, inspire friends, and compete in community challenges.
        </p>
      </div>

      {/* Post Composer */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-950 dark:bg-zinc-950">
        <form onSubmit={handleCreatePost}>
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold shadow-sm">
              EW
            </div>
            <textarea
              placeholder="What carbon-saving action did you take today?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full min-h-[70px] resize-none border-none bg-transparent py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
            />
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-900">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <ImageIcon className="h-4 w-4 text-emerald-500" />
              Add Image
            </button>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xxs text-zinc-400">
                <Globe className="h-3 w-3" /> Public
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200"
              >
                Post
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Feed Timeline */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-950 dark:bg-zinc-950"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold ${post.avatarBg}`}>
                  {post.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-zinc-850 dark:text-zinc-100">{post.author}</span>
                    <span className="text-xxs text-zinc-450 dark:text-zinc-500">{post.handle}</span>
                  </div>
                  <span className="text-xxs text-zinc-400 dark:text-zinc-500">{post.time}</span>
                </div>
              </div>
              <button className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>

            {/* Content text */}
            <p className="mt-4 text-sm leading-relaxed text-zinc-850 dark:text-zinc-200">
              {post.content}
            </p>

            {/* Achievement Badge if exists */}
            {post.achievement && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 px-4 py-2.5 dark:bg-emerald-950/20">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {post.achievement}
                </span>
              </div>
            )}

            {/* Action Metrics Row */}
            <div className="mt-5 flex items-center justify-between border-y border-zinc-100 py-3 text-xxs font-semibold text-zinc-450 dark:border-zinc-900 dark:text-zinc-500">
              <span>{post.likes} Likes</span>
              <span>{post.comments.length} Comments • {post.shares} Shares</span>
            </div>

            {/* Interactive buttons */}
            <div className="mt-2.5 flex items-center justify-around border-b border-zinc-100 pb-2.5 dark:border-zinc-900">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  post.liked
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-zinc-450"
                }`}
              >
                <ThumbsUp className={`h-4.5 w-4.5 ${post.liked ? "fill-emerald-600/15" : ""}`} />
                Like
              </button>
              <button className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-zinc-450 transition-colors">
                <MessageSquare className="h-4.5 w-4.5" />
                Comment
              </button>
              <button
                onClick={() => handleShare(post.id)}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  post.shared
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:text-zinc-450"
                }`}
              >
                <Share2 className="h-4.5 w-4.5" />
                Share
              </button>
            </div>

            {/* Comments Thread Area */}
            <div className="mt-4 space-y-4">
              {post.comments.map((comm) => (
                <div key={comm.id} className="flex gap-2.5 items-start bg-zinc-50 dark:bg-zinc-900/40 rounded-xl p-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 text-xxs font-semibold dark:bg-zinc-800 dark:text-zinc-300">
                    {comm.avatar}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{comm.author}</span>
                      <span className="text-xxxxs text-zinc-400">{comm.time}</span>
                    </div>
                    <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-normal">{comm.content}</p>
                  </div>
                </div>
              ))}

              {/* Add Comment Input */}
              <form
                onSubmit={(e) => handleAddComment(post.id, e)}
                className="flex items-center gap-2 pt-2"
              >
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ""}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  className="w-full rounded-xl border border-zinc-150 bg-white px-3 py-2 text-xs outline-none transition-all focus:border-emerald-500 dark:border-zinc-850 dark:bg-zinc-900 dark:text-zinc-200"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-100 hover:bg-zinc-200 p-2 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-850 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
