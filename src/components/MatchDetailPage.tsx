import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import AdvancedStats from './AdvancedStats';

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

const VenueText = styled.span`
  font-size: 0.875rem;
  opacity: 0.9;
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

const TeamSection = styled.div``;

const TeamName = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Score = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const Overs = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

interface MatchDetailPageProps {
  selectedMatch: any;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const MatchDetailPage: React.FC<MatchDetailPageProps> = ({ selectedMatch, setCurrentView }) => {
  if (!selectedMatch) return null;

  return (
    <PageContainer>
      <BackButton onClick={() => setCurrentView('/')}>
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>

      <MatchHeader>
        <HeaderTop>
          <VenueText>{selectedMatch.venue}</VenueText>
          <LiveBadge>
            <PulseDot />
            LIVE
          </LiveBadge>
        </HeaderTop>
        <ScoreGrid>
          <TeamSection>
            <TeamName>{selectedMatch.team1}</TeamName>
            <Score>{selectedMatch.team1Score}</Score>
            <Overs>{selectedMatch.overs} overs</Overs>
          </TeamSection>
          <TeamSection style={{ textAlign: 'right' }}>
            <TeamName>{selectedMatch.team2}</TeamName>
            <Score>{selectedMatch.team2Score}</Score>
            <Overs>
              {selectedMatch.target && selectedMatch.team2Score 
                ? `Need ${selectedMatch.target - parseInt(selectedMatch.team2Score.split('/')[0] || '0')} runs`
                : 'Not started'}
            </Overs>
          </TeamSection>
        </ScoreGrid>
      </MatchHeader>

      <AdvancedStats matchData={selectedMatch} />
    </PageContainer>
  );
};

export default MatchDetailPage;

