import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { games } from '@/data/games';
import OptimizedImage from '@/components/OptimizedImage';
import GameCard from '@/components/GameCard';

const HomePage = () => {
  const router = useRouter();

  const handlePlayClick = (game: typeof games[0]) => {
    router.push(`/games/${game.id}`);
  };

  return (
    <>
      <Head>
        <title>钓鱼游戏合集 - 最佳在线钓鱼游戏体验</title>
        <meta name="description" content="发现最棒的在线钓鱼游戏合集，包括深海钓鱼、冰上钓鱼、河流探险等精彩游戏。免费畅玩，体验真实的钓鱼乐趣！" />
        <meta name="keywords" content="钓鱼游戏,在线游戏,免费游戏,深海钓鱼,冰上钓鱼,河流钓鱼,休闲游戏" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="钓鱼游戏合集 - 最佳在线钓鱼游戏体验" />
        <meta property="og:description" content="发现最棒的在线钓鱼游戏合集，包括深海钓鱼、冰上钓鱼、河流探险等精彩游戏" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* 预连接优化 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.crazygames.com" />
        
        {/* 关键 CSS 内联 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .loading-placeholder { 
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `
        }} />
      </Head>
      
      <Container>
        <Header>
          <HeaderTitle>🎣 钓鱼游戏合集</HeaderTitle>
          <HeaderSubtitle>探索最精彩的在线钓鱼游戏世界</HeaderSubtitle>
        </Header>
        
        <GameGrid>
          {games.map((game, index) => (
            <GameCard 
              key={game.id}
              $priority={index < 2} 
              onClick={() => handlePlayClick(game)}
            >
              <GameThumbnailContainer>
                <GameThumbnail>
                  <OptimizedImage
                    src={game.thumbnail || game.imageUrl}
                    alt={game.title}
                    priority={index < 2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <GameOverlay>
                    <PlayIcon>▶️</PlayIcon>
                  </GameOverlay>
                </GameThumbnail>
              </GameThumbnailContainer>
              <GameInfo>
                <GameTitle>{game.title}</GameTitle>
                <GameDescription>{game.description}</GameDescription>
                <TagContainer>
                  {game.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagContainer>
                <PlayButton>
                  开始游戏
                </PlayButton>
              </GameInfo>
            </GameCard>
          ))}
        </GameGrid>
        
        <Footer>
          <FooterText>享受最棒的钓鱼游戏体验 🌊</FooterText>
        </Footer>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding: 1rem 0;
  }
`;

const HeaderTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #0070f3, #00a8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const HeaderSubtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (prefers-color-scheme: dark) {
    color: #999;
  }
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GameCardPlaceholder = styled.div`
  height: 400px;
  border-radius: 12px;
  background: #f0f0f0;
  
  @media (prefers-color-scheme: dark) {
    background: #2d2d2d;
  }
`;

// GameCard styles moved to separate component

const GameThumbnail = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #f5f5f5;
  
  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }
`;

const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GameThumbnailContainer = styled.div`
  &:hover ${GameOverlay} {
    opacity: 1;
  }
`;

const PlayIcon = styled.div`
  font-size: 3rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transform: scale(1);
  transition: transform 0.2s ease;
  
  ${GameOverlay}:hover & {
    transform: scale(1.1);
  }
`;

const GameInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const GameTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  
  @media (prefers-color-scheme: dark) {
    color: #fff;
  }
`;

const GameDescription = styled.p`
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;

  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(0, 112, 243, 0.1);
  color: #0070f3;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(0, 112, 243, 0.2);
    color: #4fadff;
  }
`;

const PlayButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #0070f3, #0051cc);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  margin-top: auto;

  &:hover {
    background: linear-gradient(135deg, #0051cc, #003d99);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  border-top: 1px solid #eee;
  
  @media (prefers-color-scheme: dark) {
    border-top-color: #333;
  }
`;

const FooterText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  
  @media (prefers-color-scheme: dark) {
    color: #999;
  }
`;

export default HomePage; 