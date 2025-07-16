import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

interface GameFrameProps {
  gameUrl: string;
  title: string;
  aspectRatio?: string;
  allowFullscreen?: boolean;
  sandbox?: string;
  lazy?: boolean;
}

const GameFrame: React.FC<GameFrameProps> = ({ 
  gameUrl, 
  title,
  aspectRatio = '16/9',
  allowFullscreen = true,
  sandbox = 'allow-scripts allow-same-origin allow-popups allow-forms',
  lazy = true
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadTime, setLoadTime] = useState<number>(0);
  const [isInView, setIsInView] = useState(!lazy);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleError = useCallback(() => {
    setError('游戏加载失败，请刷新页面重试');
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const retryLoad = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setShouldLoad(false);
    
    setTimeout(() => {
      setShouldLoad(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (!shouldLoad || !gameUrl) return;

    const startTime = performance.now();
    
    // 设置加载超时
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setError('游戏加载超时，请检查网络连接');
        setIsLoading(false);
      }
    }, 30000);

    // 性能监控
    const handlePerformance = () => {
      const endTime = performance.now();
      setLoadTime(endTime - startTime);
    };

    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      iframe.addEventListener('load', handlePerformance);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        iframe.removeEventListener('load', handlePerformance);
      };
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldLoad, gameUrl, isLoading, handleLoad, handleError]);

  // 预连接优化
  useEffect(() => {
    if (shouldLoad && gameUrl) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = new URL(gameUrl).origin;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [shouldLoad, gameUrl]);

  return (
    <GameContainer ref={containerRef} $aspectRatio={aspectRatio}>
      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>加载游戏中...</LoadingText>
          <LoadingProgress />
        </LoadingContainer>
      )}
      
      {error && (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={retryLoad}>重试</RetryButton>
        </ErrorContainer>
      )}

      {shouldLoad && (
        <StyledIframe
          ref={iframeRef}
          src={gameUrl}
          title={title}
          frameBorder="0"
          allowFullScreen={allowFullscreen}
          sandbox={sandbox}
          loading="lazy"
          $isLoaded={!isLoading && !error}
          aria-label={`${title} 游戏页面`}
        />
      )}
      
      {!isLoading && !error && loadTime > 0 && (
        <PerformanceInfo>
          <span>加载用时: {Math.round(loadTime)}ms</span>
          <span>网络状态: {navigator.onLine ? '在线' : '离线'}</span>
        </PerformanceInfo>
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${props => props.$aspectRatio};
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;

  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const StyledIframe = styled.iframe<{ $isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
  background: #fff;
  
  @media (prefers-color-scheme: dark) {
    background: #1a1a1a;
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 2;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(26, 26, 26, 0.9);
  }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0070f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: #333;
    border-top-color: #0070f3;
  }
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  
  @media (prefers-color-scheme: dark) {
    color: #aaa;
  }
`;

const LoadingProgress = styled.div`
  width: 200px;
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 100%;
    background: #0070f3;
    border-radius: 2px;
    animation: progress 2s ease-in-out infinite;
  }
  
  @keyframes progress {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(200%); }
    100% { transform: translateX(-100%); }
  }
  
  @media (prefers-color-scheme: dark) {
    background: #333;
  }
`;

const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  z-index: 2;
  
  @media (prefers-color-scheme: dark) {
    background: rgba(26, 26, 26, 0.95);
  }
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1rem;
  max-width: 80%;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
  
  &:hover {
    background: #0051cc;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const PerformanceInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0.8;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 4px 6px;
  }
`;

export default GameFrame; 