'use client';
import Link from "next/link";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types
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
  isRegistered: boolean;
  image: string;
  tags: string[];
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

// Sample events data
const eventsData: Event[] = [
  {
    id: 1,
    title: "Fall Career Fair 2025",
    description: "Connect with top employers and explore internship and full-time opportunities. Over 150 companies will be present, including tech giants, local businesses, and startups.",
    date: "2025-09-15",
    time: "10:00 AM - 4:00 PM",
    location: "Johnson Center",
    category: "Career",
    organizer: "Career Services",
    attendeeCount: 245,
    maxAttendees: 500,
    isFeatured: true,
    isRegistered: false,
    image: "💼",
    tags: ["networking", "jobs", "internships"]
  },
  {
    id: 2,
    title: "GMU Homecoming 2025",
    description: "Join us for the annual GMU Homecoming celebration! Football game, alumni events, live music, food trucks, and campus tours. Show your Patriot pride!",
    date: "2025-10-12",
    time: "12:00 PM - 8:00 PM",
    location: "EagleBank Arena & Quad",
    category: "Social",
    organizer: "Alumni Association",
    attendeeCount: 1250,
    maxAttendees: 2000,
    isFeatured: true,
    isRegistered: false,
    image: "🏈",
    tags: ["homecoming", "football", "alumni", "tradition"]
  },
  {
    id: 3,
    title: "HackGMU 2025",
    description: "48-hour hackathon bringing together students from all majors to build innovative solutions. Workshops, mentorship, prizes, and lots of free food!",
    date: "2025-11-08",
    time: "6:00 PM Friday - 6:00 PM Sunday",
    location: "Engineering Building",
    category: "Tech",
    organizer: "ACM Student Chapter",
    attendeeCount: 89,
    maxAttendees: 150,
    isFeatured: true,
    isRegistered: false,
    image: "💻",
    tags: ["coding", "innovation", "competition", "tech"]
  },
  {
    id: 4,
    title: "International Food Festival",
    description: "Celebrate diversity with food from around the world! Student organizations will showcase traditional dishes from their cultures. Live performances included.",
    date: "2025-09-28",
    time: "5:00 PM - 9:00 PM",
    location: "North Plaza",
    category: "Cultural",
    organizer: "International Student Association",
    attendeeCount: 156,
    maxAttendees: 300,
    isFeatured: false,
    isRegistered: false,
    image: "🌍",
    tags: ["food", "culture", "diversity", "international"]
  },
  {
    id: 5,
    title: "Mental Health Awareness Week",
    description: "Week-long series of workshops, panel discussions, and activities focused on mental health and wellness. Free stress-relief activities and resources.",
    date: "2025-10-21",
    time: "Various Times",
    location: "Multiple Locations",
    category: "Wellness",
    organizer: "Counseling Center",
    attendeeCount: 67,
    maxAttendees: 200,
    isFeatured: false,
    isRegistered: false,
    image: "🧠",
    tags: ["wellness", "mental health", "support", "awareness"]
  },
  {
    id: 6,
    title: "Spring Concert Series",
    description: "Live music performances by student bands and special guest artists. Multiple genres including rock, jazz, hip-hop, and acoustic sets.",
    date: "2025-04-18",
    time: "7:00 PM - 11:00 PM",
    location: "Mason Pond Amphitheater",
    category: "Entertainment",
    organizer: "Program Board",
    attendeeCount: 203,
    maxAttendees: 400,
    isFeatured: false,
    isRegistered: false,
    image: "🎵",
    tags: ["music", "concert", "entertainment", "live"]
  },
  {
    id: 7,
    title: "Entrepreneurship Pitch Competition",
    description: "Students present their startup ideas to a panel of judges including successful entrepreneurs and investors. Cash prizes and mentorship opportunities available.",
    date: "2025-03-22",
    time: "2:00 PM - 6:00 PM",
    location: "Innovation Hall",
    category: "Career",
    organizer: "Entrepreneurship Center",
    attendeeCount: 45,
    maxAttendees: 100,
    isFeatured: false,
    isRegistered: false,
    image: "🚀",
    tags: ["startup", "business", "competition", "innovation"]
  }
];

