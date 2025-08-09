'use client';
import Link from "next/link";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types
interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  time: string;
  likes: number;
  comments: number;
  trending: boolean;
  author: string;
}

interface User {
  name: string;
  email: string;
}

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface ModernButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

interface NotificationProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

// Sample feed data
const feedPosts: Post[] = [
  { 
    id: 1, 
    title: "Free Pizza in SUB 1!", 
    content: "Hey everyone! There's free pizza available in the Student Union Building room 1. First come, first served. It's from the Programming Club event that just ended.",
    category: "Food", 
    time: "2 hours ago", 
    likes: 47, 
    comments: 23, 
    trending: true,
    author: "Alex M."
  },
  { 
    id: 2, 
    title: "Study Group for CS310 - Data Structures", 
    content: "Looking for people to join a study group for CS310. We meet every Tuesday and Thursday at 7 PM in the library. Currently preparing for the midterm exam.",
    category: "Academic", 
    time: "3 hours ago", 
    likes: 28, 
    comments: 15, 
    trending: false,
    author: "Sarah K."
  },
  { 
    id: 3, 
    title: "Lost AirPods in Engineering Building", 
    content: "I lost my AirPods Pro somewhere in the Engineering Building yesterday around 3 PM. They're in a black case with a small 'GMU' sticker. Please contact me if found!",
    category: "Lost & Found", 
    time: "5 hours ago", 
    likes: 12, 
    comments: 8, 
    trending: false,
    author: "Mike R."
  },
  { 
    id: 4, 
    title: "Basketball Pickup Game Tonight!", 
    content: "We're organizing a pickup basketball game tonight at 8 PM at the RAC courts. All skill levels welcome. Just bring yourself and some water!",
    category: "Sports", 
    time: "6 hours ago", 
    likes: 35, 
    comments: 19, 
    trending: true,
    author: "Jordan T."
  },
  { 
    id: 5, 
    title: "Textbooks for Sale - CHEAP!", 
    content: "Selling textbooks for Math 125, Chem 211, and Hist 100. All in excellent condition, way cheaper than the bookstore. DM me for prices and photos.",
    category: "Marketplace", 
    time: "8 hours ago", 
    likes: 22, 
    comments: 12, 
    trending: false,
    author: "Emma L."
  },
  { 
    id: 6, 
    title: "Live Music at Horizon Hall Tonight", 
    content: "There's going to be live acoustic music outside Horizon Hall starting at 7 PM. Local student bands performing. Great way to unwind after classes!",
    category: "Entertainment", 
    time: "10 hours ago", 
    likes: 41, 
    comments: 17, 
    trending: true,
    author: "Music Society"
  }
];

const categories = ["All", "Food", "Academic", "Lost & Found", "Sports", "Marketplace", "Entertainment"];

