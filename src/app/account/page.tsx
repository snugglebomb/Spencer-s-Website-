'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types
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

interface User {
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  bio?: string;
  phone?: string;
  major?: string;
  graduationYear?: string;
  stats?: {
    postsCreated: number;
    eventsAttended: number;
    itemsSold: number;
    itemsBought: number;
  };
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

// Sample data - in a real app, this would come from the user's actual activity
const mockUser: User = {
  name: "Alex Student",
  email: "astudent@gmu.edu",
  joinDate: "2024-08-15",
  avatar: "AS",
  stats: {
    postsCreated: 12,
    eventsAttended: 8,
    itemsSold: 3,
    itemsBought: 5
  }
};

const favoriteePosts: Post[] = [
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
  }
];

const registeredEvents: Event[] = [
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
];

const favoriteItems: MarketplaceItem[] = [
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
];

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

export default function AccountPage() {
  const router = useRouter();
  
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  
  // Other State
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Profile & Settings State
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    phone: '',
    major: '',
    graduationYear: '',
  });
  const [settingsData, setSettingsData] = useState({
    notifications: {
      email: true,
      events: true,
      marketplace: false,
      posts: true,
    },
    privacy: {
      publicProfile: true,
      showActivity: true,
      allowMessages: true,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  // Simulate checking for authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would check localStorage, cookies, or make an API call
      // For demo purposes, we'll simulate a brief loading state
      setTimeout(() => {
        const savedUser = localStorage.getItem('gmu_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // Ensure user has stats object with default values
          const userWithStats = {
            ...user,
            stats: user.stats || {
              postsCreated: 0,
              eventsAttended: 0,
              itemsSold: 0,
              itemsBought: 0
            }
          };
          setCurrentUser(userWithStats);
          // Initialize profile data
          setProfileData({
            displayName: userWithStats.name || '',
            email: userWithStats.email || '',
            bio: userWithStats.bio || '',
            phone: userWithStats.phone || '',
            major: userWithStats.major || '',
            graduationYear: userWithStats.graduationYear || '',
          });
        }
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const showNotification = (message: string, type: 'info' | 'success' | 'error' = "info") => {
    setNotification({ message, type, isVisible: true });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleSignIn = (email: string, password: string) => {
    // Simulate sign in
    const userData = { ...mockUser, email };
    setCurrentUser(userData);
    localStorage.setItem('gmu_user', JSON.stringify(userData));
    // Initialize profile data
    setProfileData({
      displayName: userData.name,
      email: userData.email,
      bio: '',
      phone: '',
      major: '',
      graduationYear: '',
    });
    setSignInModalOpen(false);
    showNotification("Welcome back!", "success");
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Simulate sign up
    const userData = { ...mockUser, name, email };
    setCurrentUser(userData);
    localStorage.setItem('gmu_user', JSON.stringify(userData));
    // Initialize profile data
    setProfileData({
      displayName: userData.name,
      email: userData.email,
      bio: '',
      phone: '',
      major: '',
      graduationYear: '',
    });
    setSignUpModalOpen(false);
    showNotification("Account created successfully!", "success");
  };

  // Profile Functions
  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update current user with new profile data
      const updatedUser: User = {
        ...currentUser!,
        name: profileData.displayName,
        email: profileData.email,
        bio: profileData.bio,
        phone: profileData.phone,
        major: profileData.major,
        graduationYear: profileData.graduationYear,
        // Preserve existing stats or use defaults
        stats: currentUser?.stats || {
          postsCreated: 0,
          eventsAttended: 0,
          itemsSold: 0,
          itemsBought: 0
        }
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('gmu_user', JSON.stringify(updatedUser));
      setIsEditing(false);
      showNotification("Profile updated successfully!", "success");
    } catch (error) {
      showNotification("Failed to update profile. Please try again.", "error");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleProfileCancel = () => {
    // Reset to current user data
    setProfileData({
      displayName: currentUser?.name || '',
      email: currentUser?.email || '',
      bio: currentUser?.bio || '',
      phone: currentUser?.phone || '',
      major: currentUser?.major || '',
      graduationYear: currentUser?.graduationYear || '',
    });
    setIsEditing(false);
  };

  // Settings Functions
  const handleNotificationToggle = (setting: string) => {
    setSettingsData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting as keyof typeof prev.notifications]
      }
    }));
    showNotification(`${setting} notifications ${settingsData.notifications[setting as keyof typeof settingsData.notifications] ? 'disabled' : 'enabled'}`, "info");
  };

  const handlePrivacyToggle = (setting: string) => {
    setSettingsData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: !prev.privacy[setting as keyof typeof prev.privacy]
      }
    }));
    showNotification(`${setting} ${settingsData.privacy[setting as keyof typeof settingsData.privacy] ? 'disabled' : 'enabled'}`, "info");
  };

  const handleChangePassword = () => {
    showNotification("Password change functionality would open here", "info");
  };

  const handleExportData = () => {
    showNotification("Data export started. You'll receive an email when ready.", "info");
  };

  const handleDeleteAccount = () => {
    showNotification("Account deletion requires additional verification", "error");
  };

  // Loading state
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

  // If not authenticated, show sign-in prompt
  if (!currentUser) {
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
              <Link href="/account" className="text-emerald-400 font-medium">Account</Link>
            </div>

            {/* Sign In Actions */}
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
          </div>
        </nav>

        {/* Sign In Required Message */}
        <div className="flex items-center justify-center min-h-screen -mt-20">
          <InteractiveCard>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center max-w-md mx-4">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-3xl font-bold text-white mb-4">Sign In Required</h2>
              <p className="text-gray-300 mb-6">
                You need to sign in to access your account page and view your activity.
              </p>
              <div className="space-y-3">
                <ModernButton
                  onClick={() => setSignInModalOpen(true)}
                  className="w-full"
                >
                  Sign In to Your Account
                </ModernButton>
                <ModernButton
                  variant="outline"
                  onClick={() => setSignUpModalOpen(true)}
                  className="w-full"
                >
                  Create New Account
                </ModernButton>
              </div>
            </div>
          </InteractiveCard>
        </div>

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

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "posts", label: "Favorite Posts", icon: "❤️" },
    { id: "events", label: "My Events", icon: "📅" },
    { id: "marketplace", label: "Marketplace", icon: "🛒" },
    { id: "settings", label: "Settings", icon: "⚙️" }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric'
    });
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
            <Link href="/account" className="text-emerald-400 font-medium">Account</Link>
          </div>

          {/* User Profile Dropdown & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
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
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link 
                      href="/mylistings" 
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      📝 My Listings
                    </Link>
                    <Link 
                      href="/favorites" 
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      ❤️ Favorites
                    </Link>
                    <Link 
                      href="/settings" 
                      className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      ⚙️ Settings
                    </Link>
                    <hr className="my-2 border-gray-700" />
                    <button
                      onClick={() => {
                        localStorage.removeItem('gmu_user');
                        setMenuOpen(false);
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
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 py-4 px-6">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Home</Link>
              <Link href="/feed" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Feed</Link>
              <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Events</Link>
              <Link href="/marketplace" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Marketplace</Link>
              <Link href="/account" className="text-emerald-400 font-medium py-2">Account</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <section className="relative px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={200}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              👤 My <span className="text-emerald-400">Account</span>
            </h1>
          </InteractiveCard>
          
          <InteractiveCard delay={400}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Manage your profile, view your activity, and track your engagement across GMU Underground.
            </p>
          </InteractiveCard>
        </div>
      </section>

      {/* Profile Section */}
      <section className="px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={600}>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Section */}
                <div className="lg:w-2/3">
                  <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">{currentUser.avatar}</span>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <h2 className="text-3xl font-bold text-white">{currentUser.name}</h2>
                        <ModernButton
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                          className="text-sm px-3 py-1"
                        >
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </ModernButton>
                      </div>
                      <p className="text-gray-300 mb-2">{currentUser.email}</p>
                      {currentUser.major && <p className="text-gray-400 mb-1">📚 {currentUser.major}</p>}
                      {currentUser.graduationYear && <p className="text-gray-400 mb-1">🎓 Class of {currentUser.graduationYear}</p>}
                      {currentUser.bio && <p className="text-gray-300 mt-3 italic">"{currentUser.bio}"</p>}
                      <p className="text-gray-400 text-sm mt-2">Member since {formatJoinDate(currentUser.joinDate)}</p>
                    </div>
                  </div>

                  {/* Editable Profile Form */}
                  {isEditing && (
                    <div className="mt-8 pt-8 border-t border-gray-700">
                      <h3 className="text-xl font-bold text-white mb-6">✏️ Edit Profile</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Display Name</label>
                          <input
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Major</label>
                          <input
                            type="text"
                            value={profileData.major}
                            onChange={(e) => setProfileData({...profileData, major: e.target.value})}
                            placeholder="e.g., Computer Science"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Graduation Year</label>
                          <input
                            type="text"
                            value={profileData.graduationYear}
                            onChange={(e) => setProfileData({...profileData, graduationYear: e.target.value})}
                            placeholder="e.g., 2026"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            placeholder="Tell us about yourself..."
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">Phone (Optional)</label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            placeholder="(xxx) xxx-xxxx"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <ModernButton
                          onClick={handleProfileSave}
                          disabled={profileSaving}
                          className="flex-1"
                        >
                          {profileSaving ? 'Saving...' : 'Save Changes'}
                        </ModernButton>
                        <ModernButton
                          variant="outline"
                          onClick={handleProfileCancel}
                          disabled={profileSaving}
                        >
                          Cancel
                        </ModernButton>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stats Section */}
                <div className="lg:w-1/3">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">📊 Your Stats</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="bg-gray-700 bg-opacity-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{currentUser.stats?.postsCreated || 0}</div>
                      <div className="text-gray-300 text-sm">Posts Created</div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{currentUser.stats?.eventsAttended || 0}</div>
                      <div className="text-gray-300 text-sm">Events Attended</div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{currentUser.stats?.itemsSold || 0}</div>
                      <div className="text-gray-300 text-sm">Items Sold</div>
                    </div>
                    <div className="bg-gray-700 bg-opacity-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400">{currentUser.stats?.itemsBought || 0}</div>
                      <div className="text-gray-300 text-sm">Items Bought</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
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
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 mb-12">
        <div className="max-w-4xl mx-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <InteractiveCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Account Overview</h3>
              </InteractiveCard>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InteractiveCard delay={300}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">📊</span>
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-300">
                        <span>❤️ Liked a post</span>
                        <span className="text-sm text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>📅 Registered for event</span>
                        <span className="text-sm text-gray-400">1 day ago</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300">
                        <span>🛒 Favorited item</span>
                        <span className="text-sm text-gray-400">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <InteractiveCard delay={400}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="mr-2">🎯</span>
                      Quick Actions
                    </h4>
                    <div className="space-y-3">
                      <ModernButton className="w-full text-sm" onClick={() => router.push('/feed')}>
                        📝 Create New Post
                      </ModernButton>
                      <ModernButton variant="outline" className="w-full text-sm" onClick={() => router.push('/events')}>
                        📅 Browse Events
                      </ModernButton>
                      <ModernButton variant="secondary" className="w-full text-sm" onClick={() => router.push('/marketplace')}>
                        🛒 Sell Something
                      </ModernButton>
                    </div>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          )}

          {/* Favorite Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              <InteractiveCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">❤️ Favorite Posts</h3>
              </InteractiveCard>
              
              {favoriteePosts.length > 0 ? (
                <div className="space-y-4">
                  {favoriteePosts.map((post, index) => (
                    <InteractiveCard key={post.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{post.author[0]}</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{post.author}</div>
                              <div className="text-gray-400 text-sm">{post.timestamp}</div>
                            </div>
                          </div>
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {post.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{post.content}</p>
                        
                        <div className="flex items-center space-x-6 text-gray-400">
                          <div className="flex items-center space-x-2">
                            <span className="text-red-400">❤️</span>
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">💔</div>
                    <h3 className="text-white text-xl font-bold mb-2">No favorite posts yet</h3>
                    <p className="text-gray-400 mb-4">Start liking posts to see them here!</p>
                    <ModernButton onClick={() => router.push('/feed')}>
                      Browse Feed
                    </ModernButton>
                  </div>
                </InteractiveCard>
              )}
            </div>
          )}

          {/* My Events Tab */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <InteractiveCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">📅 My Registered Events</h3>
              </InteractiveCard>
              
              {registeredEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {registeredEvents.map((event, index) => (
                    <InteractiveCard key={event.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {event.category}
                          </span>
                          <div className="text-2xl">{event.image}</div>
                        </div>
                        
                        <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 text-gray-300 text-sm">
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
                        
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">
                              {event.attendeeCount}/{event.maxAttendees} attending
                            </span>
                            <span className="text-emerald-400 text-sm font-medium">✓ Registered</span>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-white text-xl font-bold mb-2">No events registered</h3>
                    <p className="text-gray-400 mb-4">Register for events to see them here!</p>
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
              <InteractiveCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">🛒 Favorite Items</h3>
              </InteractiveCard>
              
              {favoriteItems.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {favoriteItems.map((item, index) => (
                    <InteractiveCard key={item.id} delay={index * 150}>
                      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                            {item.category}
                          </span>
                          <span className="text-red-400">❤️</span>
                        </div>
                        
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-2">{item.images[0]}</div>
                          <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                          <div className="text-2xl font-bold text-emerald-400 mb-2">${item.price}</div>
                          <div className="text-gray-400 text-sm">{item.condition}</div>
                        </div>
                        
                        <div className="text-gray-300 text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>📍 {item.location}</span>
                            <span>📅 {formatDate(item.postedDate)}</span>
                          </div>
                          <div>👤 {item.seller}</div>
                        </div>
                        
                        <div className="mt-4">
                          <ModernButton className="w-full text-sm">
                            💬 Contact Seller
                          </ModernButton>
                        </div>
                      </div>
                    </InteractiveCard>
                  ))}
                </div>
              ) : (
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-white text-xl font-bold mb-2">No favorite items</h3>
                    <p className="text-gray-400 mb-4">Save items you're interested in to see them here!</p>
                    <ModernButton onClick={() => router.push('/marketplace')}>
                      Browse Marketplace
                    </ModernButton>
                  </div>
                </InteractiveCard>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <InteractiveCard delay={200}>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">⚙️ Account Settings</h3>
              </InteractiveCard>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InteractiveCard delay={300}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">👤 Quick Profile Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Display Name</label>
                        <input
                          type="text"
                          value={profileData.displayName}
                          onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                        />
                      </div>
                      <ModernButton 
                        className="w-full" 
                        onClick={handleProfileSave}
                        disabled={profileSaving}
                      >
                        {profileSaving ? 'Saving...' : 'Save Changes'}
                      </ModernButton>
                    </div>
                  </div>
                </InteractiveCard>
                
                <InteractiveCard delay={400}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">🔔 Notifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Email notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.notifications.email}
                            onChange={() => handleNotificationToggle('email')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Event reminders</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.notifications.events}
                            onChange={() => handleNotificationToggle('events')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New marketplace items</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.notifications.marketplace}
                            onChange={() => handleNotificationToggle('marketplace')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Post interactions</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.notifications.posts}
                            onChange={() => handleNotificationToggle('posts')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <InteractiveCard delay={500}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">🔒 Privacy Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Public profile</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.privacy.publicProfile}
                            onChange={() => handlePrivacyToggle('publicProfile')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Show activity status</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.privacy.showActivity}
                            onChange={() => handlePrivacyToggle('showActivity')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Allow direct messages</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settingsData.privacy.allowMessages}
                            onChange={() => handlePrivacyToggle('allowMessages')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
                
                <InteractiveCard delay={600}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">⚠️ Account Actions</h4>
                    <div className="space-y-3">
                      <ModernButton 
                        variant="outline" 
                        className="w-full text-sm"
                        onClick={handleChangePassword}
                      >
                        🔄 Change Password
                      </ModernButton>
                      <ModernButton 
                        variant="outline" 
                        className="w-full text-sm"
                        onClick={handleExportData}
                      >
                        📤 Export Data
                      </ModernButton>
                      <ModernButton 
                        variant="secondary" 
                        className="w-full text-sm text-red-400 hover:text-red-300"
                        onClick={handleDeleteAccount}
                      >
                        🗑️ Delete Account
                      </ModernButton>
                    </div>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Click handler to close mobile menu */}
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
