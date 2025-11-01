// Match Service - Handles API calls and localStorage operations
import type { MatchData } from '../types/match';

// In Vite, environment variables are accessed via import.meta.env, not process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.cricscorer.com';
const STORAGE_KEY = 'cricscorer_matches';

// Save completed match to API (if available) and localStorage
export const saveCompletedMatch = async (matchData: MatchData): Promise<MatchData> => {
  try {
    // Try to save to API first
    if (API_BASE_URL !== 'https://api.cricscorer.com') {
      const response = await fetch(`${API_BASE_URL}/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),
      });

      if (!response.ok) {
        throw new Error('API save failed');
      }
      
      const savedMatch = await response.json();
      // Also save to localStorage as backup
      saveToLocalStorage(savedMatch);
      return savedMatch;
    }
  } catch (error) {
    console.log('API not available, saving to localStorage only:', (error as Error).message);
  }

  // Fallback to localStorage
  const savedMatch = saveToLocalStorage(matchData);
  return savedMatch;
};

// Save to localStorage
const saveToLocalStorage = (matchData: MatchData): MatchData => {
  const matches = getCompletedMatchesFromStorage();
  const matchWithId: MatchData = {
    ...matchData,
    id: matchData.id || Date.now(),
    savedAt: new Date().toISOString(),
  };
  
  matches.push(matchWithId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  return matchWithId;
};

// Get match history from API (if available) or localStorage
export const getMatchHistory = async (): Promise<MatchData[]> => {
  try {
    // Try to fetch from API first
    if (API_BASE_URL !== 'https://api.cricscorer.com') {
      const response = await fetch(`${API_BASE_URL}/matches`);
      
      if (response.ok) {
        const apiMatches = await response.json();
        // Merge with localStorage data and remove duplicates
        const localMatches = getCompletedMatchesFromStorage();
        const mergedMatches = mergeMatches([...apiMatches, ...localMatches]);
        // Update localStorage with merged data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedMatches));
        return mergedMatches;
      }
    }
  } catch (error) {
    console.log('API not available, fetching from localStorage:', (error as Error).message);
  }

  // Fallback to localStorage
  return getCompletedMatchesFromStorage();
};

// Get matches from localStorage
const getCompletedMatchesFromStorage = (): MatchData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Merge matches and remove duplicates by ID
const mergeMatches = (matches: MatchData[]): MatchData[] => {
  const uniqueMatches: { [key: number]: MatchData } = {};
  matches.forEach(match => {
    if (match.id && !uniqueMatches[match.id]) {
      uniqueMatches[match.id] = match;
    }
  });
  return Object.values(uniqueMatches).sort((a, b) => {
    const dateAStr = a.date || a.savedAt || a.createdAt || '0';
    const dateBStr = b.date || b.savedAt || b.createdAt || '0';
    const dateA = new Date(dateAStr).getTime();
    const dateB = new Date(dateBStr).getTime();
    // Handle invalid dates
    if (isNaN(dateA) || isNaN(dateB)) {
      return 0;
    }
    return dateB - dateA;
  });
};

// Get ongoing matches from localStorage
export const getOngoingMatches = (): MatchData[] => {
  try {
    const stored = localStorage.getItem('cricscorer_ongoing_matches');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading ongoing matches from localStorage:', error);
    return [];
  }
};

// Save ongoing match to localStorage
export const saveOngoingMatch = (matchData: MatchData): MatchData | null => {
  try {
    const matches = getOngoingMatches();
    const matchWithId: MatchData = {
      ...matchData,
      id: matchData.id || Date.now(),
      updatedAt: new Date().toISOString(),
    };
    
    // Update existing or add new
    const existingIndex = matches.findIndex((m: MatchData) => m.id === matchWithId.id);
    if (existingIndex >= 0) {
      matches[existingIndex] = matchWithId;
    } else {
      matches.push(matchWithId);
    }
    
    localStorage.setItem('cricscorer_ongoing_matches', JSON.stringify(matches));
    return matchWithId;
  } catch (error) {
    console.error('Error saving ongoing match:', error);
    return null;
  }
};

// Delete ongoing match
export const deleteOngoingMatch = (matchId: number | undefined): boolean => {
  try {
    const matches = getOngoingMatches();
    const filtered = matches.filter((m: MatchData) => m.id !== matchId);
    localStorage.setItem('cricscorer_ongoing_matches', JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting ongoing match:', error);
    return false;
  }
};

