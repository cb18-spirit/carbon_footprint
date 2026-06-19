"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Share2,
  ThumbsUp,
  Send,
  Image as ImageIcon,
  MoreHorizontal,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Upload,
  Trash2,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";

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
  time: string;
  content: string;
  proofValue?: number; // CO2 saved in kg
  proofCategory?: string; // e.g. Server Switch, Waste Sorting
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  liked: boolean;
  shared: boolean;
}

const initialPosts: Post[] = [
  {
    id: "post-1",
    author: "Alexander Mercer",
    handle: "@alex_infra",
    avatar: "AM",
    time: "20 mins ago",
    content: "Migrated our core computation workloads to geolocated carbon-neutral edge server nodes. The migration was seamless and offsets substantial operational energy consumption.",
    proofValue: 12.0,
    proofCategory: "Server Switch",
    imageUrl: "/scratch/servers_offset.png", // Mock preview url
    likes: 24,
    comments: [
      { id: "c1", author: "Dr. Sarah Jenkins", avatar: "SJ", content: "Superb migration layout. Did you face any latency jumps during data caching transfer?", time: "15 mins ago" },
      { id: "c2", author: "Alexander Mercer", avatar: "AM", content: "Minimal! We routed traffic during off-peak hours using redundant DNS mapping.", time: "10 mins ago" },
    ],
    shares: 4,
    liked: false,
    shared: false,
  },
  {
    id: "post-2",
    author: "Helena Rostova",
    handle: "@helena_green",
    avatar: "HR",
    time: "3 hrs ago",
    content: "Organized a community organic waste composting and recyclables sorting campaign at our regional technology cluster. We registered over 45 participants and set up permanent bins.",
    proofValue: 5.4,
    proofCategory: "Waste Sorting",
    imageUrl: "/scratch/waste_sorting.png",
    likes: 89,
    comments: [
      { id: "c3", author: "Marcus Aurelius", avatar: "MA", content: "Small community drives like this are highly contagious. Outstanding work, Helena!", time: "2 hrs ago" },
    ],
    shares: 15,
    liked: true,
    shared: false,
  },
  {
    id: "post-3",
    author: "Elena Rostova",
    handle: "@elena_active",
    avatar: "ER",
    time: "1 day ago",
    content: "Successfully routed our edge cluster GPU exhaust to local heating loop vents. Capturing thermal waste offsets building gas grids directly.",
    proofValue: 8.2,
    proofCategory: "GPU Heat Loop",
    likes: 56,
    comments: [],
    shares: 7,
    liked: false,
    shared: false,
  },
];

