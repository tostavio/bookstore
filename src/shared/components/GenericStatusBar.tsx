import React from 'react';
import { StatusBar } from 'react-native';
import { theme } from 'src/shared/theme';

export const GenericStatusBar: React.FC = () => (
  <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
);
