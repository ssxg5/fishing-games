import React from 'react';
import styled from 'styled-components';

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
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const GameCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GameImage = styled.div`
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GameInfo = styled.div`
  padding: 15px;
`;

const GameTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const GameDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 10px 0;
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <Title>钓鱼游戏合集</Title>
        <Subtitle>收集了最好玩的在线钓鱼游戏</Subtitle>
      </Header>

      <GameGrid>
        {/* 示例游戏卡片 */}
        <GameCard>
          <GameImage>
            <span>游戏预览图</span>
          </GameImage>
          <GameInfo>
            <GameTitle>示例游戏</GameTitle>
            <GameDescription>
              这是一个有趣的钓鱼游戏示例，稍后我们会添加真实的游戏内容。
            </GameDescription>
          </GameInfo>
        </GameCard>
      </GameGrid>
    </Container>
  );
} 