'use client';
import Link from "next/link";
import { useState, useEffect, useRef, ReactNode, FormEvent } from "react";

// Types
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
  isAvailable: boolean;
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

// Sample marketplace data
const marketplaceItems: MarketplaceItem[] = [
  {
    id: 1,
    title: "iPhone 14 Pro - Excellent Condition",
    description: "Selling my iPhone 14 Pro in excellent condition. Always kept in a case with screen protector. Battery health at 92%. Includes original charger, box, and unused AirPods.",
    price: 850,
    category: "Electronics",
    condition: "Excellent",
    seller: "Alex M.",
    images: ["📱"],
    postedDate: "2025-08-05",
    location: "Campus",
    isFeatured: true,
    isAvailable: true,
    tags: ["phone", "apple", "ios", "unlocked"]
  },
  {
    id: 2,
    title: "Calculus Textbook - 9th Edition",
    description: "Stewart's Calculus 9th Edition textbook. Used for Math 113/114. In good condition with minimal highlighting. Much cheaper than bookstore! Saved me $200.",
    price: 140,
    category: "Textbooks",
    condition: "Good",
    seller: "Sarah K.",
    images: ["📚"],
    postedDate: "2025-08-03",
    location: "Engineering Building",
    isFeatured: false,
    isAvailable: true,
    tags: ["math", "calculus", "stewart", "textbook"]
  },
  {
    id: 3,
    title: "Gaming Laptop - ASUS ROG Strix",
    description: "ASUS ROG Strix gaming laptop with RTX 3070, 16GB RAM, 1TB SSD. Perfect for gaming and programming. Excellent performance, barely used. Includes gaming mouse and laptop bag.",
    price: 1200,
    category: "Electronics",
    condition: "Like New",
    seller: "Mike R.",
    images: ["💻"],
    postedDate: "2025-08-02",
    location: "Student Apartments",
    isFeatured: true,
    isAvailable: true,
    tags: ["gaming", "laptop", "asus", "rtx"]
  },
  {
    id: 4,
    title: "Dorm Furniture Set",
    description: "Complete dorm furniture set including desk, chair, lamp, and storage containers. Everything you need to set up your dorm room. Great condition, moving out sale!",
    price: 180,
    category: "Furniture",
    condition: "Good",
    seller: "Jordan T.",
    images: ["🪑"],
    postedDate: "2025-08-01",
    location: "Dorms",
    isFeatured: false,
    isAvailable: true,
    tags: ["dorm", "furniture", "desk", "storage"]
  },
  {
    id: 5,
    title: "Winter Jacket - Patagonia",
    description: "Men's Patagonia winter jacket, size Large. Warm and waterproof, perfect for cold weather. Only worn a few times, like new condition. Originally $300.",
    price: 120,
    category: "Clothing",
    condition: "Like New",
    seller: "Emma L.",
    images: ["🧥"],
    postedDate: "2025-07-30",
    location: "Off-Campus",
    isFeatured: false,
    isAvailable: true,
    tags: ["patagonia", "winter", "jacket", "outdoor"]
  },
  {
    id: 6,
    title: "Chemistry Lab Equipment Set",
    description: "Complete chemistry lab kit with goggles, gloves, beakers, and basic equipment. Required for Chem 211/212. Barely used, selling because I switched majors to CS.",
    price: 65,
    category: "Academic",
    condition: "Excellent",
    seller: "Chemistry Student",
    images: ["🧪"],
    postedDate: "2025-07-28",
    location: "Science Building",
    isFeatured: false,
    isAvailable: true,
    tags: ["chemistry", "lab", "equipment", "science"]
  },
  {
    id: 7,
    title: "Mini Fridge + Microwave Combo",
    description: "Compact mini fridge with built-in microwave, perfect size for dorm rooms. Energy efficient and very quiet. Great condition, no scratches or dents. Moving out sale!",
    price: 200,
    category: "Appliances",
    condition: "Excellent",
    seller: "Graduating Senior",
    images: ["❄️"],
    postedDate: "2025-07-25",
    location: "Dorms",
    isFeatured: true,
    isAvailable: true,
    tags: ["fridge", "microwave", "dorm", "appliance"]
  },
  {
    id: 8,
    title: "Mechanical Keyboard - Cherry MX",
    description: "Custom mechanical keyboard with Cherry MX Blue switches. RGB backlighting, programmable keys. Perfect for gaming and programming. Includes custom keycaps and wrist rest.",
    price: 150,
    category: "Electronics",
    condition: "Very Good",
    seller: "CS Major",
    images: ["⌨️"],
    postedDate: "2025-07-22",
    location: "Engineering Building",
    isFeatured: false,
    isAvailable: true,
    tags: ["keyboard", "mechanical", "gaming", "rgb"]
  }
];

