import React from 'react';
import { Activity, Calendar, Plus, ChevronRight, Trophy } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const GradientHeader = styled.div`
  background: linear-gradient(to bottom right, ${theme.colors.primary[600]}, ${theme.colors.purple[600]});
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContent = styled.div``;

const HeaderTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const HeaderSubtitle = styled.p`
  color: ${theme.colors.primary[100]};
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ActionCard = styled.button`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  border: 2px solid transparent;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.color || theme.colors.primary[500]};
  }
`;

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const IconWrapper = styled.div<{ $color: string; $hoverColor?: string; $iconColor: string }>`
  width: 3rem;
  height: 3rem;
  background: ${props => props.$color};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  position: relative;

  svg {
    position: relative;
    z-index: 1;
    color: ${props => props.$iconColor};
    transition: color 0.2s;
  }

  ${ActionCard}:hover & {
    background: ${props => props.$hoverColor || props.$color};
    
    svg {
      color: ${props => props.$hoverColor ? 'white' : props.$iconColor};
    }
  }
`;

const ActionTitle = styled.h3`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
`;

const ActionDescription = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const LiveMatchesSection = styled.div``;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
`;

const LiveBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const PulseDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  background: #dc2626;
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
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

const MatchHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const MatchVenue = styled.span`
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
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const Score = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary[600]};
`;

const Overs = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const MatchStats = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

interface HomePageProps {
  ongoingMatches: any[];
  setSelectedMatch: (match: any) => void;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const HomePage: React.FC<HomePageProps> = ({ ongoingMatches, setSelectedMatch, setCurrentView }) => {
  return (
    <PageContainer>
      <GradientHeader>
        <HeaderContent>
          <HeaderTitle>Cricket Score Pro</HeaderTitle>
          <HeaderSubtitle>Complete match analysis & live scoring</HeaderSubtitle>
        </HeaderContent>
        <Trophy size={64} style={{ opacity: 0.2 }} />
      </GradientHeader>

      <ActionGrid>
        <ActionCard
          onClick={() => setCurrentView('new-match')}
          color={theme.colors.primary[500]}
        >
          <ActionHeader>
            <IconWrapper $color={theme.colors.primary[100]} $hoverColor={theme.colors.primary[500]} $iconColor={theme.colors.primary[600]}>
              <Plus size={24} />
            </IconWrapper>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </ActionHeader>
          <ActionTitle>New Match</ActionTitle>
          <ActionDescription>Start scoring a new game</ActionDescription>
        </ActionCard>

        <ActionCard
          onClick={() => {
            if (ongoingMatches.length > 0) {
              setSelectedMatch(ongoingMatches[0]);
              setCurrentView(`/match/${ongoingMatches[0].id}`);
            }
          }}
          color={theme.colors.green[600]}
        >
          <ActionHeader>
            <IconWrapper $color={theme.colors.green[100]} $hoverColor={theme.colors.green[600]} $iconColor={theme.colors.green[600]}>
              <Activity size={24} />
            </IconWrapper>
            <span style={{ padding: '0.25rem 0.5rem', background: theme.colors.green[100], color: theme.colors.green[700], borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500 }}>Live</span>
          </ActionHeader>
          <ActionTitle>Current Match</ActionTitle>
          <ActionDescription>View live scoring</ActionDescription>
        </ActionCard>

        <ActionCard
          onClick={() => setCurrentView('history')}
          color={theme.colors.purple[500]}
        >
          <ActionHeader>
            <IconWrapper $color={theme.colors.purple[100]} $hoverColor={theme.colors.purple[500]} $iconColor={theme.colors.purple[600]}>
              <Calendar size={24} />
            </IconWrapper>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </ActionHeader>
          <ActionTitle>Match History</ActionTitle>
          <ActionDescription>View past matches</ActionDescription>
        </ActionCard>
      </ActionGrid>

      {ongoingMatches.length > 0 && (
        <LiveMatchesSection>
          <SectionHeader>
            <SectionTitle>Live Matches</SectionTitle>
            <LiveBadge>
              <PulseDot />
              {ongoingMatches.filter((m: any) => m.status === 'Live').length} Live
            </LiveBadge>
          </SectionHeader>
          {ongoingMatches.filter((m: any) => m.status === 'Live' || m.status === 'Pending').map(match => {
            // Check if user is creator for pending matches
            const getUserId = () => {
              let userId = localStorage.getItem('cricscorer_user_id');
              if (!userId) {
                userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                localStorage.setItem('cricscorer_user_id', userId);
              }
              return userId;
            };
            
            const canAccessPending = match.status !== 'Pending' || match.creatorId === getUserId();
            
            return (
            <MatchCard
              key={match.id}
              onClick={() => {
                if (!canAccessPending) {
                  alert('Only the match creator can access pending matches.');
                  return;
                }
                
                if (match.status === 'Pending') {
                  // Resume pending match
                  setSelectedMatch(match);
                  setCurrentView({ view: `/scoreboard/${match.id}`, matchData: match });
                } else {
                  setSelectedMatch(match);
                  setCurrentView(`/match/${match.id}`);
                }
              }}
              style={{ opacity: canAccessPending ? 1 : 0.6 }}
            >
              <MatchHeader>
                <MatchVenue>{match.venue}</MatchVenue>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  background: match.status === 'Pending' ? theme.colors.amber[100] : theme.colors.red[100], 
                  color: match.status === 'Pending' ? theme.colors.amber[700] : theme.colors.red[600], 
                  borderRadius: '9999px', 
                  fontSize: '0.75rem', 
                  fontWeight: 500 
                }}>
                  {match.status === 'Pending' ? 'PENDING' : 'LIVE'}
                </span>
              </MatchHeader>
              <MatchScoreGrid>
                <ScoreSection>
                  <TeamName>{match.team1}</TeamName>
                  <Score>{match.team1Score}</Score>
                  <Overs>{match.overs} overs</Overs>
                </ScoreSection>
                <ScoreSection style={{ textAlign: 'right' }}>
                  <TeamName>{match.team2}</TeamName>
                  <Score style={{ color: '#1f2937' }}>{match.team2Score || '0/0'}</Score>
                  <Overs>
                    {match.target && match.team2Score 
                      ? `Need ${match.target - parseInt(match.team2Score.split('/')[0] || '0')} runs`
                      : match.overs ? `${match.overs} overs` : 'Not started'}
                  </Overs>
                </ScoreSection>
              </MatchScoreGrid>
              <MatchStats>
                <span>CRR: <strong style={{ color: '#1f2937' }}>{match.currentRR}</strong></span>
                <span>RRR: <strong style={{ color: theme.colors.red[600] }}>{match.requiredRR}</strong></span>
              </MatchStats>
            </MatchCard>
            );
          })}
        </LiveMatchesSection>
      )}
    </PageContainer>
  );
};

export default HomePage;

