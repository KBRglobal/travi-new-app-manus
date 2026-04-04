export default {
  // ─── Common ───
  common: {
    loading: 'Loading...',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    done: 'Done',
    next: 'Next',
    back: 'Back',
    skip: 'Skip',
    search: 'Search',
    close: 'Close',
    share: 'Share',
    seeAll: 'See All',
    comingSoon: 'Coming Soon',
    noResults: 'No results found',
    error: 'Something went wrong',
    success: 'Success',
    ok: 'OK',
  },

  // ─── Auth ───
  auth: {
    welcome: {
      title: 'Discover Your Travel DNA',
      subtitle: 'We learn what makes you tick — then match you with perfect destinations.',
      getStarted: 'Get Started',
      signIn: 'Already have an account? Sign In',
      continueAsGuest: 'Continue as Guest',
    },
    login: {
      title: 'Welcome Back',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      orContinueWith: 'Or continue with',
    },
    signup: {
      title: 'Create Account',
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',
      createAccount: 'Create Account',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
    },
    forgotPassword: {
      title: 'Reset Password',
      subtitle: "Enter your email and we'll send you a reset link.",
      email: 'Email',
      sendLink: 'Send Reset Link',
      backToLogin: 'Back to Login',
    },
    verifyEmail: {
      title: 'Check Your Email',
      subtitle: "We've sent a verification code to your email.",
      resend: 'Resend Code',
    },
  },

  // ─── DNA Quiz ───
  dna: {
    welcome: {
      title: 'Discover Your Travel DNA',
      subtitle: 'Answer a few questions and we\'ll build your unique travel profile.',
      start: 'Start Quiz',
    },
    interests: {
      title: 'What excites you?',
      subtitle: 'Pick your travel interests',
      adventure: 'Adventure',
      culture: 'Culture',
      relaxation: 'Relaxation',
      food: 'Food',
      nature: 'Nature',
    },
    schedule: {
      title: 'How do you plan?',
      detailed: 'Detailed itinerary',
      rough: 'Rough plan',
      spontaneous: 'Spontaneous',
      flow: 'Go with the flow',
    },
    result: {
      title: 'Your Travel DNA',
      subtitle: 'Here\'s what makes you unique as a traveler.',
      continue: 'Continue to App',
    },
  },

  // ─── Tabs ───
  tabs: {
    home: 'Home',
    explore: 'Explore',
    trips: 'Trips',
    wallet: 'Wallet',
    profile: 'Profile',
    points: 'Points',
  },

  // ─── Home ───
  home: {
    greeting: 'Hello, {{name}}',
    guestGreeting: 'Hello, Traveler',
    subtitle: 'Where to next?',
    featuredDestinations: 'Featured Destinations',
    quickActions: 'Quick Actions',
    recentTrips: 'Recent Trips',
    planTrip: 'Plan a Trip',
    exploreDNA: 'Explore DNA',
    aiChat: 'AI Chat',
    matchScore: '{{score}}% Match',
  },

  // ─── Explore ───
  explore: {
    title: 'Explore',
    searchPlaceholder: 'Search destinations...',
    trending: 'Trending Now',
    recommended: 'Recommended for You',
    categories: 'Categories',
    nearYou: 'Near You',
  },

  // ─── Trips ───
  trips: {
    title: 'My Trips',
    upcoming: 'Upcoming',
    past: 'Past',
    noTrips: 'No trips yet',
    noTripsSubtitle: 'Start planning your next adventure!',
    planNew: 'Plan New Trip',
    daysUntil: '{{days}} days until departure',
    inProgress: 'In Progress',
  },

  // ─── Wallet ───
  wallet: {
    title: 'Wallet',
    balance: 'Balance',
    addFunds: 'Add Funds',
    transactions: 'Transactions',
    membership: 'Membership',
    points: 'Points',
    cashback: 'Cashback',
    splitBill: 'Split Bill',
  },

  // ─── Profile ───
  profile: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    travelDNA: 'Travel DNA',
    achievements: 'Achievements',
    stats: 'Stats',
    wishlist: 'Wishlist',
    reviews: 'Reviews',
    settings: 'Settings',
    logout: 'Log Out',
  },

  // ─── Trip Planning ───
  tripPlan: {
    destination: 'Destination',
    dates: 'Dates',
    travelers: 'Travelers',
    flights: 'Flights',
    hotels: 'Hotels',
    activities: 'Activities',
    itinerary: 'Itinerary',
    budget: 'Budget',
    checkout: 'Checkout',
    bookNow: 'Book Now',
    totalPrice: 'Total Price',
    perPerson: 'per person',
    selectDates: 'Select Dates',
    addActivity: 'Add Activity',
  },

  // ─── Live Trip ───
  live: {
    title: 'Live Trip',
    timeline: 'Timeline',
    map: 'Map',
    expenses: 'Expenses',
    memories: 'Memories',
    weather: 'Weather',
    emergency: 'Emergency',
    taxFree: 'Tax Free',
    addExpense: 'Add Expense',
    totalSpent: 'Total Spent',
    budgetRemaining: 'Budget Remaining',
  },

  // ─── Points ───
  points: {
    title: 'Points & Rewards',
    balance: '{{count}} Points',
    earn: 'Earn Points',
    redeem: 'Redeem',
    badges: 'Badges',
    challenges: 'Challenges',
    referrals: 'Referrals',
    history: 'History',
    tier: {
      bronze: 'Bronze',
      silver: 'Silver',
      gold: 'Gold',
      platinum: 'Platinum',
    },
  },

  // ─── Settings ───
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    language: 'Language',
    currency: 'Currency',
    notifications: 'Notifications',
    privacy: 'Privacy',
    help: 'Help & Support',
    feedback: 'Feedback',
    terms: 'Terms of Service',
    about: 'About',
    deleteAccount: 'Delete Account',
    version: 'Version {{version}}',
  },

  // ─── Notifications ───
  notifications: {
    tripReminder: 'Trip to {{destination}} starts {{time}}!',
    flightUpdate: 'Flight {{flight}} status updated',
    hotelCheckin: 'Check-in available for {{hotel}}',
    priceAlert: 'Price dropped for {{destination}}!',
    pointsEarned: 'You earned {{points}} points!',
    badgeUnlocked: 'New badge unlocked: {{badge}}',
  },

  // ─── Errors ───
  errors: {
    network: 'No internet connection',
    timeout: 'Request timed out',
    server: 'Server error, please try again',
    auth: 'Authentication required',
    notFound: 'Not found',
    generic: 'Something went wrong',
  },
} as const;
