'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode } from "react";

// Types (reusing from account page)
interface User {
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  bio?: string;
  phone?: string;
  major?: string;
  graduationYear?: string;
  stats: {
    postsCreated: number;
    eventsAttended: number;
    itemsSold: number;
    itemsBought: number;
  };
}

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  attendeeCount: number;
  maxAttendees: number;
  isFeatured: boolean;
  image: string;
}

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  images: string[];
  postedDate: string;
  location: string;
  isFeatured: boolean;
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

interface NotificationProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

// Components
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
      } ${
        isHovered ? 'scale-[1.02] shadow-2xl shadow-emerald-500/20' : 'scale-100'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

const ModernButton = ({ children, variant = 'primary', onClick, className = "", disabled = false, type = 'button' }: ModernButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25",
    secondary: "bg-gray-700 text-white hover:bg-gray-600 shadow-lg shadow-gray-700/25",
    outline: "border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
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

const Notification = ({ message, type = 'info', isVisible, onClose }: NotificationProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const colors = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    error: 'bg-red-500'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

export default function FavoritesPage() {
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });

  // Sample favorite data (would come from user's saved items in real app)
  const [favoritePosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah K.",
      content: "Just finished my CS 310 final! Anyone else feel like that was way harder than expected? 😅 At least we're done with data structures for now...",
      timestamp: "2 hours ago",
      likes: 23,
      comments: 8,
      category: "Academic",
      isLiked: true
    },
    {
      id: 2,
      author: "Mike R.",
      content: "Beautiful sunset at Mason Pond today! 🌅 Sometimes we forget how lucky we are to have such a nice campus. Perfect study break spot.",
      timestamp: "1 day ago",
      likes: 45,
      comments: 12,
      category: "Campus Life",
      isLiked: true
    },
    {
      id: 3,
      author: "Jessica L.",
      content: "Study group for Statistics tomorrow at 3 PM in the library! We're covering hypothesis testing. All welcome! 📊",
      timestamp: "2 days ago",
      likes: 18,
      comments: 6,
      category: "Study Groups",
      isLiked: true
    }
  ]);

  const [favoriteEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Fall Career Fair 2025",
      description: "Connect with top employers and explore internship and full-time opportunities.",
      date: "2025-09-15",
      time: "10:00 AM - 4:00 PM",
      location: "Johnson Center",
      category: "Career",
      organizer: "Career Services",
      attendeeCount: 245,
      maxAttendees: 500,
      isFeatured: true,
      image: "💼"
    },
    {
      id: 2,
      title: "HackGMU 2025",
      description: "48-hour hackathon bringing together students from all majors to build innovative solutions.",
      date: "2025-11-08",
      time: "6:00 PM Friday - 6:00 PM Sunday",
      location: "Engineering Building",
      category: "Tech",
      organizer: "ACM Student Chapter",
      attendeeCount: 89,
      maxAttendees: 150,
      isFeatured: true,
      image: "💻"
    }
  ]);

  const [favoriteItems] = useState<MarketplaceItem[]>([
    {
      id: 1,
      title: "iPhone 14 Pro - Excellent Condition",
      description: "Selling my iPhone 14 Pro in excellent condition. Always kept in a case with screen protector.",
      price: 850,
      category: "Electronics",
      condition: "Excellent",
      seller: "Alex M.",
      images: ["📱"],
      postedDate: "2025-08-05",
      location: "Campus",
      isFeatured: true
    },
    {
      id: 2,
      title: "Gaming Laptop - ASUS ROG Strix",
      description: "ASUS ROG Strix gaming laptop with RTX 3070, 16GB RAM, 1TB SSD.",
      price: 1200,
      category: "Electronics",
      condition: "Like New",
      seller: "Mike R.",
      images: ["💻"],
      postedDate: "2025-08-02",
      location: "Student Apartments",
      isFeatured: true
    }
  ]);

  useEffect(() => {
    const checkAuth = () => {
      setTimeout(() => {
        const savedUser = localStorage.getItem('gmu_user');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
      }, 500);
    };
    checkAuth();
  }, []);

  const showNotification = (message: string, type: 'info' | 'success' | 'error' = "info") => {
    setNotification({ message, type, isVisible: true });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleRemoveFavorite = (type: string, id: number) => {
    showNotification(`Removed from ${type} favorites!`, "success");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-500 flex items-center justify-center">
        <InteractiveCard>
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center max-w-md mx-4">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Sign In Required</h2>
            <p className="text-gray-300 mb-6">
              You need to sign in to view your favorites.
            </p>
            <Link href="/account">
              <ModernButton className="w-full">
                Go to Account Page
              </ModernButton>
            </Link>
          </div>
        </InteractiveCard>
      </div>
    );
  }

  const tabs = [
    { id: "posts", label: "📝 Posts", count: favoritePosts.length },
    { id: "events", label: "📅 Events", count: favoriteEvents.length },
    { id: "marketplace", label: "🛒 Items", count: favoriteItems.length }
  ];

  return (
    <div className="min-h-screen bg-gray-500 relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #059669 0%, transparent 50%)`,
          backgroundSize: '200px 200px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-12">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-white font-bold text-xl">GMUnderground</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Home</Link>
            <Link href="/feed" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Feed</Link>
            <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Events</Link>
            <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Marketplace</Link>
            <Link href="/favorites" className="text-emerald-400 font-medium">Favorites</Link>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{currentUser.avatar}</span>
              </div>
              <span className="text-white">{currentUser.name}</span>
              <span className={`text-white transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="py-2">
                  <Link href="/profile" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    👤 Profile
                  </Link>
                  <Link href="/mylistings" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    📝 My Listings
                  </Link>
                  <Link href="/favorites" className="block px-4 py-2 text-emerald-400 hover:bg-gray-700 transition-colors duration-200">
                    ❤️ Favorites
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    ⚙️ Settings
                  </Link>
                  <hr className="my-2 border-gray-700" />
                  <button
                    onClick={() => {
                      localStorage.removeItem('gmu_user');
                      router.push('/');
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <InteractiveCard delay={300}>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ❤️ Your Favorites
              </h1>
              <p className="text-gray-300 text-lg">
                All your saved posts, events, and marketplace items in one place
              </p>
            </div>
          </InteractiveCard>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {tabs.map((tab, index) => (
              <InteractiveCard key={tab.id} delay={index * 50}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white text-emerald-500' : 'bg-gray-700 text-gray-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              </InteractiveCard>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              {favoritePosts.length > 0 ? (
                <div className="space-y-6">
                  {favoritePosts.map((post, index) => (
                    <InteractiveCard key={post.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{post.author[0]}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{post.author}</h4>
                              <span className="text-gray-400 text-sm">{post.timestamp}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                              {post.category}
                            </span>
                            <button
                              onClick={() => handleRemoveFavorite('post', post.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              ❤️
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-white mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-4 text-gray-400">
                          <span className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </span>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-white text-xl font-bold mb-2">No favorite posts</h3>
                    <p className="text-gray-400 mb-4">Start liking posts to see them here!</p>
                    <ModernButton onClick={() => router.push('/feed')}>
                      Browse Posts
                    </ModernButton>
                  </div>
                </InteractiveCard>
              )}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {favoriteEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {favoriteEvents.map((event, index) => (
                    <InteractiveCard key={event.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-4xl">{event.image}</span>
                            <button
                              onClick={() => handleRemoveFavorite('event', event.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              ❤️
                            </button>
                          </div>
                        </div>
                        
                        <h4 className="text-white font-bold text-xl mb-2">{event.title}</h4>
                        <p className="text-gray-300 mb-4">{event.description}</p>
                        
                        <div className="space-y-2 text-gray-400 text-sm mb-4">
                          <div className="flex items-center space-x-2">
                            <span>📅</span>
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>⏰</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">
                            {event.attendeeCount}/{event.maxAttendees} attending
                          </span>
                          <ModernButton className="text-sm">
                            Register
                          </ModernButton>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-white text-xl font-bold mb-2">No favorite events</h3>
                    <p className="text-gray-400 mb-4">Save events you're interested in!</p>
                    <ModernButton onClick={() => router.push('/events')}>
                      Browse Events
                    </ModernButton>
                  </div>
                </InteractiveCard>
              )}
            </div>
          )}

          {/* Marketplace Tab */}
          {activeTab === "marketplace" && (
            <div className="space-y-6">
              {favoriteItems.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteItems.map((item, index) => (
                    <InteractiveCard key={item.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {item.category}
                          </span>
                          <button
                            onClick={() => handleRemoveFavorite('item', item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            ❤️
                          </button>
                        </div>
                        
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-2">{item.images[0]}</div>
                          <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                          <div className="text-2xl font-bold text-emerald-400 mb-2">${item.price}</div>
                          <div className="text-gray-400 text-sm">{item.condition}</div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                          <span>👤 {item.seller}</span>
                          <span>📍 {item.location}</span>
                        </div>
                        
                        <ModernButton className="w-full text-sm">
                          Contact Seller
                        </ModernButton>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-white text-xl font-bold mb-2">No favorite items</h3>
                    <p className="text-gray-400 mb-4">Save marketplace items you're interested in!</p>
                    <ModernButton onClick={() => router.push('/marketplace')}>
                      Browse Marketplace
                    </ModernButton>
                  </div>
                </InteractiveCard>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Click handler to close dropdown */}
      <div
        className="fixed inset-0 z-0"
        onClick={() => setMenuOpen(false)}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </div>
  );
}
