import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  loadTime?: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 启用性能监控（仅在开发环境）
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    const collectMetrics = () => {
      // Performance timing metrics
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        setMetrics(prev => ({
          ...prev,
          loadTime: navigation.loadEventEnd - navigation.fetchStart,
          ttfb: navigation.responseStart - navigation.fetchStart,
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
        }));
      }
    };

    // 收集初始指标
    setTimeout(collectMetrics, 1000);

    // Web Vitals 监控
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
            break;
          case 'first-input':
            setMetrics(prev => ({ ...prev, fid: (entry as any).processingStart - entry.startTime }));
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                cls: (prev.cls || 0) + (entry as any).value 
              }));
            }
            break;
        }
      }
    });

    // 注册观察者
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, []);

  // 性能评级函数
  const getPerformanceGrade = (metric: string, value: number): string => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'Good' : value <= 4000 ? 'Needs Improvement' : 'Poor';
      case 'fid':
        return value <= 100 ? 'Good' : value <= 300 ? 'Needs Improvement' : 'Poor';
      case 'cls':
        return value <= 0.1 ? 'Good' : value <= 0.25 ? 'Needs Improvement' : 'Poor';
      case 'fcp':
        return value <= 1800 ? 'Good' : value <= 3000 ? 'Needs Improvement' : 'Poor';
      case 'ttfb':
        return value <= 800 ? 'Good' : value <= 1800 ? 'Needs Improvement' : 'Poor';
      default:
        return 'Unknown';
    }
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'Good': return '#0cce6b';
      case 'Needs Improvement': return '#ffa400';
      case 'Poor': return '#ff4e42';
      default: return '#999';
    }
  };

  if (!isVisible) return null;

  return (
    <MonitorContainer>
      <MonitorTitle>🚀 Performance Monitor</MonitorTitle>
      <MetricsGrid>
        {Object.entries(metrics).map(([key, value]) => {
          if (value === undefined) return null;
          const grade = getPerformanceGrade(key, value);
          return (
            <MetricCard key={key} $gradeColor={getGradeColor(grade)}>
              <MetricName>{key.toUpperCase()}</MetricName>
              <MetricValue>{Math.round(value)}{key === 'cls' ? '' : 'ms'}</MetricValue>
              <MetricGrade $color={getGradeColor(grade)}>{grade}</MetricGrade>
            </MetricCard>
          );
        })}
      </MetricsGrid>
      <MonitorNote>性能监控仅在开发环境显示</MonitorNote>
    </MonitorContainer>
  );
};

const MonitorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 300px;
  z-index: 9999;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin: 1rem;
    min-width: auto;
  }
`;

const MonitorTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4facfe;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MetricCard = styled.div<{ $gradeColor: string }>`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 3px solid ${props => props.$gradeColor};
  text-align: center;
`;

const MetricName = styled.div`
  font-size: 0.7rem;
  opacity: 0.8;
  margin-bottom: 0.2rem;
`;

const MetricValue = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

const MetricGrade = styled.div<{ $color: string }>`
  font-size: 0.6rem;
  color: ${props => props.$color};
  margin-top: 0.2rem;
`;

const MonitorNote = styled.div`
  font-size: 0.7rem;
  opacity: 0.6;
  text-align: center;
  margin-top: 0.5rem;
`;

export default PerformanceMonitor;