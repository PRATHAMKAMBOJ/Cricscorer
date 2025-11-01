import React from 'react';
import { ArrowLeft, Power, MoreVertical } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { deleteOngoingMatch, saveCompletedMatch, getOngoingMatches } from '../services/matchService';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MatchCard = styled.button`
  width: 100%;
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  border: 2px solid transparent;
  text-align: left;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.primary[500]};
  }
`;

const MatchCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MatchVenue = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const MatchDate = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const MatchScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ScoreSection = styled.div``;

const TeamName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Score = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.gray[900]};
`;

const ResultBanner = styled.div`
  padding: 0.75rem;
  background: ${theme.colors.green[50]};
  border-radius: ${theme.borderRadius.md};
`;

const ResultText = styled.p`
  color: ${theme.colors.green[700]};
  font-weight: 500;
  text-align: center;
`;

const MatchActions = styled.div`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ActionMenuButton = styled.button`
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
    background: ${theme.colors.gray[200]};
    color: ${theme.colors.gray[900]};
  }
`;

const ActionMenu = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 150px;
  z-index: 100;
  display: ${props => props.$visible ? 'block' : 'none'};
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.gray[700]};
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.red[600]};
  }
`;

interface HistoryPageProps {
  completedMatches: any[];
  setSelectedMatch: (match: any) => void;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ completedMatches, setSelectedMatch, setCurrentView }) => {
  const [openMenuId, setOpenMenuId] = React.useState<number | null>(null);

  const getUserId = () => {
    let userId = localStorage.getItem('cricscorer_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cricscorer_user_id', userId);
    }
    return userId;
  };

  const handleEndMatch = async (match: any) => {
    if (match.creatorId !== getUserId()) {
      alert('Only the match creator can end this match.');
      return;
    }

    if (!window.confirm(`Are you sure you want to end this match?\n\n${match.team1} vs ${match.team2}`)) {
      return;
    }

    const result = calculateMatchResult(match);
    const completedMatch = {
      ...match,
      status: 'Completed' as const,
      result,
      date: new Date().toISOString().split('T')[0],
    };

    await saveCompletedMatch(completedMatch);
    deleteOngoingMatch(match.id);
    setOpenMenuId(null);
    
    // Reload matches
    window.location.reload();
  };

  const calculateMatchResult = (match: any) => {
    const team1Score = parseInt(match.team1Score?.split('/')[0] || '0');
    const team2Score = parseInt(match.team2Score?.split('/')[0] || '0');
    
    if (team1Score > team2Score) {
      return `${match.team1} won by ${team1Score - team2Score} runs`;
    } else if (team2Score > team1Score) {
      return `${match.team2} won by ${team2Score - team1Score} runs`;
    }
    return 'Match tied';
  };

  // Get ongoing matches to check for pending/live matches
  const ongoingMatches = getOngoingMatches();
  const allMatches = [...completedMatches, ...ongoingMatches.filter(m => m.status === 'Pending')];

  return (
    <PageContainer>
      <BackButton onClick={() => setCurrentView('/')}>
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>

      <PageHeader>
        <PageTitle>Match History</PageTitle>
        <FilterSelect>
          <option>All Matches</option>
          <option>Last 7 Days</option>
          <option>Last Month</option>
        </FilterSelect>
      </PageHeader>

      <MatchesList>
        {allMatches.map(match => (
          <MatchCard
            key={match.id}
            onClick={() => {
              if (match.status === 'Pending' && match.creatorId === getUserId()) {
                // Allow creator to resume pending match
                setSelectedMatch(match);
                setCurrentView({ view: `/scoreboard/${match.id}`, matchData: match });
              } else {
                setSelectedMatch(match);
                setCurrentView(`/completed/${match.id}`);
              }
            }}
          >
            <MatchCardHeader>
              <MatchVenue>{match.venue}</MatchVenue>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {match.status === 'Pending' && (
                  <span style={{ padding: '0.25rem 0.5rem', background: theme.colors.amber[100], color: theme.colors.amber[700], borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>
                    PENDING
                  </span>
                )}
                <MatchDate>{match.date || match.createdAt?.split('T')[0]}</MatchDate>
                {(match.status === 'Live' || match.status === 'Pending') && match.creatorId === getUserId() && (
                  <MatchActions onClick={(e) => e.stopPropagation()}>
                    <ActionMenuButton onClick={() => setOpenMenuId(openMenuId === match.id ? null : match.id)}>
                      <MoreVertical size={16} />
                    </ActionMenuButton>
                    <ActionMenu $visible={openMenuId === match.id}>
                      <MenuItem onClick={() => handleEndMatch(match)}>
                        <Power size={16} />
                        End Match
                      </MenuItem>
                    </ActionMenu>
                  </MatchActions>
                )}
              </div>
            </MatchCardHeader>
            <MatchScoreGrid>
              <ScoreSection>
                <TeamName>{match.team1}</TeamName>
                <Score>{match.team1Score}</Score>
              </ScoreSection>
              <ScoreSection style={{ textAlign: 'right' }}>
                <TeamName>{match.team2}</TeamName>
                <Score>{match.team2Score}</Score>
              </ScoreSection>
            </MatchScoreGrid>
            <ResultBanner style={{ 
              background: match.status === 'Pending' ? theme.colors.amber[50] : theme.colors.green[50] 
            }}>
              <ResultText style={{ 
                color: match.status === 'Pending' ? theme.colors.amber[700] : theme.colors.green[700] 
              }}>
                {match.status === 'Pending' ? 'Pending - Click to resume' : match.result}
              </ResultText>
            </ResultBanner>
          </MatchCard>
        ))}
      </MatchesList>
    </PageContainer>
  );
};

export default HistoryPage;

