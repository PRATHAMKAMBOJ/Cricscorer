import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Power } from 'lucide-react';
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

const ActionButton = styled.button<{ variant?: 'save' | 'end' }>`
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  ${props => {
    if (props.variant === 'save') {
      return `
        background: ${theme.colors.primary[600]};
        color: white;
        &:hover {
          background: ${theme.colors.primary[700]};
        }
      `;
    } else {
      return `
        background: ${theme.colors.red[600]};
        color: white;
        &:hover {
          background: ${theme.colors.red[700]};
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
          &:hover { background: ${theme.colors.primary[200]}; }
        `;
      case 'four':
        return `
          background: ${theme.colors.green[100]};
          color: ${theme.colors.green[700]};
          &:hover { background: ${theme.colors.green[200]}; }
        `;
      case 'six':
        return `
          background: ${theme.colors.purple[100]};
          color: ${theme.colors.purple[700]};
          &:hover { background: ${theme.colors.purple[200]}; }
        `;
      case 'wicket':
        return `
          background: ${theme.colors.red[100]};
          color: ${theme.colors.red[700]};
          &:hover { background: ${theme.colors.red[200]}; }
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
          &:hover { background: ${theme.colors.purple[200]}; }
        `;
      case 'legBye':
        return `
          background: ${theme.colors.purple[100]};
          color: ${theme.colors.purple[700]};
          &:hover { background: ${theme.colors.purple[200]}; }
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

interface ScoreboardProps {
  matchData: any;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
  onMatchUpdate?: (match: any) => void;
  onMatchEnd?: (match: any) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ matchData, setCurrentView, onMatchUpdate, onMatchEnd }) => {
  const [match, setMatch] = useState(matchData);
  const [currentInnings] = useState(1);
  const [currentBatsman1, setCurrentBatsman1] = useState(matchData.batsmen?.[0] || { name: 'Batsman 1', runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [currentBatsman2, setCurrentBatsman2] = useState(matchData.batsmen?.[1] || { name: 'Batsman 2', runs: 0, balls: 0, fours: 0, sixes: 0 });
  const [currentBowler, setCurrentBowler] = useState(matchData.bowlers?.[0] || { name: 'Bowler 1', overs: 0, runs: 0, wickets: 0, maidens: 0 });
  const [currentOver, setCurrentOver] = useState<Array<{type: string; runs: number; display: string; isWicket: boolean}>>([]);
  const [overNumber, setOverNumber] = useState(1);
  const [ballNumber, setBallNumber] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [extras, setExtras] = useState({ noBalls: 0, wides: 0, byes: 0, legByes: 0 });

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
  };

  const recordBall = (ballType: string, runs: number = 0, isWicket: boolean = false) => {
    let actualRuns = runs;
    let isExtra = false;

    switch (ballType) {
      case 'noBall':
        actualRuns = runs + 1;
        setExtras(prev => ({ ...prev, noBalls: prev.noBalls + 1 }));
        isExtra = true;
        break;
      case 'wide':
        actualRuns = runs + 1;
        setExtras(prev => ({ ...prev, wides: prev.wides + 1 }));
        isExtra = true;
        break;
      case 'bye':
        setExtras(prev => ({ ...prev, byes: prev.byes + actualRuns }));
        isExtra = true;
        break;
      case 'legBye':
        setExtras(prev => ({ ...prev, legByes: prev.legByes + actualRuns }));
        isExtra = true;
        break;
      case 'wicket':
        isWicket = true;
        setWickets(prev => prev + 1);
        break;
      default:
        break;
    }

    setTotalRuns(prev => prev + actualRuns);

    if (!isExtra || ballType === 'noBall' || ballType === 'wide') {
      const onStrike = ballNumber % 2 === 0;
      if (onStrike) {
        setCurrentBatsman1(prev => ({
          ...prev,
          runs: prev.runs + actualRuns,
          balls: prev.balls + (ballType === 'noBall' || ballType === 'wide' ? 0 : 1),
          fours: prev.fours + (actualRuns === 4 ? 1 : 0),
          sixes: prev.sixes + (actualRuns === 6 ? 1 : 0),
        }));
      } else {
        setCurrentBatsman2(prev => ({
          ...prev,
          runs: prev.runs + actualRuns,
          balls: prev.balls + (ballType === 'noBall' || ballType === 'wide' ? 0 : 1),
          fours: prev.fours + (actualRuns === 4 ? 1 : 0),
          sixes: prev.sixes + (actualRuns === 6 ? 1 : 0),
        }));
      }
    }

    if (ballType !== 'bye' && ballType !== 'legBye') {
      setCurrentBowler(prev => ({
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

    setCurrentOver(prev => [...prev, ballRecord]);

    const validBalls = currentOver.filter(b => b.type !== 'noBall' && b.type !== 'wide').length + 
                      (ballType !== 'noBall' && ballType !== 'wide' ? 1 : 0);

    if (validBalls >= 6 && ballType !== 'noBall' && ballType !== 'wide') {
      setCurrentOver([]);
      setOverNumber(prev => prev + 1);
      setBallNumber(0);
    } else if (ballType === 'noBall' && actualRuns >= 1) {
      setBallNumber(prev => prev + 1);
    } else if (ballType !== 'noBall' && ballType !== 'wide') {
      setBallNumber(prev => prev + 1);
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
    setCurrentOver(prev => prev.slice(0, -1));
    setTotalRuns(prev => prev - lastBall.runs);
    setBallNumber(prev => Math.max(0, prev - 1));
    if (lastBall.isWicket) {
      setWickets(prev => Math.max(0, prev - 1));
    }
  };

  const endMatch = async () => {
    const result = calculateResult();
    const completedMatch = {
      ...match,
      team1Score: match.innings?.[1] ? `${match.innings[1].runs}/${match.innings[1].wickets}` : `${totalRuns}/${wickets}`,
      team2Score: match.innings?.[2] ? `${match.innings[2].runs}/${match.innings[2].wickets}` : '0/0',
      result,
      date: new Date().toISOString().split('T')[0],
      status: 'Completed',
    };

    await saveCompletedMatch(completedMatch);
    deleteOngoingMatch(match.id);

    if (onMatchEnd) {
      onMatchEnd(completedMatch);
    }

    if (typeof setCurrentView === 'function') {
      setCurrentView('/');
    }
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
    currentInnings: {
      runs: totalRuns,
      wickets,
      overs: getOversDisplay(),
      isChasing: currentInnings === 2,
      oversHistory: [{ overNumber, balls: currentOver, runs: currentOver.reduce((sum, b) => sum + b.runs, 0) }],
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
        <ButtonGrid>
          <ScoreButton variant="dot" onClick={() => recordBall('dot', 0)}>0 (Dot)</ScoreButton>
          <ScoreButton variant="run" onClick={() => recordBall('run', 1)}>1 Run</ScoreButton>
          <ScoreButton variant="run" onClick={() => recordBall('run', 2)}>2 Runs</ScoreButton>
          <ScoreButton variant="run" onClick={() => recordBall('run', 3)}>3 Runs</ScoreButton>
          <ScoreButton variant="four" onClick={() => recordBall('run', 4)}>4 (Four)</ScoreButton>
          <ScoreButton variant="six" onClick={() => recordBall('run', 6)}>6 (Six)</ScoreButton>
          <ScoreButton variant="wicket" onClick={() => recordBall('wicket', 0, true)}>Wicket</ScoreButton>
          <ScoreButton variant="wide" onClick={() => recordBall('wide', 0)}>Wide</ScoreButton>
          <ScoreButton variant="noBall" onClick={() => recordBall('noBall', 0)}>No Ball</ScoreButton>
          <ScoreButton variant="bye" onClick={() => recordBall('bye', 1)}>Bye</ScoreButton>
          <ScoreButton variant="legBye" onClick={() => recordBall('legBye', 1)}>Leg Bye</ScoreButton>
          <ScoreButton onClick={undoLastBall}>Undo</ScoreButton>
        </ButtonGrid>
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
          <BatsmanCard highlighted>
            <BatsmanName>{currentBatsman1.name} *</BatsmanName>
            <BatsmanScore color={theme.colors.primary[600]}>{currentBatsman1.runs}</BatsmanScore>
            <BatsmanStats>
              {currentBatsman1.balls} balls | {currentBatsman1.fours} fours | {currentBatsman1.sixes} sixes
            </BatsmanStats>
          </BatsmanCard>
          <BatsmanCard>
            <BatsmanName>{currentBatsman2.name}</BatsmanName>
            <BatsmanScore>{currentBatsman2.runs}</BatsmanScore>
            <BatsmanStats>
              {currentBatsman2.balls} balls | {currentBatsman2.fours} fours | {currentBatsman2.sixes} sixes
            </BatsmanStats>
          </BatsmanCard>
        </BatsmenGrid>
      </BatsmenCard>

      <AdvancedStats matchData={updatedMatchData} />
    </PageContainer>
  );
};

export default Scoreboard;

