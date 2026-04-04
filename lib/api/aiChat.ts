/* ═══════════════════════════════════════════
 *  TRAVI — AI Chat Service
 *  Claude integration with DNA-aware system prompt
 *  Proactive message triggers
 * ═══════════════════════════════════════════ */

import type { DNAProfile } from '../dnaSignals';

// ─── Types ───

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  actions?: string[];
  timestamp: string;
  isProactive?: boolean;
}

export interface LiveContext {
  tripName: string;
  destination: string;
  currentDay: number;
  totalDays: number;
  currentActivity: { name: string; time: string } | null;
  currentLocation: { lat: number; lng: number; name: string };
  localTime: string;
  budgetRemaining: number;
  weather: string;
  upcomingActivities: { time: string; name: string }[];
}

// ─── System Prompt Builder ───

export function buildSystemPrompt(
  userName: string,
  dnaProfile: DNAProfile | null,
  context: LiveContext
): string {
  const dnaSection = dnaProfile
    ? `
USER DNA PROFILE:
- Adventure & Sports: ${Math.round(dnaProfile.adventure * 100)}%
- Culture & History: ${Math.round(dnaProfile.culture * 100)}%
- Luxury & Comfort: ${Math.round(dnaProfile.luxury * 100)}%
- Social & Nightlife: ${Math.round(dnaProfile.social * 100)}%
- Nature & Wildlife: ${Math.round(dnaProfile.nature * 100)}%
- Food & Gastronomy: ${Math.round(dnaProfile.food * 100)}%
- Wellness & Relaxation: ${Math.round(dnaProfile.wellness * 100)}%
- Budget Consciousness: ${Math.round(dnaProfile.budget * 100)}%
`
    : `
USER DNA PROFILE: Not yet calculated (new user)
`;

  return `You are TRAVI's AI travel assistant for ${userName}.
${dnaSection}
CURRENT CONTEXT:
- Trip: ${context.tripName} in ${context.destination}
- Day ${context.currentDay} of ${context.totalDays}
- Current activity: ${context.currentActivity?.name || 'Free time'}
- Location: ${context.currentLocation.name}
- Time: ${context.localTime}
- Budget remaining: €${context.budgetRemaining}
- Weather: ${context.weather}

NEXT ACTIVITIES:
${context.upcomingActivities.map((a) => `- ${a.time}: ${a.name}`).join('\n')}

Be concise, practical, and match recommendations to the DNA profile above.
Always provide specific, actionable suggestions.
When suggesting restaurants, activities, or places, explain WHY it matches their DNA.
Format responses with clear structure and emoji for readability.`;
}

// ─── Proactive Message Triggers ───

export interface ProactiveMessage {
  id: string;
  text: string;
  actions: string[];
  trigger: string;
  priority: 'low' | 'medium' | 'high';
}

export function checkProactiveTriggers(
  context: LiveContext,
  dnaProfile: DNAProfile | null
): ProactiveMessage | null {
  const hour = parseInt(context.localTime.split(':')[0]);

  // 1. Near activity (geofence)
  if (context.currentActivity) {
    return {
      id: 'proactive_' + Date.now(),
      text: `${context.currentActivity.name} is coming up at ${context.currentActivity.time}! Ready to go?`,
      actions: ['Navigate', 'Get ready', 'Skip'],
      trigger: 'near_activity',
      priority: 'high',
    };
  }

  // 2. Lunch time (12:00-13:30) + no lunch activity
  if (hour >= 12 && hour < 14) {
    const hasLunch = context.upcomingActivities.some(
      (a) => a.name.toLowerCase().includes('lunch') || a.name.toLowerCase().includes('restaurant')
    );
    if (!hasLunch) {
      const foodScore = dnaProfile?.food || 0.5;
      const suggestion = foodScore > 0.7
        ? "I found a highly-rated local restaurant that matches your foodie DNA!"
        : "Time for lunch! Here are some nearby options.";
      return {
        id: 'proactive_' + Date.now(),
        text: suggestion,
        actions: ['Show restaurants', 'Navigate', 'Dismiss'],
        trigger: 'lunch_time',
        priority: 'medium',
      };
    }
  }

  // 3. Weather change
  if (context.weather.toLowerCase().includes('rain')) {
    return {
      id: 'proactive_' + Date.now(),
      text: 'Rain expected soon. Shall I suggest indoor alternatives?',
      actions: ['Yes, suggest', 'Keep current plan'],
      trigger: 'weather_change',
      priority: 'medium',
    };
  }

  // 4. Evening free time
  if (hour >= 18 && hour < 21) {
    const hasEvening = context.upcomingActivities.some(
      (a) => parseInt(a.time.split(':')[0]) >= 18
    );
    if (!hasEvening && dnaProfile) {
      const suggestion = dnaProfile.social > 0.7
        ? "Your social DNA is calling! There's a great bar district nearby."
        : dnaProfile.food > 0.7
        ? "Evening free! How about a food tour or local dinner?"
        : "Free evening! Want me to suggest something?";
      return {
        id: 'proactive_' + Date.now(),
        text: suggestion,
        actions: ['Show suggestions', 'I\'m good', 'Surprise me'],
        trigger: 'evening_free',
        priority: 'low',
      };
    }
  }

  return null;
}

