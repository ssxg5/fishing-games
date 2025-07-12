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

export default function IceFishing() {
  return (
    <>
      <Head>
        <title>冰上钓鱼 - HTML5游戏</title>
        <meta name="description" content="体验冰上钓鱼的刺激" />
      </Head>
      <GameContainer>
        <GameFrame 
          src="https://www.crazygames.com/embed-iframe/ice-fishing-io"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </GameContainer>
    </>
  );
} 