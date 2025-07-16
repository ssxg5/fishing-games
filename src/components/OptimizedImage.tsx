import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = 'lazy',
  sizes,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // 创建不同格式的图片源
  const createSrcSet = (originalSrc: string) => {
    if (!originalSrc) return '';
    
    const basePath = originalSrc.split('.').slice(0, -1).join('.');
    const extension = originalSrc.split('.').pop();
    
    // 为不同屏幕尺寸创建响应式图片
    const sizes = [640, 828, 1200, 1920];
    return sizes
      .map(size => `${basePath}-${size}w.${extension} ${size}w`)
      .join(', ');
  };

  // 创建 WebP 源
  const createWebPSrc = (originalSrc: string) => {
    if (!originalSrc) return '';
    const basePath = originalSrc.split('.').slice(0, -1).join('.');
    return `${basePath}.webp`;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // 设置图片源
  useEffect(() => {
    if (isInView && src) {
      setCurrentSrc(src);
    }
  }, [isInView, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  const webpSrc = createWebPSrc(currentSrc);
  const srcSet = createSrcSet(currentSrc);

  return (
    <ImageContainer className={className} $isLoaded={isLoaded}>
      {!isLoaded && !isError && <ImagePlaceholder />}
      
      {isError && (
        <ErrorPlaceholder>
          <span>图片加载失败</span>
        </ErrorPlaceholder>
      )}

      {isInView && (
        <picture>
          {/* WebP 格式优先 */}
          <source 
            srcSet={webpSrc} 
            type="image/webp"
            sizes={sizes}
          />
          
          {/* 降级到原始格式 */}
          <StyledImage
            ref={imgRef}
            src={currentSrc}
            srcSet={srcSet}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            $isLoaded={isLoaded}
            $isError={isError}
          />
        </picture>
      )}
      
      {!isInView && <ImagePlaceholder />}
    </ImageContainer>
  );
};

const ImageContainer = styled.div<{ $isLoaded: boolean }>`
  position: relative;
  overflow: hidden;
  background: #f5f5f5;
  transition: opacity 0.3s ease;
  
  @media (prefers-color-scheme: dark) {
    background: #2a2a2a;
  }
`;

const StyledImage = styled.img<{ $isLoaded: boolean; $isError: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
  opacity: ${props => props.$isLoaded && !props.$isError ? 1 : 0};
  
  /* 防止图片闪烁 */
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: -webkit-optimize-contrast;
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }
`;

const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  color: #666;
  font-size: 0.9rem;
  
  @media (prefers-color-scheme: dark) {
    background: #2a2a2a;
    color: #aaa;
  }
`;

export default OptimizedImage;