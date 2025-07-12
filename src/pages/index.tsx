import { useState } from 'react';
import styled from 'styled-components';
import GameFrame from '../components/GameFrame';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const GameContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
`;

const GameList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const GameCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 15px;
`;

const GameTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const GameDescription = styled.p`
  margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
`;

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const games: Game[] = [
    {
      id: 'tiny-fishing',
      title: 'Tiny Fishing',
      description: '简单有趣的钓鱼游戏，适合所有年龄段的玩家',
      image: '/images/tiny-fishing.jpg',
      url: 'https://example.com/tiny-fishing'
    },
    {
      id: 'gone-fishing',
      title: 'Gone Fishing',
      description: '探索海洋世界，挑战各种鱼类',
      image: '/images/gone-fishing.jpg',
      url: 'https://example.com/gone-fishing'
    }
  ];

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  return (
    <Container>
      <Header>
        <Title>钓鱼游戏天地</Title>
      </Header>

      {selectedGame && (
        <GameContainer>
          <GameFrame url={selectedGame.url} title={selectedGame.title} />
        </GameContainer>
      )}

      <GameList>
        {games.map((game) => (
          <GameCard key={game.id} onClick={() => handleGameSelect(game)}>
            <GameImage src={game.image} alt={game.title} />
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
            </GameInfo>
          </GameCard>
        ))}
      </GameList>
    </Container>
  );
} 