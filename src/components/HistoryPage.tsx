import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

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

interface HistoryPageProps {
  completedMatches: any[];
  setSelectedMatch: (match: any) => void;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ completedMatches, setSelectedMatch, setCurrentView }) => {
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
        {completedMatches.map(match => (
          <MatchCard
            key={match.id}
            onClick={() => {
              setSelectedMatch(match);
              setCurrentView(`/completed/${match.id}`);
            }}
          >
            <MatchCardHeader>
              <MatchVenue>{match.venue}</MatchVenue>
              <MatchDate>{match.date}</MatchDate>
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
            <ResultBanner>
              <ResultText>{match.result}</ResultText>
            </ResultBanner>
          </MatchCard>
        ))}
      </MatchesList>
    </PageContainer>
  );
};

export default HistoryPage;

