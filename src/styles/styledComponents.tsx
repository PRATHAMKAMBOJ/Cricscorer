import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f9fafb, #eff6ff);
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const GradientHeader = styled.div`
  background: linear-gradient(to bottom right, #2563eb, #9333ea);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: ${props => props.variant === 'outline' ? '0.75rem 1.5rem' : '1rem 1.5rem'};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  transition: all 0.2s;
  border: ${props => props.variant === 'outline' ? '2px solid transparent' : 'none'};
  cursor: pointer;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(to right, #2563eb, #9333ea);
          color: white;
          &:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          }
        `;
      case 'secondary':
        return `
          background: white;
          color: #2563eb;
          border: 2px solid transparent;
          &:hover {
            border-color: #3b82f6;
          }
        `;
      default:
        return `
          background: white;
          color: #1f2937;
          &:hover {
            border-color: #3b82f6;
          }
        `;
    }
  }}
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: all 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 1}, minmax(0, 1fr));
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(${props => props.cols || 2}, minmax(0, 1fr));
  }
`;

export const BackButton = styled.button`
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

export const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const LiveBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: #fee2e2;
  color: #dc2626;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

export const LiveIndicator = styled.span`
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


