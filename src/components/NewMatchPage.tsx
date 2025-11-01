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

const FormCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid ${props => props.active ? theme.colors.primary[500] : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.active ? theme.colors.primary[50] : 'white'};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary[500]};
    background: ${theme.colors.primary[50]};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.purple[600]});
  color: white;
  padding: 1rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }
`;

interface NewMatchPageProps {
  newMatchData: any;
  setNewMatchData: (data: any) => void;
  setCurrentView: (view: string | { view: string; matchData?: any }) => void;
}

const NewMatchPage: React.FC<NewMatchPageProps> = ({ newMatchData, setNewMatchData, setCurrentView }) => {
  const handleStartMatch = () => {
    if (!newMatchData.team1 || !newMatchData.team2) {
      alert('Please enter both team names');
      return;
    }
    const matchData = {
      id: Date.now(),
      team1: newMatchData.team1,
      team2: newMatchData.team2,
      matchType: newMatchData.matchType,
      totalOvers: parseInt(newMatchData.overs) || 20,
      venue: newMatchData.venue || 'TBD',
      tossWinner: newMatchData.tossWinner,
      elected: newMatchData.elected,
      status: 'Live',
      createdAt: new Date().toISOString(),
      batsmen: [
        { name: `${newMatchData.team1} Player 1`, runs: 0, balls: 0, fours: 0, sixes: 0 },
        { name: `${newMatchData.team1} Player 2`, runs: 0, balls: 0, fours: 0, sixes: 0 },
      ],
      bowlers: [
        { name: `${newMatchData.team2} Bowler 1`, overs: 0, runs: 0, wickets: 0, maidens: 0 },
      ],
    };
      setCurrentView({ view: `/scoreboard/${matchData.id}`, matchData });
  };

  return (
    <PageContainer>
      <BackButton onClick={() => setCurrentView('/')}>
        <ArrowLeft size={16} />
        Back to Home
      </BackButton>

      <FormCard>
        <FormTitle>Create New Match</FormTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormGrid>
            <FormField>
              <Label>Team 1</Label>
              <Input
                type="text"
                placeholder="Enter team name"
                value={newMatchData.team1}
                onChange={(e) => setNewMatchData({...newMatchData, team1: e.target.value})}
              />
            </FormField>
            <FormField>
              <Label>Team 2</Label>
              <Input
                type="text"
                placeholder="Enter team name"
                value={newMatchData.team2}
                onChange={(e) => setNewMatchData({...newMatchData, team2: e.target.value})}
              />
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField>
              <Label>Match Type</Label>
              <Select
                value={newMatchData.matchType}
                onChange={(e) => setNewMatchData({...newMatchData, matchType: e.target.value})}
              >
                <option>T20</option>
                <option>ODI</option>
                <option>Test</option>
              </Select>
            </FormField>
            <FormField>
              <Label>Overs</Label>
              <Input
                type="number"
                placeholder="20"
                value={newMatchData.overs}
                onChange={(e) => setNewMatchData({...newMatchData, overs: e.target.value})}
              />
            </FormField>
          </FormGrid>

          <FormField>
            <Label>Venue</Label>
            <Input
              type="text"
              placeholder="Enter venue"
              value={newMatchData.venue}
              onChange={(e) => setNewMatchData({...newMatchData, venue: e.target.value})}
            />
          </FormField>

          <FormField>
            <Label>Toss Winner</Label>
            <ButtonGroup>
              <ToggleButton
                active={newMatchData.tossWinner === 'team1'}
                onClick={() => setNewMatchData({...newMatchData, tossWinner: 'team1'})}
              >
                Team 1
              </ToggleButton>
              <ToggleButton
                active={newMatchData.tossWinner === 'team2'}
                onClick={() => setNewMatchData({...newMatchData, tossWinner: 'team2'})}
              >
                Team 2
              </ToggleButton>
            </ButtonGroup>
          </FormField>

          <FormField>
            <Label>Elected to</Label>
            <ButtonGroup>
              <ToggleButton
                active={newMatchData.elected === 'bat'}
                onClick={() => setNewMatchData({...newMatchData, elected: 'bat'})}
              >
                Bat
              </ToggleButton>
              <ToggleButton
                active={newMatchData.elected === 'bowl'}
                onClick={() => setNewMatchData({...newMatchData, elected: 'bowl'})}
              >
                Bowl
              </ToggleButton>
            </ButtonGroup>
          </FormField>

          <SubmitButton onClick={handleStartMatch}>
            Start Match
          </SubmitButton>
        </div>
      </FormCard>
    </PageContainer>
  );
};

export default NewMatchPage;

