import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface GameFrameProps {
  gameUrl: string;
  title: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ gameUrl, title }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    let timeoutId: NodeJS.Timeout;

    const handleLoad = () => {
      setIsLoading(false);
      setLoadTime(performance.now() - startTime);
      clearTimeout(timeoutId);
    };

    const handleError = () => {
      setError('游戏加载失败，请刷新页面重试');
      setIsLoading(false);
      clearTimeout(timeoutId);
    };

    // 设置超时检测
    timeoutId = setTimeout(() => {
      if (isLoading) {
        setError('游戏加载超时，请检查网络连接');
        setIsLoading(false);
      }
    }, 30000); // 30秒超时

    if (iframeRef.current) {
      iframeRef.current.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
      iframeRef.current.addEventListener('load', handleLoad);
      iframeRef.current.addEventListener('error', handleError);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
        iframeRef.current.removeEventListener('error', handleError);
      }
      clearTimeout(timeoutId);
    };
  }, [gameUrl, isLoading]);

  return (
    <GameContainer>
      {isLoading && <LoadingSpinner>加载中...</LoadingSpinner>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
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
      {!isLoading && !error && loadTime > 0 && (
        <PerformanceInfo>加载用时: {Math.round(loadTime)}ms</PerformanceInfo>
      )}
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

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-primary);
  font-size: 1.2rem;
  z-index: 1;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    margin: 10px auto;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  z-index: 1;
`;

const PerformanceInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export default GameFrame; 