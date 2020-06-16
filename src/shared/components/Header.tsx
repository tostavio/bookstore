/* eslint-disable no-shadow */
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { TextInput, Keyboard, BackHandler } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash';
import Search from 'src/shared/svg/Search';
import { debounce } from 'lodash';
import { fetchBooksThunk } from 'src/state/ducks/books';
import { useDispatch } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import styled from '../styles/styled-components';
import Arrow from '../svg/Arrow';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'src/shared/components/Divider';
import { Container } from '../styles/Container';
import { theme } from '../theme';
import ChevronDown from '../svg/ChevronDown';

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontMetrics.large.size};
  line-height: ${({ theme }) => theme.fontMetrics.large.lineHeight};
`;

export const InputContainer = styled.View`
  width: 100%;
  position: absolute;
  padding: 0px ${moderateScale(5)}px;
  align-items: center;
`;

const AnimatedTitle = Animated.createAnimatedComponent<any>(Title);
const AnimatedInputContainer = Animated.createAnimatedComponent<any>(
  InputContainer,
);

interface Props {
  hasGoBack?: boolean;
  hasSearch?: boolean;
  bg?: string;
}

export const Header: React.FC<Props> = ({
  hasGoBack = false,
  hasSearch = true,
  bg,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [keyboardStatus, setKeyboardStatus] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', showKeyboard);
    Keyboard.addListener('keyboardDidHide', hideKeyboard);
    BackHandler.addEventListener('hardwareBackPress', hideKeyboardBackPress);
    return () => {
      Keyboard.removeListener('keyboardDidShow', showKeyboard);
      Keyboard.removeListener('keyboardDidHide', hideKeyboard);
      BackHandler.removeEventListener(
        'hardwareBackPress',
        hideKeyboardBackPress,
      );
    };
  });

  const { current: transition } = useRef(
    useTimingTransition(keyboardStatus, { duration: 150 }),
  );

  const { current: translateYInput } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [10, 0],
    }),
  );

  const { current: translateYTitle } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [0, -10],
    }),
  );

  const { current: opacityInput } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  );

  const { current: opacityTitle } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  );

  function handleSearchIconPress(): void {
    inputRef.current?.focus();
    keyboardStatus === 1 ? inputRef.current?.blur() : inputRef.current?.focus();
  }

  function handleBackIconPress(): void {
    navigation.goBack();
  }

  function hideKeyboard() {
    setKeyboardStatus(0);
    inputRef.current?.blur();
  }

  function hideKeyboardBackPress() {
    setKeyboardStatus(0);
    inputRef.current?.blur();
    return false;
  }

  function showKeyboard() {
    setKeyboardStatus(1);
    inputRef.current?.focus();
  }

  const handleInputChange = useCallback(
    (text?: string) => {
      const sanitizedText =
        text && text.replace(/\s/g, '') === '' ? '""' : text;
      dispatch(fetchBooksThunk(sanitizedText || '""'));
    },
    [dispatch],
  );

  const debouncedHandleInputChange = useCallback(
    debounce((text?: string) => handleInputChange(text), 600),
    [dispatch],
  );

  return (
    <Container height={theme.header.height} bg={bg}>
      <Container flexDirection="row" p={10} flex={1} overflow="hidden">
        <LeftIconContainer disabled={!hasGoBack} onPress={handleBackIconPress}>
          {hasGoBack && <Arrow />}
        </LeftIconContainer>
        <Container flex={1} ai="center" jc="center">
          <AnimatedTitle
            style={{
              opacity: opacityTitle,
              transform: [{ translateY: translateYTitle }],
            }}>
            Pixter Books
          </AnimatedTitle>
          {hasSearch && (
            <AnimatedInputContainer
              pointerEvents={keyboardStatus === 0 ? 'none' : 'auto'}
              style={{
                opacity: opacityInput,
                transform: [{ translateY: translateYInput }],
              }}>
              <StyledTextInput
                returnKeyType="search"
                ref={inputRef}
                defaultValue=""
                onChange={({ nativeEvent }) =>
                  debouncedHandleInputChange(nativeEvent.text)
                }
              />
            </AnimatedInputContainer>
          )}
        </Container>
        <RightIconContainer
          disabled={!hasSearch}
          onPress={handleSearchIconPress}>
          {hasSearch && keyboardStatus === 0 ? (
            <Search />
          ) : (
            hasSearch && <ChevronDown />
          )}
        </RightIconContainer>
      </Container>
      <Divider bg={bg} />
    </Container>
  );
};

export const LeftIconContainer = styled.TouchableOpacity`
  align-items: flex-start;
  justify-content: center;
  width: ${moderateScale(50)}px;
  padding: ${moderateScale(5)}px;
  /* border: 1px solid red; */
`;

export const RightIconContainer = styled(LeftIconContainer)`
  align-items: flex-end;
`;

export const StyledTextInput = styled.TextInput`
  min-width: ${moderateScale(200)}px;
  max-width: ${moderateScale(400)}px;
  width: 100%;
  padding: ${moderateScale(5)}px ${moderateScale(3)}px;
  font-size: ${({ theme }) => theme.fontMetrics.normal.size};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 5px;
  height: ${moderateScale(35)}px;
`;
