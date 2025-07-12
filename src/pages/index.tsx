import styled from 'styled-components';
import Head from 'next/head';

const games = [
  {
    id: 1,
    title: '钓鱼游戏1',
    description: '休闲钓鱼游戏',
    thumbnail: '/images/game1.jpg',
    url: 'https://example.com/game1'
  },
  // 后续可以添加更多游戏
];

const HomePage = () => {
  return (
    <>
      <Head>
        <title>钓鱼游戏合集</title>
        <meta name="description" content="收集各种有趣的钓鱼游戏" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <h1>钓鱼游戏合集</h1>
          <p>收集各种有趣的钓鱼游戏</p>
        </Header>
        <GameGrid>
          {games.map(game => (
            <GameCard key={game.id}>
              <GameThumbnail>
                <img src={game.thumbnail} alt={game.title} />
              </GameThumbnail>
              <GameInfo>
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <PlayButton href={game.url}>开始游戏</PlayButton>
              </GameInfo>
            </GameCard>
          ))}
        </GameGrid>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GameCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  @media (prefers-color-scheme: dark) {
    background: #2d2d2d;
  }
`;

const GameThumbnail = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GameInfo = styled.div`
  padding: 1.5rem;

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;

    @media (prefers-color-scheme: dark) {
      color: #999;
    }
  }
`;

const PlayButton = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #0070f3;
  color: white;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #0051cc;
  }
`;

export default HomePage; 