import React from 'react';
import { Container } from '../styles/Container';
import { theme } from '../theme';

interface Props {
  bg?: string;
}
export const Divider: React.FC<Props> = ({ bg }) => {
  return (
    <Container width="100%" bg={bg} ai="center" jc="center">
      <Container width={120} height={2} bg={theme.colors.divider} />
    </Container>
  );
};
