import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors?.primary || '#0070f3'};
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const BackLink = styled.a`
  color: ${props => props.theme.colors?.primary || '#0070f3'};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Title>404 - 页面未找到</Title>
      <Message>
        抱歉，您要访问的页面不存在。
      </Message>
      <Link href="/" passHref>
        <BackLink>返回首页</BackLink>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound; 