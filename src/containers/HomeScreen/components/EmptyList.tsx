import React from 'react';
import { theme } from 'src/shared/theme';
import { Container } from 'src/shared/styles/Container';
import { Text } from 'src/shared/styles/Text';

export const EmptyList: React.FC = () => {
  return (
    <Container p={30} jc="center" ai="center">
      <Text size={theme.fontMetrics.normal.size}>
        We don't find any book! :(
      </Text>
    </Container>
  );
};
