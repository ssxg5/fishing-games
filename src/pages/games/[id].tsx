import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import GameFrame from '@/components/GameFrame';
import { games } from '@/data/games';

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const game = games.find(g => g.id === Number(id));

  if (!game) {
    return <div>游戏不存在</div>;
  }

  return (
    <>
      <Head>
        <title>{game.title} - 钓鱼游戏</title>
        <meta name="description" content={game.description} />
      </Head>
      <Container>
        <Header>
          <BackButton onClick={() => router.push('/')}>返回首页</BackButton>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
        </Header>
        <GameFrame gameUrl={game.url} title={game.title} />
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin: 1rem 0;
  }

  p {
    color: #666;
    
    @media (prefers-color-scheme: dark) {
      color: #999;
    }
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #0070f3;
  color: #0070f3;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0070f3;
    color: white;
  }
`;

export default GamePage; 