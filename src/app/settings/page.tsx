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

export default function SettingsPage() {
  const router = useRouter();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  
  // Settings State
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
    theme: {
      darkMode: true,
      compactView: false,
    }
  });

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

  const handleThemeToggle = (setting: string) => {
    setSettingsData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [setting]: !prev.theme[setting as keyof typeof prev.theme]
      }
    }));
    showNotification(`${setting} ${settingsData.theme[setting as keyof typeof settingsData.theme] ? 'disabled' : 'enabled'}`, "info");
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

  const handleClearCache = () => {
    showNotification("Cache cleared successfully!", "success");
  };

  const handleResetSettings = () => {
    setSettingsData({
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
      theme: {
        darkMode: true,
        compactView: false,
      }
    });
    showNotification("Settings reset to defaults", "info");
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
              You need to sign in to access settings.
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
            <Link href="/settings" className="text-emerald-400 font-medium">Settings</Link>
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
                  <Link href="/favorites" className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                    ❤️ Favorites
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-emerald-400 hover:bg-gray-700 transition-colors duration-200">
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

      {/* Settings Content */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <InteractiveCard delay={300}>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                ⚙️ Settings
              </h1>
              <p className="text-gray-300 text-lg">
                Customize your GMUnderground experience
              </p>
            </div>
          </InteractiveCard>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Notifications Settings */}
            <InteractiveCard delay={400}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  🔔 Notifications
                </h4>
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

            {/* Privacy Settings */}
            <InteractiveCard delay={500}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  🔒 Privacy
                </h4>
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

            {/* Theme Settings */}
            <InteractiveCard delay={600}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  🎨 Appearance
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Dark mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settingsData.theme.darkMode}
                        onChange={() => handleThemeToggle('darkMode')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Compact view</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settingsData.theme.compactView}
                        onChange={() => handleThemeToggle('compactView')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </InteractiveCard>

            {/* Account Actions */}
            <InteractiveCard delay={700}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  ⚠️ Account Actions
                </h4>
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

            {/* App Settings */}
            <InteractiveCard delay={800}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  📱 App Settings
                </h4>
                <div className="space-y-3">
                  <ModernButton 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={handleClearCache}
                  >
                    🧹 Clear Cache
                  </ModernButton>
                  <ModernButton 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={handleResetSettings}
                  >
                    🔄 Reset Settings
                  </ModernButton>
                  <ModernButton 
                    variant="outline" 
                    className="w-full text-sm"
                    onClick={() => showNotification("Help & Support coming soon!", "info")}
                  >
                    ❓ Help & Support
                  </ModernButton>
                </div>
              </div>
            </InteractiveCard>

            {/* About */}
            <InteractiveCard delay={900}>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  ℹ️ About
                </h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span>1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span>Aug 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span>GMU Web</span>
                  </div>
                  <hr className="border-gray-700" />
                  <div className="text-center">
                    <ModernButton 
                      variant="outline" 
                      className="text-xs px-4 py-2"
                      onClick={() => showNotification("Made with ❤️ for GMU students!", "info")}
                    >
                      💙 GMU Underground
                    </ModernButton>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
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
