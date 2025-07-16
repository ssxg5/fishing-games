import styled from 'styled-components';

interface GameCardProps {
  children: React.ReactNode;
  $priority?: boolean;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ children, $priority, onClick }) => {
  return (
    <StyledGameCard $priority={$priority} onClick={onClick}>
      {children}
    </StyledGameCard>
  );
};

const StyledGameCard = styled.div<{ $priority?: boolean }>`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (prefers-color-scheme: dark) {
    background: #2d2d2d;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    
    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }
  }
  
  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export default GameCard;