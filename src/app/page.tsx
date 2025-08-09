'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types
interface Post {
  id: number;
  title: string;
  category: string;
  time: string;
  likes: number;
  comments: number;
  trending: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
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

// Sample data for dynamic content
const samplePosts: Post[] = [
  { id: 1, title: "Free Pizza in SUB 1!", category: "Food", time: "2 hours ago", likes: 24, comments: 8, trending: true },
  { id: 2, title: "5v5 Basketball at RAC", category: "Sports", time: "4 hours ago", likes: 15, comments: 3, trending: false },
  { id: 3, title: "Live Music near Horizon Hall", category: "Entertainment", time: "6 hours ago", likes: 31, comments: 12, trending: true },
  { id: 4, title: "Study Group for CS310", category: "Academic", time: "8 hours ago", likes: 18, comments: 6, trending: false },
  { id: 5, title: "Lost AirPods in Library", category: "Lost & Found", time: "10 hours ago", likes: 5, comments: 2, trending: false },
  { id: 6, title: "Textbook Sale - Cheap!", category: "Marketplace", time: "12 hours ago", likes: 22, comments: 9, trending: true }
];

const upcomingEvents: Event[] = [
  { id: 1, title: "Spring Career Fair", date: "March 15", location: "Student Union", attendees: 156 },
  { id: 2, title: "GMU Gaming Tournament", date: "March 18", location: "JC Room 101", attendees: 89 },
  { id: 3, title: "International Food Festival", date: "March 22", location: "Quad", attendees: 243 }
];

const categories = ["All", "Food", "Sports", "Entertainment", "Academic", "Lost & Found", "Marketplace"];

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
const SearchBar = ({ onSearch, placeholder = "Search GMUnderground..." }: SearchBarProps) => {
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

export default function HomePage() {
  const router = useRouter();
  
  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(samplePosts);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [likedPosts, setLikedPosts] = useState(new Set<number>());

  // Typewriter effect for hero text
  const [heroText, setHeroText] = useState("");
  const fullHeroText = "Welcome to GMUnderground";
  const [heroIndex, setHeroIndex] = useState(0);

  // Check for authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('gmu_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        // Clear invalid user data
        localStorage.removeItem('gmu_user');
      }
    }
  }, []);

  useEffect(() => {
    if (heroIndex < fullHeroText.length) {
      const timer = setTimeout(() => {
        setHeroText(prev => prev + fullHeroText[heroIndex]);
        setHeroIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [heroIndex]);

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = samplePosts;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    // Simulate sign in
    const userData = { 
      name: "Student", 
      email, 
      joinDate: "2023-09-01",
      avatar: "S"
    };
    setCurrentUser(userData);
    localStorage.setItem('gmu_user', JSON.stringify(userData));
    setSignInModalOpen(false);
    showNotification("Welcome back! Redirecting to your account...", "success");
    // Redirect to account page after login
    setTimeout(() => {
      router.push('/account');
    }, 1500);
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Simulate sign up
    const userData = { 
      name, 
      email, 
      joinDate: new Date().toISOString().split('T')[0],
      avatar: name[0].toUpperCase()
    };
    setCurrentUser(userData);
    localStorage.setItem('gmu_user', JSON.stringify(userData));
    setSignUpModalOpen(false);
    showNotification("Account created successfully! Redirecting to your account...", "success");
    // Redirect to account page after signup
    setTimeout(() => {
      router.push('/account');
    }, 1500);
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
            <Link href="/feed" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Feed</Link>
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
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                    <Link href="/account" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      🏠 Account Dashboard
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      👤 Profile
                    </Link>
                    <Link href="/mylistings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      📝 My Listings
                    </Link>
                    <Link href="/favorites" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      ❤️ Favorites
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      ⚙️ Settings
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={() => {
                        localStorage.removeItem('gmu_user');
                        setCurrentUser(null);
                        setAccountOpen(false);
                        showNotification("Signed out successfully", "info");
                      }}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors duration-200"
                    >
                      🚪 Sign Out
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
              <Link href="/feed" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Feed</Link>
              <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Events</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Marketplace</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={200}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              🎓 <span className="text-emerald-400">{heroText}</span>
              <span className="animate-pulse">|</span>
            </h1>
          </InteractiveCard>
          
          <InteractiveCard delay={600}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The ultimate student-powered hub for events, services, marketplace, and everything happening beneath the surface at GMU.
            </p>
          </InteractiveCard>

          <InteractiveCard delay={1000}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <SearchBar onSearch={setSearchTerm} />
              <ModernButton
                onClick={() => setPostModalOpen(true)}
                className="whitespace-nowrap"
              >
                📝 Create Post
              </ModernButton>
            </div>
          </InteractiveCard>

          {/* Stats Cards */}
          <InteractiveCard delay={1400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">2,547</div>
                <div className="text-gray-300">Active Students</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">1,234</div>
                <div className="text-gray-300">Posts This Week</div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">89</div>
                <div className="text-gray-300">Events This Month</div>
              </div>
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

      {/* Trending Posts */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🔥 Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.slice(0, 6).map((post, index) => (
              <InteractiveCard key={post.id} delay={index * 200}>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    {post.trending && (
                      <div className="text-orange-400 animate-pulse">🔥</div>
                    )}
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-3">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{post.time}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          likedPosts.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={likedPosts.has(post.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-emerald-400 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm">
                      View
                    </button>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">📅 Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <InteractiveCard key={event.id} delay={index * 200}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center">
                  <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                  <p className="text-emerald-400 font-medium mb-2">{event.date}</p>
                  <p className="text-gray-400 mb-4">{event.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">{event.attendees} attending</span>
                    <ModernButton className="text-sm">Join Event</ModernButton>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={200}>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
              <p className="text-emerald-100 mb-6">Join thousands of GMU students sharing, connecting, and discovering.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/feed">
                  <ModernButton variant="secondary" className="w-full sm:w-auto">
                    📰 Browse Feed
                  </ModernButton>
                </Link>
                <Link href="/events">
                  <ModernButton variant="secondary" className="w-full sm:w-auto">
                    📅 View Events
                  </ModernButton>
                </Link>
                <Link href="/marketplace">
                  <ModernButton variant="secondary" className="w-full sm:w-auto">
                    💰 Visit Marketplace
                  </ModernButton>
                </Link>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 backdrop-blur-sm px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-white font-bold text-lg">GMUnderground</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate student platform for GMU community.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/feed" className="hover:text-emerald-400 transition-colors duration-200">Feed</Link></li>
                <li><Link href="/events" className="hover:text-emerald-400 transition-colors duration-200">Events</Link></li>
                <li><Link href="/marketplace" className="hover:text-emerald-400 transition-colors duration-200">Marketplace</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />
          
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 GMUnderground. All rights reserved. Made with ❤️ for GMU students.</p>
          </div>
        </div>
      </footer>

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
        <form onSubmit={(e) => {
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
              <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
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