const carbonProofOptions = [
  { label: "No Carbon Proof Tag", value: 0, category: "" },
  { label: "-12.0 kg CO2 (Server Switch)", value: 12.0, category: "Server Switch" },
  { label: "-8.2 kg CO2 (GPU Heat Loop)", value: 8.2, category: "GPU Heat Loop" },
  { label: "-5.4 kg CO2 (Waste Sorting)", value: 5.4, category: "Waste Sorting" },
  { label: "-2.5 kg CO2 (Transit Carpool)", value: 2.5, category: "Transit Carpool" },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  
  // Custom states for Carbon Proof and Mock Image Attachment
  const [selectedProofIndex, setSelectedProofIndex] = useState(0);
  const [showProofDropdown, setShowProofDropdown] = useState(false);
  const [attachedImageName, setAttachedImageName] = useState<string | null>(null);
  
  // Comment states
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  
  // Interaction overlays
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [expandedSharePostId, setExpandedSharePostId] = useState<string | null>(null);
  const [copiedSharePostId, setCopiedSharePostId] = useState<string | null>(null);

  // Form submission handler
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const proof = carbonProofOptions[selectedProofIndex];
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: "Eco Warrior",
      handle: "@eco_warrior",
      avatar: "EW",
      time: "Just now",
      content: newPostContent,
      proofValue: proof.value > 0 ? proof.value : undefined,
      proofCategory: proof.value > 0 ? proof.category : undefined,
      imageUrl: attachedImageName ? `/scratch/${attachedImageName}` : undefined,
      likes: 0,
      comments: [],
      shares: 0,
      liked: false,
      shared: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedProofIndex(0);
    setAttachedImageName(null);
  };

  // Mock attachment action
  const handleAttachMockImage = () => {
    if (attachedImageName) {
      setAttachedImageName(null);
    } else {
      const mockImages = ["geothermal_setup.png", "solar_proof.png", "bike_commute.png"];
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setAttachedImageName(randomImage);
    }
  };

  // Like action handler
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

  // Share action handler
  const handleShare = (postId: string) => {
    if (expandedSharePostId === postId) {
      setExpandedSharePostId(null);
      setCopiedSharePostId(null);
    } else {
      setExpandedSharePostId(postId);
      setCopiedSharePostId(null);
    }
  };

  const handleCopyLink = (postId: string) => {
    setCopiedSharePostId(postId);
    setPosts(
      posts.map((post) => {
        if (post.id === postId && !post.shared) {
          return { ...post, shared: true, shares: post.shares + 1 };
        }
        return post;
      })
    );
    setTimeout(() => {
      setCopiedSharePostId(null);
      setExpandedSharePostId(null);
    }, 2000);
  };

  // Comment submission handler
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

  const toggleCommentsExpansion = (postId: string) => {
    setExpandedCommentsPostId(expandedCommentsPostId === postId ? null : postId);
  };

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 max-w-3xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[#2D6A4F]/10 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D6A4F] dark:text-[#52B788]">
            Eco Feed
          </h1>
          <p className="text-xxxxs tracking-wider uppercase text-zinc-450 dark:text-[#A0AEC0] mt-1 font-bold">
            Publish verified accomplishments, coordinate green initiatives, and exchange operational carbon tips.
          </p>
        </div>
      </div>

      {/* 1. Post Composer Panel */}
      <div className="rounded-3xl glass-card p-6">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full glass-button font-bold text-xxxxs tracking-wider uppercase text-zinc-800 dark:text-zinc-200">
              EW
            </div>
            <div className="flex-1 space-y-3">
              <textarea
                placeholder="Log your carbon offset event. What eco action did you take today?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full min-h-[80px] resize-none border-none bg-transparent py-2 text-xxs font-bold uppercase tracking-wider text-[#2D3748] outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-650"
              />

              {/* Mock Image Upload Frame preview */}
              {attachedImageName && (
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xxxxs font-bold tracking-wider uppercase text-zinc-550 dark:text-zinc-400 rounded-2xl">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                    Attached Proof: {attachedImageName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAttachedImageName(null)}
                    className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive controls and dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2D6A4F]/5 dark:border-white/5">
            {/* Carbon Proof Tag Selector */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setShowProofDropdown(!showProofDropdown)}
                className="flex w-full items-center justify-between rounded-2xl border border-zinc-200 dark:border-zinc-850 px-4 py-2.5 text-xxxxs font-bold tracking-[0.15em] uppercase text-[#2D6A4F] dark:text-[#52B788] bg-transparent hover:bg-[#2D6A4F] hover:text-white dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" />
                  {carbonProofOptions[selectedProofIndex].label}
                </span>
                <span className="text-zinc-400">▼</span>
              </button>

              {/* Dropdown Options */}
              {showProofDropdown && (
                <div className="absolute top-11 left-0 right-0 z-10 rounded-2xl border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg overflow-hidden">
                  {carbonProofOptions.map((opt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedProofIndex(index);
                        setShowProofDropdown(false);
                      }}
                      className="flex w-full items-center px-4 py-2.5 text-left text-xxxxs font-bold tracking-wider uppercase hover:bg-[#2D6A4F]/10 dark:hover:bg-[#52B788]/10 text-zinc-700 dark:text-zinc-300"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mock Image Upload frame trigger */}
            <button
              type="button"
              onClick={handleAttachMockImage}
              className={`flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-xxxxs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                attachedImageName
                  ? "border-[#2D6A4F]/30 text-[#2D6A4F] dark:text-[#52B788] bg-[#2D6A4F]/5"
                  : "border-zinc-200 dark:border-zinc-800 text-[#2D6A4F] dark:text-[#52B788] hover:bg-[#2D6A4F] hover:text-white dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              {attachedImageName ? "Change Image" : "Attach Image"}
            </button>

            {/* Submit post button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] dark:bg-[#52B788] dark:hover:bg-[#40916C] dark:text-[#0A0F0D] text-white px-6 py-2.5 text-xxxxs font-bold tracking-[0.20em] uppercase transition-all duration-300 cursor-pointer"
            >
              <span>Submit Post</span>
              <CheckCircle2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          const isCommentsOpen = expandedCommentsPostId === post.id;
          const isShareOpen = expandedSharePostId === post.id;

          return (
            <div
              key={post.id}
              className="rounded-3xl glass-card p-6 flex flex-col space-y-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full glass-button font-bold text-xxxxs tracking-wider uppercase text-zinc-850 dark:text-zinc-200">
                    {post.avatar}
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-xxs font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-100">{post.author}</span>
                      <span className="text-xxxxs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-550">{post.handle}</span>
                    </div>
                    <span className="text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mt-0.5">{post.time}</span>
                  </div>
                </div>
                <button className="rounded-full p-1.5 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 glass-button h-7 w-7 flex items-center justify-center shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Card Body content */}
              <p className="text-xxs tracking-wider uppercase leading-relaxed text-zinc-800 dark:text-zinc-250 mt-1">
                {post.content}
              </p>

              {/* Mock image preview if exists */}
              {post.imageUrl && (
                <div className="mt-1 border border-zinc-900/5 dark:border-zinc-100/5 bg-black/[0.02] dark:bg-white/[0.02] p-4 flex flex-col items-center justify-center min-h-[140px] text-center rounded-2xl">
                  <ImageIcon className="h-8 w-8 text-zinc-400 dark:text-zinc-600 mb-2" />
                  <span className="text-xxxxs font-bold tracking-widest uppercase text-zinc-450 dark:text-zinc-550">[ VERIFIED ATTACHMENT: {post.imageUrl.split("/").pop()} ]</span>
                </div>
              )}

              {/* 3. Premium Green 'Carbon Proof Badge' */}
              {post.proofValue && (
                <div className="flex items-center gap-2 rounded-2xl bg-[#2D6A4F]/5 border border-[#2D6A4F]/25 px-4 py-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#2D6A4F] dark:text-[#52B788] shrink-0" />
                  <span className="text-xxxxs font-bold uppercase tracking-[0.15em] text-[#2D6A4F] dark:text-[#52B788]">
                    VERIFIED PROOF BADGE: saved -{post.proofValue}kg CO2 ({post.proofCategory})
                  </span>
                </div>
              )}

              {/* Action Metrics Row */}
              <div className="flex items-center justify-between border-y border-zinc-900/5 dark:border-zinc-100/5 py-3 text-xxxxs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                <span>{post.likes} Likes</span>
                <span>{post.comments.length} Comments • {post.shares} Shares</span>
              </div>

              {/* Interactive buttons */}
              <div className="flex items-center justify-around pb-1">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xxxxs font-bold tracking-[0.20em] uppercase transition-all duration-300 ${
                    post.liked
                      ? "text-[#2D6A4F] dark:text-[#52B788] bg-[#2D6A4F]/10 px-4"
                      : "text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
                  }`}
                >
                  <ThumbsUp className={`h-3.5 w-3.5 ${post.liked ? "fill-[#2D6A4F]/10" : ""}`} />
                  Like
                </button>
                <button
                  onClick={() => toggleCommentsExpansion(post.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xxxxs font-bold tracking-[0.20em] uppercase transition-all duration-300 ${
                    isCommentsOpen
                      ? "text-white bg-[#2D6A4F] px-4 dark:text-[#0A0F0D] dark:bg-[#52B788]"
                      : "text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Comment
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xxxxs font-bold tracking-[0.20em] uppercase transition-all duration-300 ${
                    isShareOpen
                      ? "text-white bg-[#2D6A4F] px-4 dark:text-[#0A0F0D] dark:bg-[#52B788]"
                      : "text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:text-[#52B788] dark:hover:bg-[#52B788] dark:hover:text-[#0A0F0D]"
                  }`}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>

              {/* 4. Share Overlay Trigger */}
              {isShareOpen && (
                <div className="bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 p-4 rounded-2xl transition-all animate-slide-up">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xxxxs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      <LinkIcon className="h-3.5 w-3.5 text-[#2D6A4F] dark:text-[#74C69D]" />
                      Mock URL: https://terracarbon.app/feed/{post.id}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(post.id)}
                      className="rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white dark:bg-[#74C69D] dark:hover:bg-[#2D6A4F] dark:text-zinc-950 dark:hover:text-white px-4 py-2 text-xxxxs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      {copiedSharePostId === post.id ? "✓ Copied!" : "Copy Link"}
                    </button>
                  </div>
                </div>
              )}

              {/* 4. Glassmorphic Comments Overlay Expansion State */}
              {isCommentsOpen && (
                <div className="bg-[#F5F5F5] dark:bg-zinc-900/40 border border-[#2D6A4F]/10 p-4 rounded-2xl space-y-4 transition-all animate-slide-up">
                  <div className="text-xxxxs font-bold uppercase tracking-wider text-[#2D6A4F] dark:text-[#74C69D] pb-2 border-b border-[#2D6A4F]/5 dark:border-white/5">
                    Discussion Thread ({post.comments.length})
                  </div>

                  {post.comments.length > 0 ? (
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                      {post.comments.map((comm) => (
                        <div key={comm.id} className="flex gap-2.5 items-start bg-white/80 dark:bg-zinc-800/40 border border-[#2D6A4F]/5 dark:border-zinc-100/5 rounded-2xl p-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full glass-button text-zinc-700 text-xxxxs font-bold tracking-wider uppercase dark:text-zinc-300">
                            {comm.avatar}
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xxxxs font-bold uppercase tracking-[0.15em] text-[#2D6A4F] dark:text-[#74C69D]">{comm.author}</span>
                              <span className="text-xxxxs text-zinc-400 dark:text-zinc-550">{comm.time}</span>
                            </div>
                            <p className="text-xxxxs tracking-wider uppercase text-zinc-800 dark:text-zinc-300 leading-normal">{comm.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xxxxs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-550 flex items-center justify-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-[#2D6A4F] dark:text-[#74C69D]" />
                      No comments on this post yet.
                    </div>
                  )}

                  {/* Add Comment Input Form */}
                  <form
                    onSubmit={(e) => handleAddComment(post.id, e)}
                    className="flex items-center gap-2 pt-2"
                  >
                    <input
                      type="text"
                      placeholder="Add to the verified offset discussion thread..."
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="w-full rounded-2xl border border-[#2D6A4F]/20 bg-white/80 dark:bg-black/20 px-3 py-2.5 text-xxs font-bold uppercase tracking-wider outline-none transition focus:border-[#2D6A4F] dark:border-zinc-850 dark:text-zinc-200 dark:focus:border-[#74C69D]"
                    />
                    <button
                      type="submit"
                      className="rounded-full border border-[#2D6A4F]/20 bg-transparent p-2.5 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white dark:border-[#74C69D]/20 dark:text-[#74C69D] dark:hover:bg-[#74C69D] dark:hover:text-zinc-950 transition-all duration-300 h-9 w-9 flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
