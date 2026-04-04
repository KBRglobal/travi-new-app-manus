export default {
  // ── Common ──────────────────────────────────────────────────────────────────
  common: {
    seeAll: "See All",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try Again",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    done: "Done",
    back: "Back",
    next: "Next",
    skip: "Skip",
    close: "Close",
    search: "Search",
    filter: "Filter",
    share: "Share",
    edit: "Edit",
    delete: "Delete",
    yes: "Yes",
    no: "No",
  },

  // ── Tab Bar ──────────────────────────────────────────────────────────────────
  tabs: {
    home: "Home",
    trips: "Trips",
    wallet: "Wallet",
    explore: "Explore",
    profile: "Profile",
  },

  // ── Home Screen ──────────────────────────────────────────────────────────────
  home: {
    greeting_morning: "Good morning",
    greeting_afternoon: "Good afternoon",
    greeting_evening: "Good evening",
    subtitle: "Where to next?",
    quickActions: {
      flights: "Flights",
      hotels: "Hotels",
      activities: "Activities",
      visas: "Visas",
    },
    sections: {
      aiPicks: "AI Picks for You",
      upcomingTrips: "Upcoming Trips",
      trendingNow: "Trending Now",
      hiddenGems: "Hidden Gems",
    },
    dnaMatch: "{{pct}}% DNA Match",
    bookNow: "Book Now",
    viewTrip: "View Trip",
    noTrips: "No upcoming trips",
    planTrip: "Plan a Trip",
  },

  // ── Explore Screen ───────────────────────────────────────────────────────────
  explore: {
    title: "Explore",
    searchPlaceholder: "Search destinations...",
    filters: {
      all: "All",
      flights: "Flights",
      hotels: "Hotels",
      activities: "Activities",
      food: "Food",
      nature: "Nature",
    },
    sections: {
      trending: "Trending",
      hiddenGems: "Hidden Gems",
      nearYou: "Near You",
      topRated: "Top Rated",
    },
    dnaMatch: "DNA Match",
    perNight: "/ night",
    perPerson: "/ person",
  },

  // ── Trips Screen ─────────────────────────────────────────────────────────────
  trips: {
    title: "My Trips",
    filters: {
      all: "All",
      upcoming: "Upcoming",
      active: "Active",
      past: "Past",
    },
    stats: {
      countries: "Countries",
      trips: "Trips",
      miles: "Miles",
      days: "Days",
    },
    empty: {
      title: "No trips yet",
      subtitle: "Start planning your next adventure",
      cta: "Plan a Trip",
    },
    status: {
      upcoming: "Upcoming",
      active: "Active Now",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    days: "{{count}} days",
    viewDetails: "View Details",
    addTrip: "Add Trip",
  },

  // ── Wallet Screen ────────────────────────────────────────────────────────────
  wallet: {
    title: "Wallet",
    subtitle: "Manage your travel funds",
    balance: {
      total: "Total Balance",
      points: "Travel Points",
      cashback: "Cashback",
    },
    cards: {
      title: "My Cards",
      addCard: "Add Card",
      active: "Active",
    },
    actions: {
      topUp: "Top Up",
      transfer: "Transfer",
      redeem: "Redeem",
      history: "History",
    },
    points: {
      title: "Travel Points",
      credit: "travel credit",
      toGold: "pts to Gold status",
      redeemBtn: "Redeem",
    },
    redeemTitle: "Redeem Points",
    waysToRedeem: "Ways to Redeem",
    recentActivity: "Recent Activity",
    redeemOptions: {
      miles: "Airline Miles",
      giftCards: "Gift Cards",
      hotels: "Hotel Stays",
      esim: "eSIM Data",
      experiences: "Experiences",
      lounges: "Lounges",
    },
  },

  // ── Profile Screen ───────────────────────────────────────────────────────────
  profile: {
    title: "Profile",
    stats: {
      countries: "Countries",
      trips: "Trips",
      points: "Points",
      rating: "Rating",
    },
    dna: {
      title: "Travel DNA",
      retake: "Retake Quiz",
      traits: {
        adventure: "Adventure",
        culture: "Culture",
        wellness: "Wellness",
        food: "Food",
        nature: "Nature",
      },
    },
    achievements: {
      title: "Achievements",
      locked: "Locked",
    },
    settings: {
      preferences: "Preferences",
      account: "Account",
      language: "Language",
      currency: "Currency",
      notifications: "Notifications",
      darkMode: "Dark Mode",
      editProfile: "Edit Profile",
      privacy: "Privacy & Security",
      payment: "Payment Methods",
      help: "Help & Support",
    },
    signOut: "Sign Out",
  },

  // ── Auth Screens ─────────────────────────────────────────────────────────────
  auth: {
    tagline: "Your AI Travel Companion",
    signUp: "Sign Up",
    logIn: "Log In",
    continueEmail: "Continue with Email →",
    continueGoogle: "Continue with Google",
    continueApple: "Continue with Apple",
    continueGuest: "Continue as Guest",
    guestSubtitle: "Explore without an account",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    terms: "By continuing you agree to our",
    termsLink: "Terms",
    privacyLink: "Privacy Policy",
    startJourney: "Start your journey",
    createAccount: "Create your free account today",
  },

  // ── DNA Quiz ─────────────────────────────────────────────────────────────────
  dna: {
    title: "Your Travel DNA",
    subtitle: "Swipe to discover your travel personality",
    swipeRight: "Love it",
    swipeLeft: "Not for me",
    complete: "DNA Complete!",
    completeSubtitle: "Your travel personality is ready",
    viewResults: "View Results",
  },

  // ── AI Agent ─────────────────────────────────────────────────────────────────
  agent: {
    title: "TRAVI AI",
    subtitle: "Your personal travel agent",
    placeholder: "Ask me anything about travel...",
    thinking: "Thinking...",
    suggestions: {
      plan: "Plan a trip to Bali",
      flights: "Find cheap flights to Tokyo",
      visa: "Do I need a visa for Dubai?",
      budget: "What's the budget for Paris?",
    },
  },
} as const;
