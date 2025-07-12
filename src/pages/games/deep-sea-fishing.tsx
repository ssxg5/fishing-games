import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const GameContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const GameFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DeepSeaFishing = () => {
  return (
    <>
      <Head>
        <title>深海钓鱼 - 钓鱼游戏合集</title>
        <meta name="description" content="探索深海世界，钓取稀有鱼类" />
      </Head>
      <GameContainer>
        <Link href="/" passHref>
          <BackButton>返回首页</BackButton>
        </Link>
        <GameFrame
          src="/games/deep-sea-fishing/index.html"
          title="深海钓鱼"
          sandbox="allow-scripts allow-same-origin"
        />
      </GameContainer>
    </>
  );
};

export default DeepSeaFishing; 