const categories = ["All", "Career", "Social", "Tech", "Cultural", "Wellness", "Entertainment", "Academic"];

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
const SearchBar = ({ onSearch, placeholder = "Search events..." }: SearchBarProps) => {
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

export default function EventsPage() {
  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set<number>());

  // Filter events based on category and search
  useEffect(() => {
    let filtered = eventsData;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, searchTerm]);

  // Handle event registration
  const handleEventRegistration = (eventId: number) => {
    const newRegisteredEvents = new Set(registeredEvents);
    if (newRegisteredEvents.has(eventId)) {
      newRegisteredEvents.delete(eventId);
      showNotification("Unregistered from event", "info");
    } else {
      newRegisteredEvents.add(eventId);
      showNotification("Successfully registered for event!", "success");
    }
    setRegisteredEvents(newRegisteredEvents);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
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
            <Link href="/events" className="text-emerald-400 font-medium">Events</Link>
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
                      My Events
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
              <Link href="/feed" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Feed</Link>
              <Link href="/events" className="text-emerald-400 font-medium py-2">Events</Link>
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
              🎉 Campus <span className="text-emerald-400">Events</span>
            </h1>
          </InteractiveCard>
          
          <InteractiveCard delay={400}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover exciting events happening at GMU. From career fairs to social gatherings - never miss what's happening on campus!
            </p>
          </InteractiveCard>

          <InteractiveCard delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <SearchBar onSearch={setSearchTerm} placeholder="Search events..." />
              <ModernButton
                onClick={() => setCreateEventModalOpen(true)}
                className="whitespace-nowrap"
              >
                📅 Create Event
              </ModernButton>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <InteractiveCard key={category} delay={index * 50}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
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

      {/* Featured Events */}
      {selectedCategory === "All" && !searchTerm && (
        <section className="px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <InteractiveCard delay={200}>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">⭐ Featured Events</h2>
            </InteractiveCard>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData.filter(event => event.isFeatured).map((event, index) => (
                <InteractiveCard key={`featured-${event.id}`} delay={index * 150}>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </div>
                      <div className="text-2xl">⭐</div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{event.image}</div>
                      <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                      <div className="text-emerald-100 text-sm mb-2">{formatDate(event.date)}</div>
                      <div className="text-emerald-100 text-sm">{event.time}</div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-20">
                      <span className="text-sm">{event.attendeeCount}/{event.maxAttendees} attending</span>
                      <ModernButton
                        variant="secondary"
                        onClick={() => setSelectedEvent(event)}
                        className="text-sm py-2 px-4"
                      >
                        View Details
                      </ModernButton>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events Grid */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <InteractiveCard delay={200}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
            </h2>
          </InteractiveCard>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <InteractiveCard key={event.id} delay={index * 100}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      <div className="text-2xl">{event.image}</div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{event.description}</p>
                      
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
                        <div className="flex items-center space-x-2">
                          <span>👥</span>
                          <span>{event.attendeeCount}/{event.maxAttendees} attending</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map(tag => (
                          <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <ModernButton
                          onClick={() => setSelectedEvent(event)}
                          className="flex-1 text-sm py-2"
                        >
                          View Details
                        </ModernButton>
                        <ModernButton
                          variant={registeredEvents.has(event.id) ? "secondary" : "outline"}
                          onClick={() => handleEventRegistration(event.id)}
                          className="text-sm py-2 px-4"
                        >
                          {registeredEvents.has(event.id) ? "✓" : "📝"}
                        </ModernButton>
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              ))
            ) : (
              <div className="col-span-full">
                <InteractiveCard>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-white text-xl font-bold mb-2">No events found</h3>
                    <p className="text-gray-400">Try adjusting your search or category filter.</p>
                  </div>
                </InteractiveCard>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedEvent.image}</div>
              <div className="flex justify-center space-x-4 text-sm mb-4">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full">
                  {selectedEvent.category}
                </span>
                {selectedEvent.isFeatured && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-gray-300">{selectedEvent.description}</p>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>📅</span>
                <span>{formatDate(selectedEvent.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⏰</span>
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👨‍💼</span>
                <span>Organized by {selectedEvent.organizer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👥</span>
                <span>{selectedEvent.attendeeCount}/{selectedEvent.maxAttendees} attending</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedEvent.tags.map(tag => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <ModernButton
              onClick={() => {
                handleEventRegistration(selectedEvent.id);
                setSelectedEvent(null);
              }}
              className="w-full"
            >
              {registeredEvents.has(selectedEvent.id) ? "✓ Registered" : "📝 Register for Event"}
            </ModernButton>
          </div>
        </Modal>
      )}

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

      {/* Create Event Modal */}
      <Modal isOpen={createEventModalOpen} onClose={() => setCreateEventModalOpen(false)} title="Create New Event">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setCreateEventModalOpen(false);
          showNotification("Event created successfully!", "success");
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
              <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200">
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="Event location"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Max Attendees</label>
              <input
                type="number"
                required
                min="1"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Describe your event..."
              ></textarea>
            </div>
            <ModernButton type="submit" className="w-full">Create Event</ModernButton>
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
