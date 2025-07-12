import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export default function RiverFishing() {
  return (
    <>
      <Head>
        <title>河流探险 - HTML5游戏</title>
        <meta name="description" content="体验河流钓鱼的乐趣" />
      </Head>
      <GameContainer>
        <GameFrame 
          src="https://www.crazygames.com/embed-iframe/fishing-frenzy"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </GameContainer>
    </>
  );
} 