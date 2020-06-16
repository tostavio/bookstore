import React from 'react';
import { Loading } from './Loading';
import { Container } from '../styles/Container';

export const FullScreenLoading: React.FC = () => {
  return (
    <Container
      bg="transparent"
      ai="center"
      jc="center"
      height="100%"
      width="100%">
      <Loading size="large" />
    </Container>
  );
};
