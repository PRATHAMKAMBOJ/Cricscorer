import React from 'react';
import { TrendingUp, Target, Clock, Users, Activity, BarChart3, Award, Zap } from 'lucide-react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.gray[600]};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || theme.colors.gray[900]};
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const PartnershipCard = styled.div<{ highlighted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${props => props.highlighted ? theme.colors.primary[50] : theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: 1rem;
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
`;

const PlayerStatus = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.gray[600]};
`;

const PlayerScore = styled.div<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || theme.colors.gray[900]};
`;

const PartnershipInfo = styled.div`
  padding: 1rem;
  background: linear-gradient(to right, ${theme.colors.primary[100]}, ${theme.colors.purple[100]});
  border-radius: ${theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead``;

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

const ManhattanChart = styled.div`
  height: 12rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const Bar = styled.div<{ height: number }>`
  flex: 1;
  background: linear-gradient(to top, ${theme.colors.primary[600]}, ${theme.colors.primary[400]});
  border-radius: 0.25rem 0.25rem 0 0;
  cursor: pointer;
  transition: all 0.2s;
  height: ${props => props.height}%;

  &:hover {
    background: linear-gradient(to top, ${theme.colors.purple[600]}, ${theme.colors.purple[400]});
  }
`;

const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${theme.colors.gray[600]};
`;

const WinProbabilityBar = styled.div<{ width: number; color: string }>`
  width: ${props => props.width}%;
  height: 1rem;
  background: linear-gradient(to right, ${props => props.color}, ${props => props.color}dd);
  border-radius: 9999px;
  transition: width 0.3s;
`;

interface AdvancedStatsProps {
  matchData: any;
}

const AdvancedStats: React.FC<AdvancedStatsProps> = ({ matchData }) => {
  if (!matchData) return null;

  return (
    <StatsContainer>
      <StatsGrid>
        <StatCard>
          <StatHeader>
            <TrendingUp size={16} />
            Current RR
          </StatHeader>
          <StatValue color={theme.colors.primary[600]}>
            {matchData.currentRR || '0.00'}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatHeader>
            <Target size={16} />
            Required RR
          </StatHeader>
          <StatValue color={theme.colors.red[600]}>
            {matchData.requiredRR || 'N/A'}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatHeader>
            <Zap size={16} />
            Target
          </StatHeader>
          <StatValue color={theme.colors.purple[600]}>
            {matchData.target || 'N/A'}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatHeader>
            <Clock size={16} />
            Balls Left
          </StatHeader>
          <StatValue>88</StatValue>
        </StatCard>
      </StatsGrid>

      <SectionCard>
        <SectionTitle>Recent Overs</SectionTitle>
        <OverRow>
          <span style={{ fontWeight: 500 }}>Over 35</span>
          <BallsContainer>
            {['1', '4', '0', '1', '2', '6'].map((run, i) => (
              <Ball key={i} variant={run === '4' ? 'four' : run === '6' ? 'six' : undefined}>
                {run}
              </Ball>
            ))}
          </BallsContainer>
          <span style={{ fontWeight: 700 }}>14 runs</span>
        </OverRow>
        <OverRow>
          <span style={{ fontWeight: 500 }}>Over 34</span>
          <BallsContainer>
            {['0', '1', '1', '0', '2', '1'].map((run, i) => (
              <Ball key={i}>{run}</Ball>
            ))}
          </BallsContainer>
          <span style={{ fontWeight: 700 }}>5 runs</span>
        </OverRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <Users size={20} />
          Current Partnership
        </SectionTitle>
        <PartnershipCard highlighted>
          <div>
            <PlayerName>V. Kohli</PlayerName>
            <PlayerStatus>Batting</PlayerStatus>
          </div>
          <div style={{ textAlign: 'right' }}>
            <PlayerScore color={theme.colors.primary[600]}>67*</PlayerScore>
            <PlayerStatus>52 balls, SR: 128.8</PlayerStatus>
          </div>
        </PartnershipCard>
        <PartnershipCard>
          <div>
            <PlayerName>S. Iyer</PlayerName>
            <PlayerStatus>Batting</PlayerStatus>
          </div>
          <div style={{ textAlign: 'right' }}>
            <PlayerScore>34*</PlayerScore>
            <PlayerStatus>28 balls, SR: 121.4</PlayerStatus>
          </div>
        </PartnershipCard>
        <PartnershipInfo>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.gray[700] }}>Partnership</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.colors.purple[600] }}>101 runs (80 balls)</span>
        </PartnershipInfo>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <Activity size={20} />
          Bowling Analysis
        </SectionTitle>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Bowler</TableHeader>
              <TableHeader align="center">O</TableHeader>
              <TableHeader align="center">M</TableHeader>
              <TableHeader align="center">R</TableHeader>
              <TableHeader align="center">W</TableHeader>
              <TableHeader align="center">Econ</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            <TableRow>
              <TableCell>M. Starc</TableCell>
              <TableCell align="center">7</TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">42</TableCell>
              <TableCell align="center" style={{ fontWeight: 700, color: theme.colors.primary[600] }}>2</TableCell>
              <TableCell align="center">6.0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P. Cummins</TableCell>
              <TableCell align="center">7</TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">38</TableCell>
              <TableCell align="center" style={{ fontWeight: 700, color: theme.colors.primary[600] }}>1</TableCell>
              <TableCell align="center">5.4</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>A. Zampa</TableCell>
              <TableCell align="center">7</TableCell>
              <TableCell align="center">0</TableCell>
              <TableCell align="center">56</TableCell>
              <TableCell align="center" style={{ fontWeight: 700, color: theme.colors.primary[600] }}>1</TableCell>
              <TableCell align="center">8.0</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </SectionCard>

      <SectionCard>
        <SectionTitle>
          <BarChart3 size={20} />
          Run Rate (Manhattan)
        </SectionTitle>
        <ManhattanChart>
          {Array.from({length: 35}, (_, i) => {
            const height = Math.random() * 100;
            return (
              <Bar key={i} height={height} title={`Over ${i + 1}`} />
            );
          })}
        </ManhattanChart>
        <ChartLabels>
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>35 Overs</span>
        </ChartLabels>
      </SectionCard>

      {matchData.winProbability && (
        <SectionCard>
          <SectionTitle>
            <Award size={20} />
            Win Probability
          </SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>{matchData.team1}</span>
                <span style={{ fontWeight: 700, color: theme.colors.primary[600] }}>35%</span>
              </div>
              <div style={{ width: '100%', background: theme.colors.gray[200], borderRadius: '9999px', height: '1rem', overflow: 'hidden' }}>
                <WinProbabilityBar width={35} color={theme.colors.primary[600]} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>{matchData.team2}</span>
                <span style={{ fontWeight: 700, color: theme.colors.purple[600] }}>65%</span>
              </div>
              <div style={{ width: '100%', background: theme.colors.gray[200], borderRadius: '9999px', height: '1rem', overflow: 'hidden' }}>
                <WinProbabilityBar width={65} color={theme.colors.purple[600]} />
              </div>
            </div>
          </div>
        </SectionCard>
      )}
    </StatsContainer>
  );
};

export default AdvancedStats;


