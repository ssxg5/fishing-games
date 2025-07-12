import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface GameFrameProps {
  gameUrl: string;
  title: string;
}

const GameContainer = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #f5f5f5;
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  color: #333;
`;

export const GameFrame: React.FC<GameFrameProps> = ({ gameUrl, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return (
    <GameContainer>
      <StyledIframe
        ref={iframeRef}
        src={gameUrl}
        title={title}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
      {isLoading && (
        <LoadingOverlay>
          <span>游戏加载中...</span>
        </LoadingOverlay>
      )}
    </GameContainer>
  );
}; 