import React, { useState } from 'react';
import { ArrowLeft, Award, List, X } from 'lucide-react';
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

const MatchHeader = styled.div`
  background: linear-gradient(to bottom right, ${theme.colors.green[600]}, #059669);
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

const DateBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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

const ResultBanner = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 0.75rem;
  text-align: center;
`;

const ResultText = styled.p`
  font-weight: 700;
  font-size: 1.125rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || theme.colors.gray[900]};
`;

const StatName = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const SectionCard = styled.div`
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray[200]};
  transition: background 0.2s;

  &:hover {
    background: ${theme.colors.gray[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled.th`
  text-align: ${props => props.align || 'left'};
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.gray[600]};
`;

const TableCell = styled.td`
  text-align: ${props => props.align || 'left'};
  padding: 0.75rem;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ComparisonCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const ComparisonRow = styled.div`
  margin-bottom: 1rem;
`;

const ComparisonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const BarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2rem;
`;

const Bar = styled.div<{ width: number; color: string }>`
  background: ${props => props.color};
  border-radius: 0.25rem;
  width: ${props => props.width}%;
`;

const PartnershipCard = styled.div<{ color: string }>`
  padding: 0.75rem;
  background: ${props => props.color};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 0.75rem;
`;

const MOTMCard = styled.div`
  background: linear-gradient(to bottom right, ${theme.colors.amber[400]}, ${theme.colors.orange[500]});
  border-radius: 1rem;
  padding: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconCircle = styled.div`
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MOTMContent = styled.div`
  flex: 1;
`;

const MOTMLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
`;

