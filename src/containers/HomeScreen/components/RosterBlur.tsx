import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import { moderateScale } from 'react-native-size-matters';
import { Container } from 'src/shared/styles/Container';
import { theme } from 'src/shared/theme';

const AnimatedContainer = Animated.createAnimatedComponent<any>(Container);

export const RosterBlur: React.FC = () => {
  const [kayboardIsActive, setKeyboardIsActive] = useState(0); // 0 to false, 1 to true

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', toggleKeyboardStatus);
    Keyboard.addListener('keyboardDidHide', toggleKeyboardStatus);

    return () => {
      Keyboard.removeListener('keyboardDidShow', toggleKeyboardStatus);
      Keyboard.removeListener('keyboardDidHide', toggleKeyboardStatus);
    };
  });

  const { current: transition } = useRef(
    useTimingTransition(kayboardIsActive, { duration: 150 }),
  );

  const { current: opacityBlur } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  );

  function toggleKeyboardStatus() {
    kayboardIsActive === 1 ? setKeyboardIsActive(0) : setKeyboardIsActive(1);
  }
  return (
    <AnimatedContainer
      pointerEvents="none"
      position="absolute"
      top={moderateScale(theme.header.height)}
      right={0}
      bottom={0}
      left={0}
      width="100%"
      height="100%"
      overflow="hidden"
      zIndex={1}
      style={{
        opacity: opacityBlur,
      }}>
      <BlurView
        blurType="dark"
        blurAmount={2}
        style={[StyleSheet.absoluteFillObject]}
      />
    </AnimatedContainer>
  );
};
