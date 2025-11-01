import React, { useState, useEffect } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';
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

const ErrorMessage = styled.div`
  color: ${theme.colors.red[600]};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.gray[700]};
`;

const TossContainer = styled.div`
  background: ${theme.colors.amber[50]};
  border: 2px solid ${theme.colors.amber[200]};
  border-radius: ${theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const TossButton = styled.button`
  background: linear-gradient(to bottom right, ${theme.colors.amber[400]}, ${theme.colors.orange[500]});
  color: white;
  padding: 1rem 2rem;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem auto 0;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TossResult = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  color: ${theme.colors.gray[900]};
`;

const NewMatchPage: React.FC<NewMatchPageProps> = ({ newMatchData, setNewMatchData, setCurrentView }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [wantToss, setWantToss] = useState(false);
  const [tossResult, setTossResult] = useState<{ winner: string; result: 'Heads' | 'Tails' } | null>(null);
  const [isTossing, setIsTossing] = useState(false);

  useEffect(() => {
    // Reset form when component mounts
    setNewMatchData({
      team1: '',
      team2: '',
      matchType: 'T20',
      overs: '20',
      venue: '',
      tossWinner: '',
      elected: ''
    });
    setErrors({});
    setWantToss(false);
    setTossResult(null);
  }, [setNewMatchData]);

  const flipToss = () => {
    setIsTossing(true);
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const winner = result === 'Heads' ? 'team1' : 'team2';
    
    setTimeout(() => {
      setTossResult({ winner, result });
      setNewMatchData({ ...newMatchData, tossWinner: winner });
      setIsTossing(false);
    }, 1000);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!newMatchData.team1 || newMatchData.team1.trim() === '') {
      newErrors.team1 = 'Team 1 name is required';
    }

    if (!newMatchData.team2 || newMatchData.team2.trim() === '') {
      newErrors.team2 = 'Team 2 name is required';
    }

    if (newMatchData.team1 && newMatchData.team2 && newMatchData.team1.trim().toLowerCase() === newMatchData.team2.trim().toLowerCase()) {
      newErrors.team2 = 'Team names must be different';
    }

    if (!newMatchData.matchType) {
      newErrors.matchType = 'Match type is required';
    }

    if (!newMatchData.overs || newMatchData.overs.trim() === '') {
      newErrors.overs = 'Overs is required';
    } else {
      const oversNum = parseInt(newMatchData.overs);
      if (isNaN(oversNum) || oversNum <= 0 || oversNum > 300) {
        newErrors.overs = 'Overs must be between 1 and 300';
      }
    }

    if (!wantToss && !newMatchData.tossWinner) {
      newErrors.tossWinner = 'Please select toss winner or flip the toss';
    }

    if (!newMatchData.elected) {
      newErrors.elected = 'Please select elected option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartMatch = () => {
    if (!validateForm()) {
      return;
    }
    
    // Get or create user ID (in a real app, this would come from user authentication)
    const getUserId = () => {
      let userId = localStorage.getItem('cricscorer_user_id');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cricscorer_user_id', userId);
      }
      return userId;
    };
    
    const matchData = {
      id: Date.now(),
      team1: newMatchData.team1,
      team2: newMatchData.team2,
      matchType: newMatchData.matchType,
      totalOvers: parseInt(newMatchData.overs) || 20,
      venue: newMatchData.venue || 'TBD',
      tossWinner: newMatchData.tossWinner,
      elected: newMatchData.elected,
      status: 'Live' as const,
      createdAt: new Date().toISOString(),
      creatorId: getUserId(),
      batsmen: [
        { name: 'Player1', runs: 0, balls: 0, fours: 0, sixes: 0 },
        { name: 'Player2', runs: 0, balls: 0, fours: 0, sixes: 0 },
      ],
      bowlers: [
        { name: 'Bowler1', overs: 0, runs: 0, wickets: 0, maidens: 0 },
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
                onChange={(e) => {
                  setNewMatchData({...newMatchData, team1: e.target.value});
                  if (errors.team1) {
                    setErrors({...errors, team1: ''});
                  }
                }}
                style={{ borderColor: errors.team1 ? theme.colors.red[500] : undefined }}
              />
              {errors.team1 && <ErrorMessage>{errors.team1}</ErrorMessage>}
            </FormField>
            <FormField>
              <Label>Team 2</Label>
              <Input
                type="text"
                placeholder="Enter team name"
                value={newMatchData.team2}
                onChange={(e) => {
                  setNewMatchData({...newMatchData, team2: e.target.value});
                  if (errors.team2) {
                    setErrors({...errors, team2: ''});
                  }
                }}
                style={{ borderColor: errors.team2 ? theme.colors.red[500] : undefined }}
              />
              {errors.team2 && <ErrorMessage>{errors.team2}</ErrorMessage>}
            </FormField>
          </FormGrid>

          <FormGrid>
            <FormField>
              <Label>Match Type</Label>
              <Select
                value={newMatchData.matchType}
                onChange={(e) => {
                  setNewMatchData({...newMatchData, matchType: e.target.value});
                  if (errors.matchType) {
                    setErrors({...errors, matchType: ''});
                  }
                }}
                style={{ borderColor: errors.matchType ? theme.colors.red[500] : undefined }}
              >
                <option value="">Select match type</option>
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="Test">Test</option>
              </Select>
              {errors.matchType && <ErrorMessage>{errors.matchType}</ErrorMessage>}
            </FormField>
            <FormField>
              <Label>Overs</Label>
              <Input
                type="number"
                placeholder="20"
                min="1"
                max="300"
                value={newMatchData.overs}
                onChange={(e) => {
                  setNewMatchData({...newMatchData, overs: e.target.value});
                  if (errors.overs) {
                    setErrors({...errors, overs: ''});
                  }
                }}
                style={{ borderColor: errors.overs ? theme.colors.red[500] : undefined }}
              />
              {errors.overs && <ErrorMessage>{errors.overs}</ErrorMessage>}
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

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id="wantToss"
              checked={wantToss}
              onChange={(e) => {
                setWantToss(e.target.checked);
                if (!e.target.checked) {
                  setTossResult(null);
                  setNewMatchData({...newMatchData, tossWinner: ''});
                }
              }}
            />
            <CheckboxLabel htmlFor="wantToss">
              <Coins size={16} />
              Want to flip toss?
            </CheckboxLabel>
          </CheckboxContainer>

          {wantToss && (
            <TossContainer>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Flip the Toss</strong>
              </div>
              <TossButton onClick={flipToss} disabled={isTossing}>
                <Coins size={20} />
                {isTossing ? 'Flipping...' : 'Flip Toss'}
              </TossButton>
              {tossResult && (
                <TossResult>
                  Result: {tossResult.result} - {tossResult.winner === 'team1' ? newMatchData.team1 : newMatchData.team2} won the toss!
                </TossResult>
              )}
            </TossContainer>
          )}

          {!wantToss && (
            <FormField>
              <Label>Toss Winner</Label>
              <ButtonGroup>
                <ToggleButton
                  active={newMatchData.tossWinner === 'team1'}
                  onClick={() => {
                    setNewMatchData({...newMatchData, tossWinner: 'team1'});
                    if (errors.tossWinner) {
                      setErrors({...errors, tossWinner: ''});
                    }
                  }}
                >
                  Team 1
                </ToggleButton>
                <ToggleButton
                  active={newMatchData.tossWinner === 'team2'}
                  onClick={() => {
                    setNewMatchData({...newMatchData, tossWinner: 'team2'});
                    if (errors.tossWinner) {
                      setErrors({...errors, tossWinner: ''});
                    }
                  }}
                >
                  Team 2
                </ToggleButton>
              </ButtonGroup>
              {errors.tossWinner && <ErrorMessage>{errors.tossWinner}</ErrorMessage>}
            </FormField>
          )}

          <FormField>
            <Label>Elected to</Label>
            <ButtonGroup>
              <ToggleButton
                active={newMatchData.elected === 'bat'}
                onClick={() => {
                  setNewMatchData({...newMatchData, elected: 'bat'});
                  if (errors.elected) {
                    setErrors({...errors, elected: ''});
                  }
                }}
              >
                Bat
              </ToggleButton>
              <ToggleButton
                active={newMatchData.elected === 'bowl'}
                onClick={() => {
                  setNewMatchData({...newMatchData, elected: 'bowl'});
                  if (errors.elected) {
                    setErrors({...errors, elected: ''});
                  }
                }}
              >
                Bowl
              </ToggleButton>
            </ButtonGroup>
            {errors.elected && <ErrorMessage>{errors.elected}</ErrorMessage>}
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