const MOTMName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const MOTMStats = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const ViewOversButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary[600]};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin: 1rem 0;

  &:hover {
    background: ${theme.colors.primary[700]};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
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

const OverRowModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 0.75rem;
`;

const BallsContainerModal = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BallModal = styled.span<{ variant?: 'four' | 'six' | 'wicket' }>`
  width: 2rem;
  height: 2rem;
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

const OverRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 0.75rem;
`;

const BallsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Ball = styled.span<{ variant?: 'four' | 'six' | 'wicket' }>`
  width: 2rem;
  height: 2rem;
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

interface CompletedDetailPageProps {
  selectedMatch: any;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const CompletedDetailPage: React.FC<CompletedDetailPageProps> = ({ selectedMatch, setCurrentView }) => {
  const [showOversModal, setShowOversModal] = useState(false);

  if (!selectedMatch) return null;

  return (
    <PageContainer>
      <BackButton onClick={() => setCurrentView('/history')}>
        <ArrowLeft size={16} />
        Back to History
      </BackButton>

      <MatchHeader>
        <HeaderTop>
          <VenueText>{selectedMatch.venue}</VenueText>
          <DateBadge>{selectedMatch.date}</DateBadge>
        </HeaderTop>
        <ScoreGrid>
          <TeamSection>
            <TeamName>{selectedMatch.team1}</TeamName>
            <Score>{selectedMatch.team1Score}</Score>
            <Overs>50 overs</Overs>
          </TeamSection>
          <TeamSection style={{ textAlign: 'right' }}>
            <TeamName>{selectedMatch.team2}</TeamName>
            <Score>{selectedMatch.team2Score}</Score>
            <Overs>48.3 overs</Overs>
          </TeamSection>
        </ScoreGrid>
        <ResultBanner>
          <ResultText>{selectedMatch.result}</ResultText>
        </ResultBanner>
      </MatchHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Highest Score</StatLabel>
          <StatValue color={theme.colors.primary[600]}>
            {selectedMatch.batsmen && selectedMatch.batsmen.length > 0
              ? Math.max(...selectedMatch.batsmen.map((b: any) => b.runs || 0))
              : 0}
          </StatValue>
          <StatName>
            {selectedMatch.batsmen && selectedMatch.batsmen.length > 0
              ? selectedMatch.batsmen.reduce((max: any, b: any) => (b.runs || 0) > (max.runs || 0) ? b : max, selectedMatch.batsmen[0])?.name || 'N/A'
              : 'N/A'}
          </StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Best Bowling</StatLabel>
          <StatValue color={theme.colors.purple[600]}>
            {(() => {
              if (!selectedMatch.bowlers || selectedMatch.bowlers.length === 0) return '0/0';
              const bestBowler = selectedMatch.bowlers.reduce((best: any, bowler: any) => {
                const bestWickets = best.wickets || 0;
                const bowlerWickets = bowler.wickets || 0;
                if (bowlerWickets > bestWickets) return bowler;
                if (bowlerWickets === bestWickets && (bowler.runs || 0) < (best.runs || 999)) return bowler;
                return best;
              }, selectedMatch.bowlers[0]);
              return `${bestBowler.wickets || 0}/${bestBowler.runs || 0}`;
            })()}
          </StatValue>
          <StatName>
            {selectedMatch.bowlers && selectedMatch.bowlers.length > 0
              ? selectedMatch.bowlers.reduce((best: any, bowler: any) => {
                  const bestWickets = best.wickets || 0;
                  const bowlerWickets = bowler.wickets || 0;
                  if (bowlerWickets > bestWickets) return bowler;
                  if (bowlerWickets === bestWickets && (bowler.runs || 0) < (best.runs || 999)) return bowler;
                  return best;
                }, selectedMatch.bowlers[0])?.name || 'N/A'
              : 'N/A'}
          </StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Sixes</StatLabel>
          <StatValue color={theme.colors.green[600]}>
            {selectedMatch.batsmen && selectedMatch.batsmen.length > 0
              ? selectedMatch.batsmen.reduce((sum: number, b: any) => sum + (b.sixes || 0), 0)
              : 0}
          </StatValue>
          <StatName>Total</StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Fours</StatLabel>
          <StatValue color={theme.colors.orange[600]}>
            {selectedMatch.batsmen && selectedMatch.batsmen.length > 0
              ? selectedMatch.batsmen.reduce((sum: number, b: any) => sum + (b.fours || 0), 0)
              : 0}
          </StatValue>
          <StatName>Total</StatName>
        </StatCard>
      </StatsGrid>

      {selectedMatch.batsmen && selectedMatch.batsmen.length > 0 && (
        <SectionCard>
          <SectionTitle>{selectedMatch.team1} Innings</SectionTitle>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Batsman</TableHeader>
                <TableHeader align="center">R</TableHeader>
                <TableHeader align="center">B</TableHeader>
                <TableHeader align="center">4s</TableHeader>
                <TableHeader align="center">6s</TableHeader>
                <TableHeader align="center">SR</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {selectedMatch.batsmen.map((batsman: any, idx: number) => {
                const strikeRate = batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(1) : '0.0';
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <div style={{ fontWeight: 500 }}>{batsman.name}</div>
                      <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>Not out</div>
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 700 }}>{batsman.runs || 0}</TableCell>
                    <TableCell align="center">{batsman.balls || 0}</TableCell>
                    <TableCell align="center">{batsman.fours || 0}</TableCell>
                    <TableCell align="center">{batsman.sixes || 0}</TableCell>
                    <TableCell align="center">{strikeRate}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </SectionCard>
      )}

      {selectedMatch.bowlers && selectedMatch.bowlers.length > 0 && (
        <SectionCard>
          <SectionTitle>Bowling Analysis</SectionTitle>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Bowler</TableHeader>
                <TableHeader align="center">O</TableHeader>
                <TableHeader align="center">M</TableHeader>
                <TableHeader align="center">R</TableHeader>
                <TableHeader align="center">W</TableHeader>
                <TableHeader align="center">Econ</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {selectedMatch.bowlers.map((bowler: any, idx: number) => {
                const oversDisplay = Math.floor(bowler.overs || 0) + '.' + (Math.round(((bowler.overs || 0) % 1) * 6));
                const economy = (bowler.overs || 0) > 0 ? ((bowler.runs || 0) / (bowler.overs || 1)).toFixed(2) : '0.00';
                return (
                  <TableRow key={idx}>
                    <TableCell>{bowler.name}</TableCell>
                    <TableCell align="center">{oversDisplay}</TableCell>
                    <TableCell align="center">{bowler.maidens || 0}</TableCell>
                    <TableCell align="center">{bowler.runs || 0}</TableCell>
                    <TableCell align="center" style={{ fontWeight: 700, color: (bowler.wickets || 0) > 0 ? theme.colors.primary[600] : undefined }}>
                      {bowler.wickets || 0}
                    </TableCell>
                    <TableCell align="center">{economy}</TableCell>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </SectionCard>
      )}

      <ComparisonGrid>
        <ComparisonCard>
          <SectionTitle>Innings Comparison</SectionTitle>
          <ComparisonRow>
            <ComparisonHeader>
              <span>Runs</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: theme.colors.primary[600], fontWeight: 600 }}>
                  {selectedMatch.team1Score ? parseInt(selectedMatch.team1Score.split('/')[0] || '0') : 0}
                </span>
                <span style={{ color: theme.colors.purple[600], fontWeight: 600 }}>
                  {selectedMatch.team2Score ? parseInt(selectedMatch.team2Score.split('/')[0] || '0') : 0}
                </span>
              </div>
            </ComparisonHeader>
            <BarContainer>
              {(() => {
                const team1Runs = selectedMatch.team1Score ? parseInt(selectedMatch.team1Score.split('/')[0] || '0') : 0;
                const team2Runs = selectedMatch.team2Score ? parseInt(selectedMatch.team2Score.split('/')[0] || '0') : 0;
                const totalRuns = team1Runs + team2Runs || 1;
                const team1Percent = (team1Runs / totalRuns) * 100;
                const team2Percent = (team2Runs / totalRuns) * 100;
                return (
                  <>
                    <Bar width={team1Percent} color={theme.colors.primary[600]} />
                    <Bar width={team2Percent} color={theme.colors.purple[600]} />
                  </>
                );
              })()}
            </BarContainer>
          </ComparisonRow>
        </ComparisonCard>
        <ComparisonCard>
          <SectionTitle>Key Partnerships</SectionTitle>
          {selectedMatch.batsmen && selectedMatch.batsmen.length >= 2 && (
            <PartnershipCard color={theme.colors.primary[50]}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.gray[700] }}>
                  {selectedMatch.batsmen[0]?.name} & {selectedMatch.batsmen[1]?.name}
                </span>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, color: theme.colors.primary[600] }}>
                  {(selectedMatch.batsmen[0]?.runs || 0) + (selectedMatch.batsmen[1]?.runs || 0)}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>
                {(selectedMatch.batsmen[0]?.balls || 0) + (selectedMatch.batsmen[1]?.balls || 0)} balls • {selectedMatch.team1}
              </div>
            </PartnershipCard>
          )}
        </ComparisonCard>
      </ComparisonGrid>

      {selectedMatch.oversHistory && selectedMatch.oversHistory.length > 0 && (
        <SectionCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <SectionTitle>Match Overs</SectionTitle>
            <ViewOversButton onClick={() => setShowOversModal(true)}>
              <List size={16} />
              View All Overs
            </ViewOversButton>
          </div>
          {selectedMatch.oversHistory.slice(0, 5).map((over: any) => (
            <OverRow key={over.overNumber}>
              <span style={{ fontWeight: 500 }}>Over {over.overNumber}</span>
              <BallsContainer>
                {over.balls.map((ball: any, i: number) => (
                  <Ball key={i} variant={ball.runs === 4 ? 'four' : ball.runs === 6 ? 'six' : ball.isWicket ? 'wicket' : undefined}>
                    {ball.display}
                  </Ball>
                ))}
              </BallsContainer>
              <span style={{ fontWeight: 700 }}>{over.runs} {over.runs === 1 ? 'run' : 'runs'}</span>
            </OverRow>
          ))}
        </SectionCard>
      )}

      <MOTMCard>
        <IconCircle>
          <Award size={32} />
        </IconCircle>
        <MOTMContent>
          <MOTMLabel>Man of the Match</MOTMLabel>
          <MOTMName>Harry Brook</MOTMName>
          <MOTMStats>65* (47) & 2 catches</MOTMStats>
        </MOTMContent>
      </MOTMCard>

      {showOversModal && selectedMatch.oversHistory && (
        <ModalOverlay onClick={() => setShowOversModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>All Overs - {selectedMatch.team1} vs {selectedMatch.team2}</ModalTitle>
              <CloseButton onClick={() => setShowOversModal(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {selectedMatch.oversHistory.slice().reverse().map((over: any) => (
                <OverRowModal key={over.overNumber}>
                  <span style={{ fontWeight: 600, minWidth: '80px' }}>Over {over.overNumber}</span>
                  <BallsContainerModal>
                    {over.balls.map((ball: any, i: number) => (
                      <BallModal key={i} variant={ball.runs === 4 ? 'four' : ball.runs === 6 ? 'six' : ball.isWicket ? 'wicket' : undefined}>
                        {ball.display}
                      </BallModal>
                    ))}
                  </BallsContainerModal>
                  <span style={{ fontWeight: 700, color: theme.colors.primary[600], minWidth: '80px', textAlign: 'right' }}>
                    {over.runs} {over.runs === 1 ? 'run' : 'runs'}
                  </span>
                </OverRowModal>
              ))}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default CompletedDetailPage;