const categories = ["All", "Electronics", "Textbooks", "Furniture", "Clothing", "Academic", "Appliances", "Other"];
const conditions = ["All", "Like New", "Excellent", "Very Good", "Good", "Fair"];

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
const SearchBar = ({ onSearch, placeholder = "Search marketplace..." }: SearchBarProps) => {
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

export default function MarketplacePage() {
  // State Management
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(marketplaceItems);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'info' | 'success' | 'error'; isVisible: boolean }>({ message: "", type: "info", isVisible: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favoriteItems, setFavoriteItems] = useState(new Set<number>());

  // Filter items based on category, condition, and search
  useEffect(() => {
    let filtered = marketplaceItems;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedCondition !== "All") {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory, selectedCondition, searchTerm]);

  // Handle item favoriting
  const handleFavoriteItem = (itemId: number) => {
    const newFavoriteItems = new Set(favoriteItems);
    if (newFavoriteItems.has(itemId)) {
      newFavoriteItems.delete(itemId);
      showNotification("Removed from favorites", "info");
    } else {
      newFavoriteItems.add(itemId);
      showNotification("Added to favorites!", "success");
    }
    setFavoriteItems(newFavoriteItems);
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
      month: 'short', 
      day: 'numeric' 
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
            <Link href="/marketplace" className="text-emerald-400 font-medium">Marketplace</Link>
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
                      My Listings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                      Favorites
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
              <Link href="/events" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2">Events</Link>
              <Link href="/marketplace" className="text-emerald-400 font-medium py-2">Marketplace</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Page Header */}
      <section className="relative px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <InteractiveCard delay={200}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              🛒 Student <span className="text-emerald-400">Marketplace</span>
            </h1>
          </InteractiveCard>
          
          <InteractiveCard delay={400}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Buy and sell items with fellow GMU students. From textbooks to electronics - find great deals on campus!
            </p>
          </InteractiveCard>

          <InteractiveCard delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <SearchBar onSearch={setSearchTerm} placeholder="Search items..." />
              <ModernButton
                onClick={() => setListingModalOpen(true)}
                className="whitespace-nowrap"
              >
                💰 Sell Item
              </ModernButton>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3 text-center">Categories</h3>
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

          {/* Condition Filter */}
          <div>
            <h3 className="text-white text-lg font-medium mb-3 text-center">Condition</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {conditions.map((condition, index) => (
                <InteractiveCard key={condition} delay={index * 50}>
                  <button
                    onClick={() => setSelectedCondition(condition)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                      selectedCondition === condition
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {condition}
                  </button>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      {selectedCategory === "All" && selectedCondition === "All" && !searchTerm && (
        <section className="px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <InteractiveCard delay={200}>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">⭐ Featured Items</h2>
            </InteractiveCard>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.filter(item => item.isFeatured).map((item, index) => (
                <InteractiveCard key={`featured-${item.id}`} delay={index * 150}>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </div>
                      <div className="text-2xl">⭐</div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{item.images[0]}</div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <div className="text-2xl font-bold mb-2">${item.price}</div>
                      <div className="text-emerald-100 text-sm">{item.condition}</div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-20">
                      <span className="text-sm">By {item.seller}</span>
                      <ModernButton
                        variant="secondary"
                        onClick={() => setSelectedItem(item)}
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

      {/* All Items Grid */}
      <section className="px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <InteractiveCard delay={200}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {selectedCategory === "All" ? "All Items" : `${selectedCategory} Items`}
            </h2>
          </InteractiveCard>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <InteractiveCard key={item.id} delay={index * 100}>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleFavoriteItem(item.id)}
                        className={`transition-colors duration-200 ${
                          favoriteItems.has(item.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <svg className="w-6 h-6" fill={favoriteItems.has(item.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3">{item.images[0]}</div>
                      <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <div className="text-2xl font-bold text-emerald-400 mb-2">${item.price}</div>
                      <div className="text-gray-400 text-sm mb-2">{item.condition}</div>
                    </div>
                    
                    <div className="mt-auto space-y-3">
                      <div className="text-gray-300 text-sm">
                        <div className="flex justify-between">
                          <span>📍 {item.location}</span>
                          <span>📅 {formatDate(item.postedDate)}</span>
                        </div>
                        <div className="mt-1">👤 {item.seller}</div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <ModernButton
                          onClick={() => setSelectedItem(item)}
                          className="flex-1 text-sm py-2"
                        >
                          View Details
                        </ModernButton>
                        <ModernButton
                          variant="outline"
                          onClick={() => showNotification("Message sent to seller!", "success")}
                          className="text-sm py-2 px-4"
                        >
                          💬
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
                    <h3 className="text-white text-xl font-bold mb-2">No items found</h3>
                    <p className="text-gray-400">Try adjusting your search or filters.</p>
                  </div>
                </InteractiveCard>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedItem.images[0]}</div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">${selectedItem.price}</div>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full">
                  {selectedItem.category}
                </span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                  {selectedItem.condition}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300">{selectedItem.description}</p>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <span>👤</span>
                <span>Seller: {selectedItem.seller}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>Location: {selectedItem.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📅</span>
                <span>Posted: {formatDate(selectedItem.postedDate)}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedItem.tags.map(tag => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3">
              <ModernButton
                onClick={() => {
                  showNotification("Message sent to seller!", "success");
                  setSelectedItem(null);
                }}
                className="flex-1"
              >
                💬 Contact Seller
              </ModernButton>
              <ModernButton
                variant="outline"
                onClick={() => {
                  handleFavoriteItem(selectedItem.id);
                  setSelectedItem(null);
                }}
              >
                {favoriteItems.has(selectedItem.id) ? "💖" : "🤍"}
              </ModernButton>
            </div>
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

      {/* Create Listing Modal */}
      <Modal isOpen={listingModalOpen} onClose={() => setListingModalOpen(false)} title="Create New Listing">
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setListingModalOpen(false);
          showNotification("Item listed successfully!", "success");
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
              <label className="block text-gray-300 text-sm font-medium mb-2">Item Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="What are you selling?"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Condition</label>
              <select className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200">
                {conditions.slice(1).map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200"
                placeholder="Campus, Dorms, etc."
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Describe your item..."
              ></textarea>
            </div>
            <ModernButton type="submit" className="w-full">Create Listing</ModernButton>
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
