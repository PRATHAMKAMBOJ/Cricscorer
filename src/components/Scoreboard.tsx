import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Power, Edit2, X, RotateCcw } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import AdvancedStats from './AdvancedStats';
import { saveOngoingMatch, saveCompletedMatch, deleteOngoingMatch } from '../services/matchService';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  color: #2563eb;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s;

  &:hover {
    color: #1d4ed8;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'save' | 'end' | 'undo' }>`
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => {
    if (props.variant === 'save') {
      return `
        background: ${theme.colors.primary[600]};
        color: white;
        &:hover:not(:disabled) {
          background: ${theme.colors.primary[700]};
        }
      `;
    } else if (props.variant === 'end') {
      return `
        background: ${theme.colors.red[600]};
        color: white;
        &:hover:not(:disabled) {
          background: ${theme.colors.red[700]};
        }
      `;
    } else if (props.variant === 'undo') {
      return `
        background: ${theme.colors.gray[200]};
        color: ${theme.colors.gray[700]};
        &:hover:not(:disabled) {
          background: ${theme.colors.gray[300]};
        }
      `;
    }
  }}
`;

const MatchHeader = styled.div`
  background: linear-gradient(to bottom right, ${theme.colors.primary[600]}, ${theme.colors.purple[600]});
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const LiveBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${theme.colors.red[500]};
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const PulseDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  background: white;
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const ScoringSection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const ScorecardCategory = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AnimatedScorecard = styled.div<{ $isAnimating?: boolean; $type?: 'boundary' | 'wicket' }>`
  animation: ${props => props.$isAnimating && props.$type === 'boundary' ? 'boundaryPulse 0.6s ease-out' : 
                      props.$isAnimating && props.$type === 'wicket' ? 'wicketShake 0.6s ease-out' : 'none'};

  @keyframes boundaryPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 4px 6px -4px rgba(59, 130, 246, 0.3);
    }
  }

  @keyframes wicketShake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-4px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(4px);
    }
  }
`;

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ScoreButton = styled.button<{ variant?: string }>`
  padding: 0.75rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${props => {
    switch (props.variant) {
      case 'dot':
        return `
          background: ${theme.colors.gray[200]};
          color: ${theme.colors.gray[700]};
          &:hover { background: ${theme.colors.gray[300]}; }
        `;
      case 'run':
        return `
          background: ${theme.colors.primary[100]};
          color: ${theme.colors.primary[700]};
          &:hover { background: ${theme.colors.primary[500]}; opacity: 0.9; }
        `;
      case 'four':
        return `
          background: ${theme.colors.green[100]};
          color: ${theme.colors.green[700]};
          &:hover { background: ${theme.colors.green[100]}; opacity: 0.8; }
        `;
      case 'six':
        return `
          background: ${theme.colors.purple[100]};
          color: ${theme.colors.purple[700]};
          &:hover { background: ${theme.colors.purple[400]}; opacity: 0.9; }
        `;
      case 'wicket':
        return `
          background: ${theme.colors.red[100]};
          color: ${theme.colors.red[700]};
          &:hover { background: ${theme.colors.red[500]}; opacity: 0.9; }
        `;
      case 'wide':
        return `
          background: ${theme.colors.amber[400]}22;
          color: ${theme.colors.orange[600]};
          &:hover { background: ${theme.colors.amber[400]}44; }
        `;
      case 'noBall':
        return `
          background: ${theme.colors.orange[400]}22;
          color: ${theme.colors.orange[600]};
          &:hover { background: ${theme.colors.orange[400]}44; }
        `;
      case 'bye':
        return `
          background: ${theme.colors.purple[100]};
          color: ${theme.colors.purple[700]};
          &:hover { background: ${theme.colors.purple[400]}; opacity: 0.9; }
        `;
      case 'legBye':
        return `
          background: ${theme.colors.purple[100]};
          color: ${theme.colors.purple[700]};
          &:hover { background: ${theme.colors.purple[400]}; opacity: 0.9; }
        `;
      default:
        return `
          background: ${theme.colors.gray[300]};
          color: ${theme.colors.gray[700]};
          &:hover { background: ${theme.colors.gray[400]}; }
        `;
    }
  }}
`;

const OverDisplay = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  padding: 1rem;
  margin-top: 1rem;
