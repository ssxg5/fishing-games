import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { games } from '@/data/games';
import GameFrame from '@/components/GameFrame';

// 广告位组件
const AdPlaceholder = styled.div<{ position: string }>`
  min-height: 90px;
  background: #f0f0f0;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
`;

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const GameWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem 0;
`;

// GameFrame component imported from @/components/GameFrame

const BackButton = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const game = games.find(g => g.id === id);
  
  if (!game) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{game.seoTitle}</title>
        <meta name="description" content={game.seoDescription} />
        <meta name="keywords" content={game.keywords?.join(', ') || ''} />
        {/* Open Graph tags */}
        <meta property="og:title" content={game.seoTitle} />
        <meta property="og:description" content={game.seoDescription} />
        <meta property="og:image" content={game.thumbnail} />
        <meta property="og:type" content="game" />
      </Head>

      <GameContainer>
        <BackButton href="/">返回首页</BackButton>
        
        {game.adPositions?.top && (
          <AdPlaceholder position="top">广告位 - 顶部</AdPlaceholder>
        )}

        <h1>{game.title}</h1>
        <p>{game.description}</p>

        {game.adPositions?.beforeGame && (
          <AdPlaceholder position="before-game">广告位 - 游戏前</AdPlaceholder>
        )}

        <GameWrapper>
          <GameFrame
            gameUrl={game.gameUrl}
            title={game.title}
            aspectRatio={game.config.aspectRatio}
            sandbox={game.config.sandbox}
            allowFullscreen={game.config.allowFullscreen}
            lazy={false}
          />
        </GameWrapper>

        {game.adPositions?.afterGame && (
          <AdPlaceholder position="after-game">广告位 - 游戏后</AdPlaceholder>
        )}

        {game.adPositions?.bottom && (
          <AdPlaceholder position="bottom">广告位 - 底部</AdPlaceholder>
        )}
      </GameContainer>
    </>
  );
};

export default GamePage; 