'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types (shared with account page)
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

export default function ProfilePage() {
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  
  // Profile State
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    bio: '',
    phone: '',
    major: '',
    graduationYear: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setTimeout(() => {
        try {
          const savedUser = localStorage.getItem('gmu_user');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user && user.name && user.email) {
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
              setProfileData({
                displayName: userWithStats.name || '',
                email: userWithStats.email || '',
                bio: userWithStats.bio || '',
                phone: userWithStats.phone || '',
                major: userWithStats.major || '',
                graduationYear: userWithStats.graduationYear || '',
              });
            }
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('gmu_user');
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

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleProfileSave = async () => {
    if (!currentUser) return;
    
    setProfileSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedUser: User = {
        ...currentUser,
        name: profileData.displayName,
        email: profileData.email,
        bio: profileData.bio,
        phone: profileData.phone,
        major: profileData.major,
        graduationYear: profileData.graduationYear,
        // Preserve existing stats or use defaults
        stats: currentUser.stats || {
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
              You need to sign in to access your profile.
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
            <Link href="/profile" className="text-emerald-400 font-medium">Profile</Link>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{currentUser?.avatar || 'U'}</span>
              </div>
              <span className="text-white">{currentUser?.name || 'User'}</span>
              <span className={`text-white transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                <div className="py-2">
                  <Link href="/profile" className="block px-4 py-2 text-emerald-400 hover:bg-gray-700 transition-colors duration-200">
                    👤 Profile
                  </Link>
                  <Link href="/mylistings" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    📝 My Listings
                  </Link>
                  <Link href="/favorites" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
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

      {/* Profile Content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={300}>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                👤 Your Profile
              </h1>
              <p className="text-gray-300 text-lg">
                Manage your personal information and academic details
              </p>
            </div>
          </InteractiveCard>

          <InteractiveCard delay={600}>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Section */}
                <div className="lg:w-2/3">
                  <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                    {/* Avatar */}
                    <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">{currentUser?.avatar || 'U'}</span>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                        <h2 className="text-3xl font-bold text-white">{currentUser?.name || 'User'}</h2>
                        <ModernButton
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                          className="text-sm px-3 py-1"
                        >
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </ModernButton>
                      </div>
                      <p className="text-gray-300 mb-2">{currentUser?.email || ''}</p>
                      {currentUser?.major && <p className="text-gray-400 mb-1">📚 {currentUser.major}</p>}
                      {currentUser?.graduationYear && <p className="text-gray-400 mb-1">🎓 Class of {currentUser.graduationYear}</p>}
                      {currentUser?.phone && <p className="text-gray-400 mb-1">📞 {currentUser.phone}</p>}
                      {currentUser?.bio && <p className="text-gray-300 mt-3 italic">"{currentUser.bio}"</p>}
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