`;

const OverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-between;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const BallsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BallDisplay = styled.span<{ variant?: string }>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    if (props.variant === 'four') return theme.colors.primary[100];
    if (props.variant === 'six') return theme.colors.purple[100];
    if (props.variant === 'wicket') return theme.colors.red[100];
    return theme.colors.gray[200];
  }};
  color: ${props => {
    if (props.variant === 'four') return theme.colors.primary[700];
    if (props.variant === 'six') return theme.colors.purple[700];
    if (props.variant === 'wicket') return theme.colors.red[700];
    return theme.colors.gray[700];
  }};
`;

const ExtrasDisplay = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const BatsmenCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const BatsmenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const BatsmanCard = styled.div<{ highlighted?: boolean }>`
  padding: 1rem;
  background: ${props => props.highlighted ? theme.colors.primary[50] : theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
`;

const BatsmanName = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const BatsmanScore = styled.div<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || theme.colors.gray[900]};
`;

const BatsmanStats = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${theme.colors.gray[100]};
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: ${theme.colors.gray[600]};

  &:hover {
    background: ${theme.colors.primary[100]};
    color: ${theme.colors.primary[600]};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.gray[600]};
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[900]};
  }
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const AlertToast = styled.div<{ $type: 'success' | 'error' }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${props => props.$type === 'success' ? theme.colors.green[600] : theme.colors.red[600]};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: ${theme.borderRadius.md};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: ${theme.colors.primary[600]};
    color: white;
    &:hover {
      background: ${theme.colors.primary[700]};
    }
  ` : `
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
    &:hover {
      background: ${theme.colors.gray[200]};
    }
  `}
