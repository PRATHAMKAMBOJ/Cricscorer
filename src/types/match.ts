export interface Batsman {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
}

export interface Bowler {
  name: string;
  overs: number;
  runs: number;
  wickets: number;
  maidens: number;
}

export interface MatchData {
  id?: number;
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  matchType?: string;
  totalOvers?: number;
  venue?: string;
  tossWinner?: string;
  elected?: string;
  status?: 'Live' | 'Completed' | 'Pending' | 'Ended';
  createdAt?: string;
  updatedAt?: string;
  date?: string;
  savedAt?: string;
  overs?: string;
  currentRR?: number | string;
  requiredRR?: number | string;
  target?: number;
  result?: string;
  batsmen?: Batsman[];
  bowlers?: Bowler[];
  innings?: any[];
  currentInnings?: any;
  creatorId?: string; // User ID who created the match
  oversHistory?: Array<{overNumber: number; balls: Array<{type: string; runs: number; display: string; isWicket: boolean}>; runs: number}>;
  [key: string]: any; // Allow additional properties
}

