import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface GameFrameProps {
  url: string;
  title: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ url, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 验证消息来源
      if (new URL(url).origin !== event.origin) {
        return;
      }

      // 处理来自游戏的消息
      console.log('Received message from game:', event.data);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [url]);

  return (
    <GameContainer>
      <iframe
        ref={iframeRef}
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export default GameFrame; 