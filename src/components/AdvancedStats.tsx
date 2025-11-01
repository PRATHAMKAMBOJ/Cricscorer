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

const LineChartContainer = styled.div`
  height: 12rem;
  position: relative;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0;
`;

const LineChartSvg = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const ChartGrid = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const GridLine = styled.div`
  border-top: 1px solid ${theme.colors.gray[200]};
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
          <StatValue>
            {matchData.totalOvers && matchData.overs ? (
              (() => {
                const totalBalls = matchData.totalOvers * 6;
                const currentBalls = parseFloat(matchData.overs) * 6;
                const ballsLeft = Math.max(0, Math.floor(totalBalls - currentBalls));
                return ballsLeft;
              })()
            ) : 'N/A'}
          </StatValue>
        </StatCard>
      </StatsGrid>

      <SectionCard>
        <SectionTitle>Recent Overs</SectionTitle>
        {matchData.oversHistory && matchData.oversHistory.length > 0 ? (
          matchData.oversHistory.slice(0, 5).map((over: {overNumber: number; balls: Array<{type: string; runs: number; display: string; isWicket: boolean}>; runs: number}) => (
            <OverRow key={over.overNumber}>
              <span style={{ fontWeight: 500 }}>Over {over.overNumber}</span>
              <BallsContainer>
                {over.balls.map((ball, i) => (
                  <Ball 
                    key={i} 
                    variant={ball.runs === 4 ? 'four' : ball.runs === 6 ? 'six' : ball.isWicket ? 'wicket' : undefined}
                  >
                    {ball.display}
                  </Ball>
                ))}
              </BallsContainer>
              <span style={{ fontWeight: 700 }}>{over.runs} {over.runs === 1 ? 'run' : 'runs'}</span>
            </OverRow>
          ))
        ) : (
          <OverRow>
            <span style={{ color: theme.colors.gray[600], fontStyle: 'italic' }}>No overs recorded yet</span>
          </OverRow>
        )}
      </SectionCard>

      {matchData.batsmen && matchData.batsmen.length > 0 && (
        <SectionCard>
          <SectionTitle>
            <Users size={20} />
            Current Partnership
          </SectionTitle>
          {matchData.batsmen.slice(0, 2).map((batsman: any, idx: number) => {
            const strikeRate = batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(1) : '0.0';
            return (
              <PartnershipCard key={idx} highlighted={idx === 0}>
                <div>
                  <PlayerName>{batsman.name} {idx === 0 ? '*' : ''}</PlayerName>
                  <PlayerStatus>Batting</PlayerStatus>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <PlayerScore color={idx === 0 ? theme.colors.primary[600] : undefined}>
                    {batsman.runs}{idx === 0 ? '*' : ''}
                  </PlayerScore>
                  <PlayerStatus>
                    {batsman.balls} balls, SR: {strikeRate}
                  </PlayerStatus>
                </div>
              </PartnershipCard>
            );
          })}
          {matchData.batsmen && matchData.batsmen.length >= 2 && (
            <PartnershipInfo>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.gray[700] }}>Partnership</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.colors.purple[600] }}>
                {matchData.batsmen[0].runs + matchData.batsmen[1].runs} runs 
                ({matchData.batsmen[0].balls + matchData.batsmen[1].balls} balls)
              </span>
            </PartnershipInfo>
          )}
        </SectionCard>
      )}

      {matchData.bowlers && matchData.bowlers.length > 0 && (
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
              {matchData.bowlers.map((bowler: any, idx: number) => {
                const oversDisplay = Math.floor(bowler.overs) + '.' + (Math.round((bowler.overs % 1) * 6));
                const economy = bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : '0.00';
                return (
                  <TableRow key={idx}>
                    <TableCell>{bowler.name}</TableCell>
                    <TableCell align="center">{oversDisplay}</TableCell>
                    <TableCell align="center">{bowler.maidens || 0}</TableCell>
                    <TableCell align="center">{bowler.runs || 0}</TableCell>
                    <TableCell align="center" style={{ fontWeight: 700, color: bowler.wickets > 0 ? theme.colors.primary[600] : undefined }}>
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

      <SectionCard>
        <SectionTitle>
          <BarChart3 size={20} />
          Run Rate (Line Graph)
        </SectionTitle>
        <LineChartContainer>
          <ChartGrid>
            {[0, 1, 2, 3, 4].map((i) => (
              <GridLine key={i} />
            ))}
          </ChartGrid>
          <LineChartSvg viewBox="0 0 350 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme.colors.primary[600]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={theme.colors.primary[600]} stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {(() => {
              // Use actual run rate data from overs history
              let dataPoints: Array<{x: number; y: number; value: number}> = [];
              
              if (matchData.oversHistory && matchData.oversHistory.length > 0) {
                // Calculate run rate for each completed over
                const runsArray = matchData.oversHistory.map((over: any) => over.runs || 0);
                const maxRuns = Math.max(...runsArray, 12); // Use 12 as minimum to show range (0-12)
                const minRuns = Math.min(...runsArray, 0);
                const range = maxRuns - minRuns || 12;
                const maxHeight = 100;
                const padding = 10;
                const availableHeight = maxHeight - padding * 2;
                
                dataPoints = matchData.oversHistory.slice().reverse().map((over: any, i: number) => {
                  const normalizedRuns = ((over.runs || 0) - minRuns) / range;
                  return {
                    x: (i / Math.max(matchData.oversHistory.length - 1, 1)) * 350,
                    y: padding + (availableHeight - normalizedRuns * availableHeight),
                    value: over.runs || 0
                  };
                });
              } else if (matchData.oversHistory && matchData.oversHistory.length === 0 && matchData.currentRR) {
                // If no overs history but have current RR, show single point
                const rr = parseFloat(String(matchData.currentRR)) || 0;
                dataPoints = [{ x: 175, y: 60, value: rr }];
              }
              
              if (dataPoints.length === 0) {
                return <text x="175" y="60" textAnchor="middle" fontSize="12" fill={theme.colors.gray[400]}>No data</text>;
              }
              
              const pathData = dataPoints.map((point, i) => 
                `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
              ).join(' ');
              
              const areaPath = `${pathData} L ${dataPoints[dataPoints.length - 1].x} 120 L 0 120 Z`;
              
              return (
                <>
                  <path
                    d={areaPath}
                    fill="url(#lineGradient)"
                  />
                  <path
                    d={pathData}
                    fill="none"
                    stroke={theme.colors.primary[600]}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {dataPoints.map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill={theme.colors.primary[600]}
                      stroke="white"
                      strokeWidth="2"
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                  {dataPoints.map((point, i) => (
                    <line
                      key={`line-${i}`}
                      x1={point.x}
                      y1={point.y}
                      x2={point.x}
                      y2={120}
                      stroke={theme.colors.gray[200]}
                      strokeWidth="0.5"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  ))}
                </>
              );
            })()}
          </LineChartSvg>
        </LineChartContainer>
        <ChartLabels>
          <span>
            {(() => {
              if (matchData.oversHistory && matchData.oversHistory.length > 0) {
                const runsArray = matchData.oversHistory.map((over: any) => over.runs || 0);
                const minRuns = Math.min(...runsArray, 0);
                return `0 runs (Min: ${minRuns})`;
              }
              return '0';
            })()}
          </span>
          <span>
            {(() => {
              if (matchData.oversHistory && matchData.oversHistory.length > 0) {
                const runsArray = matchData.oversHistory.map((over: any) => over.runs || 0);
                const maxRuns = Math.max(...runsArray, 12);
                return `${maxRuns} runs (Max)`;
              }
              return matchData.overs ? matchData.overs : '12';
            })()}
          </span>
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