// ─── Mock AI Chat ───

const mockResponses: Record<string, string> = {
  default: "I'd be happy to help! Based on your DNA profile, I can suggest personalized activities, restaurants, and hidden gems. What are you looking for?",
  restaurant: "Based on your food DNA, I recommend trying the local tapas bar 'El Xampanyet' — it's authentic, affordable, and matches your love of local cuisine! 🍽️",
  activity: "Your adventure DNA is strong! How about a kayaking tour along the coast? It combines your love of nature and adventure. Starts at €45, takes 3 hours. 🚣",
  weather: "It looks like rain is coming in about 2 hours. I'd suggest moving your outdoor activities earlier, and I have some great indoor alternatives: the Picasso Museum or a cooking class! 🌧️",
  budget: "You've spent €420 of your €1,200 budget so far. At this pace, you'll finish under budget! You could treat yourself to that spa experience you were eyeing. 💰",
  navigate: "The fastest route to Sagrada Familia is 12 minutes by metro (L2 → L5). Or 25 minutes walking through the beautiful Eixample district. Want me to open navigation? 🗺️",
};

export async function sendMessage(
  message: string,
  context: LiveContext,
  dnaProfile: DNAProfile | null,
  history: ChatMessage[]
): Promise<ChatMessage> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

  // Simple keyword matching for mock responses
  const lowerMessage = message.toLowerCase();
  let responseKey = 'default';

  if (lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('lunch') || lowerMessage.includes('dinner')) {
    responseKey = 'restaurant';
  } else if (lowerMessage.includes('do') || lowerMessage.includes('activity') || lowerMessage.includes('adventure')) {
    responseKey = 'activity';
  } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain')) {
    responseKey = 'weather';
  } else if (lowerMessage.includes('budget') || lowerMessage.includes('money') || lowerMessage.includes('spent')) {
    responseKey = 'budget';
  } else if (lowerMessage.includes('how') || lowerMessage.includes('get to') || lowerMessage.includes('navigate') || lowerMessage.includes('direction')) {
    responseKey = 'navigate';
  }

  return {
    id: 'msg_' + Date.now(),
    role: 'assistant',
    content: mockResponses[responseKey],
    actions: responseKey === 'restaurant' ? ['Navigate', 'See menu', 'Other options'] :
             responseKey === 'activity' ? ['Book now', 'More details', 'Other options'] :
             responseKey === 'navigate' ? ['Open maps', 'Walking route', 'Metro route'] :
             undefined,
    timestamp: new Date().toISOString(),
  };
}

// ─── Chat History Manager ───

let chatHistory: Map<string, ChatMessage[]> = new Map();

export function getChatHistory(tripId: string): ChatMessage[] {
  return chatHistory.get(tripId) || [];
}

export function addToChatHistory(tripId: string, message: ChatMessage): void {
  const history = chatHistory.get(tripId) || [];
  history.push(message);
  chatHistory.set(tripId, history);
}

export function clearChatHistory(tripId: string): void {
  chatHistory.delete(tripId);
}