// Interactive Card Component
const InteractiveCard = ({ children, className = "", delay = 0 }: InteractiveCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

// Modern Button Component
const ModernButton = ({ children, variant = "primary", onClick, className = "", disabled = false, type = "button" }: ModernButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/25",
    secondary: "bg-gray-800 hover:bg-black text-white shadow-lg hover:shadow-gray-800/25",
    outline: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Search Component
const SearchBar = ({ onSearch, placeholder = "Search posts..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-105' : ''}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 bg-gray-900 text-white rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition-all duration-300"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </form>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Notification Component
const Notification = ({ message, type = "info", isVisible, onClose }: NotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-emerald-500" : type === "error" ? "bg-red-500" : "bg-gray-700";

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function FeedPage() {
  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(feedPosts);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [likedPosts, setLikedPosts] = useState(new Set<number>());

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = feedPosts;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  // Handle post interaction
  const handleLikePost = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      showNotification("Post unliked", "info");
    } else {
      newLikedPosts.add(postId);
      showNotification("Post liked!", "success");
    }
    setLikedPosts(newLikedPosts);
  };

  const showNotification = (message: string, type: 'info' | 'success' | 'error' = "info") => {
    setNotification({ message, type, isVisible: true });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleSignIn = (email: string, password: string) => {
    setCurrentUser({ name: "Student", email });
    setSignInModalOpen(false);
    showNotification("Welcome back!", "success");
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    setCurrentUser({ name, email });
    setSignUpModalOpen(false);
    showNotification("Account created successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-gray-500 relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-12">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-white font-bold text-xl">GMUnderground</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Home</Link>
            <Link href="/feed" className="text-emerald-400 font-medium">Feed</Link>
            <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Events</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Marketplace</Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccountOpen(!accountOpen);
                  }}
                  className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{currentUser.name[0]}</span>
                  </div>
                  <span className="text-white">{currentUser.name}</span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                    <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      Settings
                    </button>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        setAccountOpen(false);
                        showNotification("Signed out successfully", "info");
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <ModernButton
                  variant="outline"
                  onClick={() => setSignInModalOpen(true)}
                  className="hidden sm:inline-flex"
                >
                  Sign In
                </ModernButton>
                <ModernButton onClick={() => setSignUpModalOpen(true)}>
                  Sign Up
                </ModernButton>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 py-4 px-6">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Home</Link>
              <Link href="/feed" className="text-emerald-400 font-medium py-2">Feed</Link>
              <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Events</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Marketplace</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <section className="relative px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={200}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              📰 <span className="text-emerald-400">Feed</span>
            </h1>
          </InteractiveCard>
          
          <InteractiveCard delay={400}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest posts, announcements, and discussions from the GMU community.
            </p>
          </InteractiveCard>

          <InteractiveCard delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <SearchBar onSearch={setSearchTerm} placeholder="Search posts..." />
              <ModernButton
                onClick={() => setPostModalOpen(true)}
                className="whitespace-nowrap"
              >
                ✏️ New Post
              </ModernButton>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <InteractiveCard key={category} delay={index * 100}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Feed Posts */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <InteractiveCard key={post.id} delay={index * 100}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{post.author[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{post.author}</div>
                          <div className="text-gray-400 text-sm">{post.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        {post.trending && (
                          <div className="text-orange-400 animate-pulse">🔥</div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-xl mb-3">{post.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{post.content}</p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div className="flex space-x-6">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 transition-colors duration-200 ${
                            likedPosts.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={likedPosts.has(post.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="font-medium">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span className="font-medium">Share</span>
                        </button>
                      </div>
                      <ModernButton className="text-sm">View Details</ModernButton>
                    </div>
                  </div>
                </InteractiveCard>
              ))
            ) : (
              <InteractiveCard>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-white text-xl font-bold mb-2">No posts found</h3>
                  <p className="text-gray-400">Try adjusting your search or category filter.</p>
                </div>
              </InteractiveCard>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      {/* Sign In Modal */}
      <Modal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} title="Sign In">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;
          if (email && password) {
            handleSignIn(email, password);
          }
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="your@gmu.edu"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>
            <ModernButton type="submit" className="w-full">Sign In</ModernButton>
          </div>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={signUpModalOpen} onClose={() => setSignUpModalOpen(false)} title="Create Account">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name') as string;
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;
          if (name && email && password) {
            handleSignUp(name, email, password);
          }
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">GMU Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="your@gmu.edu"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>
            <ModernButton type="submit" className="w-full">Create Account</ModernButton>
          </div>
        </form>
      </Modal>

      {/* Create Post Modal */}
      <Modal isOpen={postModalOpen} onClose={() => setPostModalOpen(false)} title="Create New Post">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setPostModalOpen(false);
          showNotification("Post created successfully!", "success");
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
              <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200">
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="What's happening?"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Tell us more..."
              ></textarea>
            </div>
            <ModernButton type="submit" className="w-full">Create Post</ModernButton>
          </div>
        </form>
      </Modal>

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />

      {/* Click handler to close dropdowns */}
      <div
        className="fixed inset-0 z-0"
        onClick={() => {
          setMenuOpen(false);
          setAccountOpen(false);
        }}
        style={{ pointerEvents: menuOpen || accountOpen ? 'auto' : 'none' }}
      />
    </div>
  );
}