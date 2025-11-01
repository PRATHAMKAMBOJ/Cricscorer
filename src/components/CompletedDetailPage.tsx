import React from 'react';
import { ArrowLeft, Award } from 'lucide-react';
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

const ExtrasRow = styled.div`
  padding: 1rem;
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-top: 1rem;
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

const ChartContainer = styled.div`
  height: 16rem;
  position: relative;
  margin-bottom: 1rem;
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

interface CompletedDetailPageProps {
  selectedMatch: any;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const CompletedDetailPage: React.FC<CompletedDetailPageProps> = ({ selectedMatch, setCurrentView }) => {
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
          <StatValue color={theme.colors.primary[600]}>87</StatValue>
          <StatName>J. Root</StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Best Bowling</StatLabel>
          <StatValue color={theme.colors.purple[600]}>4/45</StatValue>
          <StatName>C. Woakes</StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Sixes</StatLabel>
          <StatValue color={theme.colors.green[600]}>18</StatValue>
          <StatName>Total</StatName>
        </StatCard>
        <StatCard>
          <StatLabel>Fours</StatLabel>
          <StatValue color={theme.colors.orange[600]}>42</StatValue>
          <StatName>Total</StatName>
        </StatCard>
      </StatsGrid>

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
            <TableRow>
              <TableCell>
                <div style={{ fontWeight: 500 }}>J. Bairstow</div>
                <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>c Khan b Afridi</div>
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 700 }}>72</TableCell>
              <TableCell align="center">58</TableCell>
              <TableCell align="center">8</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">124.1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div style={{ fontWeight: 500 }}>J. Root</div>
                <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>b Rauf</div>
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 700 }}>87</TableCell>
              <TableCell align="center">74</TableCell>
              <TableCell align="center">9</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">117.6</TableCell>
            </TableRow>
          </tbody>
        </Table>
        <ExtrasRow>
          <span style={{ color: theme.colors.gray[600] }}>Extras: <span style={{ fontWeight: 600 }}>16 (lb 4, w 10, nb 2)</span></span>
          <span style={{ color: theme.colors.gray[600] }}>Total: <span style={{ fontWeight: 700, fontSize: '1.125rem', color: theme.colors.gray[900] }}>{selectedMatch.team1Score}</span></span>
        </ExtrasRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{selectedMatch.team2} Innings</SectionTitle>
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
            <TableRow>
              <TableCell>
                <div style={{ fontWeight: 500 }}>B. Azam</div>
                <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>c Buttler b Woakes</div>
              </TableCell>
              <TableCell align="center" style={{ fontWeight: 700 }}>58</TableCell>
              <TableCell align="center">52</TableCell>
              <TableCell align="center">6</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">111.5</TableCell>
            </TableRow>
          </tbody>
        </Table>
        <ExtrasRow>
          <span style={{ color: theme.colors.gray[600] }}>Extras: <span style={{ fontWeight: 600 }}>12 (lb 3, w 8, nb 1)</span></span>
          <span style={{ color: theme.colors.gray[600] }}>Total: <span style={{ fontWeight: 700, fontSize: '1.125rem', color: theme.colors.gray[900] }}>{selectedMatch.team2Score}</span></span>
        </ExtrasRow>
      </SectionCard>

      <ComparisonGrid>
        <ComparisonCard>
          <SectionTitle>Innings Comparison</SectionTitle>
          <ComparisonRow>
            <ComparisonHeader>
              <span>Runs</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: theme.colors.primary[600], fontWeight: 600 }}>334</span>
                <span style={{ color: theme.colors.purple[600], fontWeight: 600 }}>286</span>
              </div>
            </ComparisonHeader>
            <BarContainer>
              <Bar width={54} color={theme.colors.primary[600]} />
              <Bar width={46} color={theme.colors.purple[600]} />
            </BarContainer>
          </ComparisonRow>
        </ComparisonCard>
        <ComparisonCard>
          <SectionTitle>Key Partnerships</SectionTitle>
          <PartnershipCard color={theme.colors.primary[50]}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.gray[700] }}>Bairstow & Root</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: theme.colors.primary[600] }}>124</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>23.4 overs • {selectedMatch.team1}</div>
          </PartnershipCard>
          <PartnershipCard color={theme.colors.purple[50]}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.gray[700] }}>Azam & Rizwan</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: theme.colors.purple[600] }}>89</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: theme.colors.gray[600] }}>18.2 overs • {selectedMatch.team2}</div>
          </PartnershipCard>
        </ComparisonCard>
      </ComparisonGrid>

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
    </PageContainer>
  );
};

export default CompletedDetailPage;

