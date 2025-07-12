import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface GameFrameProps {
  gameUrl: string;
  title: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ gameUrl, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 添加必要的安全措施
    if (iframeRef.current) {
      iframeRef.current.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
    }
  }, []);

  return (
    <GameContainer>
      <iframe
        ref={iframeRef}
        src={gameUrl}
        title={title}
        width="100%"
        height="100%"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
      />
    </GameContainer>
  );
};

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  background: #f5f5f5;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }

  iframe {
    border: none;
  }
`;

export default GameFrame; 