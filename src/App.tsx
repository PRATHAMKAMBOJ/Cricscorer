import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import HomePage from './components/HomePage';
import NewMatchPage from './components/NewMatchPage';
import MatchDetailPage from './components/MatchDetailPage';
import HistoryPage from './components/HistoryPage';
import CompletedDetailPage from './components/CompletedDetailPage';
import Scoreboard from './components/Scoreboard';
import { getMatchHistory, getOngoingMatches, saveOngoingMatch, saveCompletedMatch } from './services/matchService';
import type { MatchData } from './types/match';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [ongoingMatches, setOngoingMatches] = useState<MatchData[]>([]);
  const [completedMatches, setCompletedMatches] = useState<MatchData[]>([]);
  const [newMatchData, setNewMatchData] = useState({
    team1: '',
    team2: '',
    matchType: 'T20',
    overs: '20',
    venue: '',
    tossWinner: '',
    elected: ''
  });

  useEffect(() => {
    const loadMatches = async () => {
      const history = await getMatchHistory();
      setCompletedMatches(history);
      const ongoing = getOngoingMatches();
      setOngoingMatches(ongoing);
    };
    loadMatches();
  }, []);

  const handleMatchUpdate = (updatedMatch: MatchData) => {
    setOngoingMatches(prev => prev.map(match => 
      match.id === updatedMatch.id ? updatedMatch : match
    ));
    setSelectedMatch(updatedMatch);
  };

  const handleMatchEnd = (completedMatch: MatchData) => {
    saveCompletedMatch(completedMatch);
    setCompletedMatches(prev => [...prev, completedMatch]);
    setOngoingMatches(prev => prev.filter(match => match.id !== completedMatch.id));
    setSelectedMatch(null);
    navigate('/');
  };

  const handleViewChange = (view: string | { view: string; matchData?: MatchData }) => {
    if (typeof view === 'object' && view.matchData) {
      setSelectedMatch(view.matchData);
      saveOngoingMatch(view.matchData);
      setOngoingMatches(prev => {
        const exists = prev.find(m => m.id === view.matchData?.id);
        if (!exists && view.matchData) {
          return [...prev, view.matchData];
        }
        return prev;
      });
      // Handle route navigation
      if (view.view.startsWith('/')) {
        navigate(view.view);
      } else {
        navigate(`/${view.view}`);
      }
    } else if (typeof view === 'string') {
      // If it's already a route path, navigate directly
      if (view.startsWith('/')) {
        navigate(view);
      } else {
        navigate(`/${view}`);
      }
    }
  };

  const ScoreboardWrapper = () => {
    const { matchId } = useParams<{ matchId: string }>();
    
    useEffect(() => {
      const match = ongoingMatches.find(m => m.id === Number(matchId));
      if (!match) {
        const allOngoing = getOngoingMatches();
        const foundMatch = allOngoing.find(m => m.id === Number(matchId));
        if (foundMatch) {
          setOngoingMatches(prev => {
            const exists = prev.find(m => m.id === foundMatch.id);
            if (!exists) {
              return [...prev, foundMatch];
            }
            return prev;
          });
          setSelectedMatch(foundMatch);
        } else {
          navigate('/');
        }
      }
    }, [matchId]);
    
    const match = ongoingMatches.find(m => m.id === Number(matchId)) || selectedMatch;
    
    if (!match) {
      return null;
    }

    return (
      <Scoreboard
        matchData={match}
        setCurrentView={handleViewChange}
        onMatchUpdate={handleMatchUpdate}
        onMatchEnd={handleMatchEnd}
      />
    );
  };

  const MatchDetailWrapper = () => {
    const { matchId } = useParams<{ matchId: string }>();
    
    useEffect(() => {
      const match = ongoingMatches.find(m => m.id === Number(matchId));
      if (!match) {
        const allOngoing = getOngoingMatches();
        const foundMatch = allOngoing.find(m => m.id === Number(matchId));
        if (foundMatch) {
          setOngoingMatches(prev => {
            const exists = prev.find(m => m.id === foundMatch.id);
            if (!exists) {
              return [...prev, foundMatch];
            }
            return prev;
          });
          setSelectedMatch(foundMatch);
        } else {
          navigate('/');
        }
      }
    }, [matchId]);
    
    const match = ongoingMatches.find(m => m.id === Number(matchId)) || selectedMatch;
    
    if (!match) {
      return null;
    }

    return (
      <MatchDetailPage
        selectedMatch={match}
        setCurrentView={handleViewChange}
      />
    );
  };

  const CompletedDetailWrapper = () => {
    const { matchId } = useParams<{ matchId: string }>();
    
    useEffect(() => {
      const match = completedMatches.find(m => m.id === Number(matchId));
      if (!match) {
        getMatchHistory().then(history => {
          const foundMatch = history.find(m => m.id === Number(matchId));
          if (foundMatch) {
            setCompletedMatches(prev => {
              const exists = prev.find(m => m.id === foundMatch.id);
              if (!exists) {
                return [...prev, foundMatch];
              }
              return prev;
            });
            setSelectedMatch(foundMatch);
          } else {
            navigate('/history');
          }
        });
      }
    }, [matchId]);
    
    const match = completedMatches.find(m => m.id === Number(matchId)) || selectedMatch;
    
    if (!match) {
      return null;
    }

    return (
      <CompletedDetailPage
        selectedMatch={match}
        setCurrentView={handleViewChange}
      />
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #f9fafb, #eff6ff)', padding: '1rem' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                ongoingMatches={ongoingMatches}
                setSelectedMatch={setSelectedMatch}
                setCurrentView={handleViewChange}
              />
            } 
          />
          <Route 
            path="/new-match" 
            element={
              <NewMatchPage
                newMatchData={newMatchData}
                setNewMatchData={setNewMatchData}
                setCurrentView={handleViewChange}
              />
            } 
          />
          <Route 
            path="/scoreboard/:matchId" 
            element={<ScoreboardWrapper />} 
          />
          <Route 
            path="/match/:matchId" 
            element={<MatchDetailWrapper />} 
          />
          <Route 
            path="/history" 
            element={
              <HistoryPage
                completedMatches={completedMatches}
                setSelectedMatch={setSelectedMatch}
                setCurrentView={handleViewChange}
              />
            } 
          />
          <Route 
            path="/completed/:matchId" 
            element={<CompletedDetailWrapper />} 
          />
        </Routes>
      </div>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
