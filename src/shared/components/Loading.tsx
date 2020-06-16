import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface Props {
  size?: 'large' | 'small';
  isActive?: boolean;
}
export const Loading: React.FC<Props> = ({
  size = 'small',
  isActive = true,
}) => {
  if (!isActive) {
    return null;
  }
  return (
    <View>
      <ActivityIndicator size={size} />
    </View>
  );
};