`;

interface ScoreboardProps {
  matchData: any;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
  onMatchUpdate?: (match: any) => void;
  onMatchEnd?: (match: any) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ matchData, setCurrentView, onMatchUpdate, onMatchEnd }) => {
  const [match] = useState(matchData);
  const [currentInnings] = useState(1);
  
  // Restore match state if resuming a pending match
  const getInitialBatsman1 = () => {
    if (matchData.batsmen && matchData.batsmen[0]) {
      return matchData.batsmen[0];
    }
    return { name: matchData.team1 ? `${matchData.team1} Player1` : 'Player1', runs: 0, balls: 0, fours: 0, sixes: 0 };
  };
  
  const getInitialBatsman2 = () => {
    if (matchData.batsmen && matchData.batsmen[1]) {
      return matchData.batsmen[1];
    }
    return { name: matchData.team1 ? `${matchData.team1} Player2` : 'Player2', runs: 0, balls: 0, fours: 0, sixes: 0 };
  };
  
  const getInitialBowler = () => {
    if (matchData.bowlers && matchData.bowlers[0]) {
      return matchData.bowlers[0];
    }
    return { name: matchData.team2 ? `${matchData.team2} Bowler1` : 'Bowler1', overs: 0, runs: 0, wickets: 0, maidens: 0 };
  };

  // Parse overs to get over number and ball number
  const parseOvers = (oversStr?: string) => {
    if (!oversStr) return { overNumber: 1, ballNumber: 0 };
    const parts = oversStr.split('.');
    const overNum = parseInt(parts[0]) || 1;
    const ballNum = parseInt(parts[1]) || 0;
    return { overNumber: overNum, ballNumber: ballNum };
  };

  const parsedOvers = parseOvers(matchData.overs);
  const initialTotalRuns = matchData.totalRuns || (matchData.team1Score ? parseInt(matchData.team1Score.split('/')[0] || '0') : 0);
  const initialWickets = matchData.wickets || (matchData.team1Score ? parseInt(matchData.team1Score.split('/')[1] || '0') : 0);

  const [currentBatsman1, setCurrentBatsman1] = useState(getInitialBatsman1());
  const [currentBatsman2, setCurrentBatsman2] = useState(getInitialBatsman2());
  const [currentBowler, setCurrentBowler] = useState(getInitialBowler());
  const [editingPlayer, setEditingPlayer] = useState<{ type: 'batsman1' | 'batsman2' | 'bowler'; name: string } | null>(null);
  const [currentOver, setCurrentOver] = useState<Array<{type: string; runs: number; display: string; isWicket: boolean}>>([]);
  const [oversHistory, setOversHistory] = useState<Array<{overNumber: number; balls: Array<{type: string; runs: number; display: string; isWicket: boolean}>; runs: number}>>(matchData.oversHistory || []);
  const [overNumber, setOverNumber] = useState(parsedOvers.overNumber);
  const [ballNumber, setBallNumber] = useState(parsedOvers.ballNumber);
  const [totalRuns, setTotalRuns] = useState(initialTotalRuns);
  const [wickets, setWickets] = useState(initialWickets);
  const [extras, setExtras] = useState({ noBalls: 0, wides: 0, byes: 0, legByes: 0 });
  const [lastActionType, setLastActionType] = useState<'boundary' | 'wicket' | null>(null);
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const autoSave = setTimeout(() => {
      saveMatchProgress();
    }, 5000);
    return () => clearTimeout(autoSave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match, totalRuns, wickets, currentOver]);

  const saveMatchProgress = () => {
    const updatedMatch = {
      ...match,
      totalRuns,
      wickets,
      currentRR: (overNumber + ballNumber / 6) > 0 ? (totalRuns / (overNumber + ballNumber / 6)).toFixed(2) : 0,
      overs: `${Math.floor((overNumber * 6 + ballNumber) / 6)}.${(overNumber * 6 + ballNumber) % 6}`,
      status: 'Live',
      updatedAt: new Date().toISOString(),
    };
    
    saveOngoingMatch(updatedMatch);
    if (onMatchUpdate) {
      onMatchUpdate(updatedMatch);
    }
    
    setShowAlert({ type: 'success', message: 'Match progress saved successfully!' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const recordBall = (ballType: string, runs: number = 0, isWicket: boolean = false) => {
    let actualRuns = runs;
    let isExtra = false;
    
    // Set animation type for boundaries or wickets
    if (runs === 4 || runs === 6) {
      setLastActionType('boundary');
      setTimeout(() => setLastActionType(null), 600);
    } else if (isWicket) {
      setLastActionType('wicket');
      setTimeout(() => setLastActionType(null), 600);
    }

    switch (ballType) {
      case 'noBall':
        actualRuns = runs + 1;
        setExtras((prev: { noBalls: number; wides: number; byes: number; legByes: number }) => ({ ...prev, noBalls: prev.noBalls + 1 }));
        isExtra = true;
        break;
      case 'wide':
        actualRuns = runs + 1;
        setExtras((prev: { noBalls: number; wides: number; byes: number; legByes: number }) => ({ ...prev, wides: prev.wides + 1 }));
        isExtra = true;
        break;
      case 'bye':
        setExtras((prev: { noBalls: number; wides: number; byes: number; legByes: number }) => ({ ...prev, byes: prev.byes + actualRuns }));
        isExtra = true;
        break;
      case 'legBye':
        setExtras((prev: { noBalls: number; wides: number; byes: number; legByes: number }) => ({ ...prev, legByes: prev.legByes + actualRuns }));
        isExtra = true;
        break;
      case 'wicket':
        isWicket = true;
        setWickets((prev: number) => prev + 1);
        break;
      default:
        break;
    }

    setTotalRuns((prev: number) => prev + actualRuns);

    if (!isExtra || ballType === 'noBall' || ballType === 'wide') {
      const onStrike = ballNumber % 2 === 0;
      if (onStrike) {
        setCurrentBatsman1((prev: { name: string; runs: number; balls: number; fours: number; sixes: number }) => ({
          ...prev,
          runs: prev.runs + actualRuns,
          balls: prev.balls + (ballType === 'noBall' || ballType === 'wide' ? 0 : 1),
          fours: prev.fours + (actualRuns === 4 ? 1 : 0),
          sixes: prev.sixes + (actualRuns === 6 ? 1 : 0),
        }));
      } else {
        setCurrentBatsman2((prev: { name: string; runs: number; balls: number; fours: number; sixes: number }) => ({
          ...prev,
          runs: prev.runs + actualRuns,
          balls: prev.balls + (ballType === 'noBall' || ballType === 'wide' ? 0 : 1),
          fours: prev.fours + (actualRuns === 4 ? 1 : 0),
          sixes: prev.sixes + (actualRuns === 6 ? 1 : 0),
        }));
      }
    }

    if (ballType !== 'bye' && ballType !== 'legBye') {
      setCurrentBowler((prev: { name: string; overs: number; runs: number; wickets: number; maidens: number }) => ({
        ...prev,
        runs: prev.runs + actualRuns,
        overs: prev.overs + (ballType === 'noBall' || ballType === 'wide' ? 0 : 1 / 6),
        wickets: prev.wickets + (isWicket ? 1 : 0),
      }));
    }

    const ballRecord = {
      type: ballType,
      runs: actualRuns,
      display: ballType === 'noBall' ? `${actualRuns}nb` : 
               ballType === 'wide' ? `${actualRuns}wd` :
               ballType === 'bye' ? `${actualRuns}b` :
               ballType === 'legBye' ? `${actualRuns}lb` :
               isWicket ? 'W' : 
               actualRuns.toString(),
      isWicket,
    };

    const updatedOver = [...currentOver, ballRecord];
    setCurrentOver(updatedOver);

    const validBalls = updatedOver.filter(b => b.type !== 'noBall' && b.type !== 'wide').length;

    if (validBalls >= 6 && ballType !== 'noBall' && ballType !== 'wide') {
      // Save completed over to history
      const completedOverRuns = updatedOver.reduce((sum, b) => sum + b.runs, 0);
    setOversHistory((prev: Array<{overNumber: number; balls: Array<{type: string; runs: number; display: string; isWicket: boolean}>; runs: number}>) => [
      {
        overNumber: overNumber,
        balls: updatedOver,
        runs: completedOverRuns
      },
      ...prev
    ].slice(0, 10)); // Keep only last 10 overs
      
      setCurrentOver([]);
      setOverNumber((prev: number) => prev + 1);
      setBallNumber(0);
    } else if (ballType === 'noBall' && actualRuns >= 1) {
      setBallNumber((prev: number) => prev + 1);
    } else if (ballType !== 'noBall' && ballType !== 'wide') {
      setBallNumber((prev: number) => prev + 1);
    }

    if ([1, 3, 5].includes(actualRuns) && ballType !== 'bye' && ballType !== 'legBye') {
      const temp = currentBatsman1;
      setCurrentBatsman1(currentBatsman2);
      setCurrentBatsman2(temp);
    }
  };

  const undoLastBall = () => {
    if (currentOver.length === 0) return;
    const lastBall = currentOver[currentOver.length - 1];
    setCurrentOver((prev: Array<{type: string; runs: number; display: string; isWicket: boolean}>) => prev.slice(0, -1));
    setTotalRuns((prev: number) => prev - lastBall.runs);
    setBallNumber((prev: number) => Math.max(0, prev - 1));
    if (lastBall.isWicket) {
      setWickets((prev: number) => Math.max(0, prev - 1));
    }
  };

  const endMatch = async () => {
    const shouldComplete = window.confirm('Do you want to mark this match as completed, or save it as pending to continue later?\n\nClick OK for Completed, Cancel for Pending.');
    
    const result = calculateResult();
    const endStatus = shouldComplete ? 'Completed' : 'Pending';
    
    const matchResult = {
      ...match,
      team1Score: match.innings?.[1] ? `${match.innings[1].runs}/${match.innings[1].wickets}` : `${totalRuns}/${wickets}`,
      team2Score: match.innings?.[2] ? `${match.innings[2].runs}/${match.innings[2].wickets}` : '0/0',
      result: shouldComplete ? result : 'Match pending - to be continued',
      date: new Date().toISOString().split('T')[0],
      status: endStatus,
      oversHistory: oversHistory,
      batsmen: [currentBatsman1, currentBatsman2],
      bowlers: [currentBowler],
    };

    if (shouldComplete) {
      await saveCompletedMatch(matchResult);
      deleteOngoingMatch(match.id);
    } else {
      // Save as pending match (keep in ongoing matches but with Pending status)
      matchResult.status = 'Pending';
      saveOngoingMatch(matchResult);
    }

    setShowAlert({ 
      type: 'success', 
      message: `Match ${endStatus.toLowerCase()} successfully! Redirecting to home...` 
    });
    
    setTimeout(() => {
      if (onMatchEnd) {
        onMatchEnd(matchResult);
      }

      if (typeof setCurrentView === 'function') {
        setCurrentView('/');
      }
    }, 2000);
  };

  const calculateResult = () => {
    const team1Runs = totalRuns;
    const team2Runs = 0;
    if (team1Runs > team2Runs) {
      return `${match.team1} won by ${team1Runs - team2Runs} runs`;
    }
    return 'Match in progress';
  };

  const getScoreDisplay = () => `${totalRuns}/${wickets}`;
  const getOversDisplay = () => `${Math.floor((overNumber * 6 + ballNumber) / 6)}.${(overNumber * 6 + ballNumber) % 6}`;

  const handleEditPlayer = (type: 'batsman1' | 'batsman2' | 'bowler') => {
    if (type === 'batsman1') {
      setEditingPlayer({ type, name: currentBatsman1.name });
    } else if (type === 'batsman2') {
      setEditingPlayer({ type, name: currentBatsman2.name });
    } else {
      setEditingPlayer({ type, name: currentBowler.name });
    }
  };

  const handleSavePlayerName = () => {
    if (!editingPlayer) return;
    
    const newName = editingPlayer.name.trim() || (editingPlayer.type === 'bowler' ? 'Bowler1' : editingPlayer.type === 'batsman1' ? 'Player1' : 'Player2');
    
    if (editingPlayer.type === 'batsman1') {
      setCurrentBatsman1({ ...currentBatsman1, name: newName });
    } else if (editingPlayer.type === 'batsman2') {
      setCurrentBatsman2({ ...currentBatsman2, name: newName });
    } else {
      setCurrentBowler({ ...currentBowler, name: newName });
    }
    
    setEditingPlayer(null);
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
  };

  const updatedMatchData = {
    ...match,
    totalRuns,
    wickets,
    currentRR: (overNumber + ballNumber / 6) > 0 ? (totalRuns / (overNumber + ballNumber / 6)).toFixed(2) : 0,
    requiredRR: null,
    target: match.target || null,
    team1Score: currentInnings === 1 ? getScoreDisplay() : match.innings?.[1]?.runs || 0,
    team2Score: currentInnings === 2 ? getScoreDisplay() : match.innings?.[2]?.runs || 0,
    overs: getOversDisplay(),
    oversHistory: oversHistory,
    batsmen: [currentBatsman1, currentBatsman2],
    bowlers: [currentBowler],
    currentInnings: {
      runs: totalRuns,
      wickets,
      overs: getOversDisplay(),
      isChasing: currentInnings === 2,
      oversHistory: oversHistory,
      partnership: {
        runs: currentBatsman1.runs + currentBatsman2.runs,
        balls: currentBatsman1.balls + currentBatsman2.balls,
        batsman1: currentBatsman1,
        batsman2: currentBatsman2,
      },
      bowlingAnalysis: [currentBowler],
      manhattan: Array.from({ length: Math.floor(match.totalOvers) }, () => Math.random() * 100),
    },
  };

  return (
    <PageContainer>
      <HeaderActions>
        <BackButton onClick={() => setCurrentView('/')}>
          <ArrowLeft size={16} />
          Back to Home
        </BackButton>
        <ActionButtons>
          <ActionButton variant="undo" onClick={undoLastBall} disabled={currentOver.length === 0} title="Undo last ball">
            <RotateCcw size={16} />
            Undo
          </ActionButton>
          <ActionButton variant="save" onClick={saveMatchProgress}>
            <Save size={16} />
            Save
          </ActionButton>
          <ActionButton variant="end" onClick={endMatch}>
            <Power size={16} />
            End Match
          </ActionButton>
        </ActionButtons>
      </HeaderActions>
      
      {showAlert && (
        <AlertToast $type={showAlert.type}>
          {showAlert.message}
        </AlertToast>
      )}

      <MatchHeader>
        <HeaderTop>
          <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>{match.venue || 'Match Venue'}</span>
          <LiveBadge>
            <PulseDot />
            LIVE - {currentInnings === 1 ? match.team1 : match.team2} Batting
          </LiveBadge>
        </HeaderTop>
        <ScoreGrid>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {currentInnings === 1 ? match.team1 : match.team2}
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{getScoreDisplay()}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{getOversDisplay()} / {match.totalOvers} overs</div>
          </div>
          {currentInnings === 2 && match.target && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Target</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{match.target}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                Need {match.target - totalRuns} runs in {(match.totalOvers * 6) - (overNumber * 6 + ballNumber)} balls
              </div>
            </div>
          )}
        </ScoreGrid>
      </MatchHeader>

      <ScoringSection>
        <SectionTitle>Record Ball</SectionTitle>
        
        <AnimatedScorecard $isAnimating={lastActionType === 'boundary'} $type="boundary">
          <ScorecardCategory>
            <CategoryTitle>🏏 Runs</CategoryTitle>
            <ButtonGrid>
              <ScoreButton variant="dot" onClick={() => recordBall('dot', 0)}>0 (Dot)</ScoreButton>
              <ScoreButton variant="run" onClick={() => recordBall('run', 1)}>1 Run</ScoreButton>
              <ScoreButton variant="run" onClick={() => recordBall('run', 2)}>2 Runs</ScoreButton>
              <ScoreButton variant="run" onClick={() => recordBall('run', 3)}>3 Runs</ScoreButton>
              <ScoreButton variant="four" onClick={() => recordBall('run', 4)}>4 (Four)</ScoreButton>
              <ScoreButton variant="six" onClick={() => recordBall('run', 6)}>6 (Six)</ScoreButton>
            </ButtonGrid>
          </ScorecardCategory>
        </AnimatedScorecard>

        <AnimatedScorecard $isAnimating={lastActionType === 'wicket'} $type="wicket">
          <ScorecardCategory>
            <CategoryTitle>🎯 Wickets</CategoryTitle>
            <ButtonGrid>
              <ScoreButton variant="wicket" onClick={() => recordBall('wicket', 0, true)}>Wicket</ScoreButton>
            </ButtonGrid>
          </ScorecardCategory>
        </AnimatedScorecard>

        <ScorecardCategory>
          <CategoryTitle>📊 Extras</CategoryTitle>
          <ButtonGrid>
            <ScoreButton variant="wide" onClick={() => recordBall('wide', 0)}>Wide</ScoreButton>
            <ScoreButton variant="noBall" onClick={() => recordBall('noBall', 0)}>No Ball</ScoreButton>
            <ScoreButton variant="bye" onClick={() => recordBall('bye', 1)}>Bye</ScoreButton>
            <ScoreButton variant="legBye" onClick={() => recordBall('legBye', 1)}>Leg Bye</ScoreButton>
          </ButtonGrid>
        </ScorecardCategory>
        <OverDisplay>
          <OverHeader>
            <span>Over {overNumber} - Current Balls:</span>
            <span style={{ fontSize: '0.875rem', color: theme.colors.gray[600] }}>
              {currentOver.filter(b => b.type !== 'noBall' && b.type !== 'wide').length} / 6
            </span>
          </OverHeader>
          <BallsContainer>
            {currentOver.map((ball, idx) => (
              <BallDisplay
                key={idx}
                variant={ball.runs === 4 ? 'four' : ball.runs === 6 ? 'six' : ball.isWicket ? 'wicket' : undefined}
              >
                {ball.display}
              </BallDisplay>
            ))}
          </BallsContainer>
        </OverDisplay>
        <ExtrasDisplay>
          <strong>Extras:</strong> {extras.noBalls} no balls, {extras.wides} wides, {extras.byes} byes, {extras.legByes} leg byes
        </ExtrasDisplay>
      </ScoringSection>

      <BatsmenCard>
        <SectionTitle>Current Batsmen</SectionTitle>
        <BatsmenGrid>
          <BatsmanCard highlighted style={{ position: 'relative' }}>
            <EditButton onClick={() => handleEditPlayer('batsman1')} title="Edit player name">
              <Edit2 size={14} />
            </EditButton>
            <BatsmanName>{currentBatsman1.name} *</BatsmanName>
            <BatsmanScore color={theme.colors.primary[600]}>{currentBatsman1.runs}</BatsmanScore>
            <BatsmanStats>
              {currentBatsman1.balls} balls | {currentBatsman1.fours} fours | {currentBatsman1.sixes} sixes
            </BatsmanStats>
          </BatsmanCard>
          <BatsmanCard style={{ position: 'relative' }}>
            <EditButton onClick={() => handleEditPlayer('batsman2')} title="Edit player name">
              <Edit2 size={14} />
            </EditButton>
            <BatsmanName>{currentBatsman2.name}</BatsmanName>
            <BatsmanScore>{currentBatsman2.runs}</BatsmanScore>
            <BatsmanStats>
              {currentBatsman2.balls} balls | {currentBatsman2.fours} fours | {currentBatsman2.sixes} sixes
            </BatsmanStats>
          </BatsmanCard>
        </BatsmenGrid>
      </BatsmenCard>

      {editingPlayer && (
        <ModalOverlay onClick={handleCancelEdit}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                Edit {editingPlayer.type === 'bowler' ? 'Bowler' : 'Batsman'} Name
              </ModalTitle>
              <CloseButton onClick={handleCancelEdit}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalInput
              type="text"
              value={editingPlayer.name}
              onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
              placeholder={editingPlayer.type === 'bowler' ? 'Enter bowler name' : 'Enter batsman name'}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSavePlayerName();
                } else if (e.key === 'Escape') {
                  handleCancelEdit();
                }
              }}
            />
            <ModalButtonGroup>
              <ModalButton variant="secondary" onClick={handleCancelEdit}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleSavePlayerName}>
                Save
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      <AdvancedStats matchData={updatedMatchData} />
    </PageContainer>
  );
};

export default Scoreboard;

