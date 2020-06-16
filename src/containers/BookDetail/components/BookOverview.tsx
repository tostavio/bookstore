/* eslint-disable no-shadow */
import React, { useState, useRef, useCallback } from 'react';
import numbro from 'numbro';
import { theme } from 'src/shared/theme';
import { makeStarsArray } from 'src/helper/bookHelper';
import { Button } from 'src/shared/components/Button';
import { Container } from 'src/shared/styles/Container';
import styled from 'src/shared/styles/styled-components';
import { Text } from 'src/shared/styles/Text';
import Star from 'src/shared/svg/Star';
import { BookDetail } from 'src/state/types';
import Heart from 'src/shared/svg/Heart';
import { useTimingTransition } from 'react-native-redash';
import Animated, { interpolate } from 'react-native-reanimated';
import { shadow } from 'src/shared/styles/shadow';
import { useDispatch, useSelector } from 'react-redux';
import { saveBookmark, booksSelectors } from 'src/state/ducks/books';
import { debounce } from 'lodash';
import { Linking } from 'react-native';

const AnimatedContainer = Animated.createAnimatedComponent<any>(Container);
interface Props {
  bookDetail?: BookDetail;
}
export const BookOverview: React.FC<Props> = ({ bookDetail }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(booksSelectors.getBookmarks);
  const [isLoadingImage, setIsLoadingImage] = useState(0);
  const { current: transition } = useRef(
    useTimingTransition(isLoadingImage, { duration: 100 }),
  );

  const { current: opacity } = useRef(
    interpolate(transition, {
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  );

  const handleBookmarkButtonClick = useCallback(
    debounce(() => bookDetail && dispatch(saveBookmark(bookDetail.id)), 300),
    [dispatch],
  );

  if (!bookDetail || !bookDetail.volumeInfo) {
    return null;
  }
  const { volumeInfo } = bookDetail;
  const title =
    volumeInfo.title && volumeInfo.title + ': ' + (volumeInfo.subtitle || '');
  const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknow';
  const rating =
    volumeInfo.averageRating && Math.round(volumeInfo.averageRating);
  const ratingArray = rating && makeStarsArray({ numberOfOnStars: rating });
  const amount = bookDetail.saleInfo?.retailPrice?.amount;
  const isBookmarked = bookmarks.some(item => item === bookDetail.id);

  return (
    <Container flexDirection="row" jc="center" bg={theme.colors.primary}>
      <Container p={10} ai="center" jc="flex-start">
        <AnimatedContainer
          bg={theme.colors.primary}
          style={{ opacity, ...shadow }}>
          <Image
            onLoadEnd={() => setIsLoadingImage(1)}
            source={{
              uri:
                volumeInfo.imageLinks?.thumbnail ||
                'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png',
            }}
          />
        </AnimatedContainer>
        <Container flex={1} mt={20} maxHeight={50} jc="center">
          {volumeInfo.pageCount && (
            <Text
              {...theme.fontMetrics.normal}
              color={theme.colors.textDiscreet}>
              {volumeInfo.pageCount} pages
            </Text>
          )}
        </Container>
      </Container>
      <Container flex={1} m={10}>
        <Container minHeight={theme.imageMetrics.height}>
          {!!title && (
            <Text
              {...theme.fontMetrics.large}
              color={theme.colors.textBold}
              weight="bold">
              {title}
            </Text>
          )}
          <Text
            flex={1}
            {...theme.fontMetrics.normal}
            color={theme.colors.textDiscreet}
            mt={5}
            mb={10}>
            by {authors}
          </Text>
          <Container flexDirection="row">
            {!!amount && (
              <Text
                {...theme.fontMetrics.normal}
                color={theme.colors.textNormal}
                mr={10}>
                {numbro(amount).format({
                  thousandSeparated: true,
                  output: 'currency',
                  currencySymbol: 'R$ ',
                  mantissa: 2,
                })}
              </Text>
            )}
            <Container flex={1} ai="flex-start" flexDirection="row">
              {!!ratingArray &&
                ratingArray.map((item, index) => (
                  <Star
                    key={index}
                    fill={
                      item.isOn ? theme.colors.starOn : theme.colors.starOff
                    }
                  />
                ))}
            </Container>
          </Container>
        </Container>
        <Container
          ai="center"
          jc="flex-end"
          flexDirection="row"
          mt={20}
          pv={5}
          pr={10}>
          <Button
            bg={theme.colors.secondary}
            width={130}
            mr={10}
            activeOpacity={0.6}
            style={{ ...shadow }}>
            <Text
              {...theme.fontMetrics.normal}
              onPress={() =>
                Linking.openURL(bookDetail.saleInfo?.buyLink || '')
              }
              color={theme.colors.white}
              weight="bold">
              BUY
            </Text>
          </Button>
          <Button
            delayPressOut={300}
            bg={isBookmarked ? theme.colors.love : theme.colors.white}
            width={36}
            activeOpacity={0.6}
            onPress={handleBookmarkButtonClick}
            style={{ ...shadow }}>
            <Heart isActive={isBookmarked} />
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export const Image = styled.Image`
  height: ${({ theme }) => theme.imageMetrics.height};
  width: ${({ theme }) => theme.imageMetrics.width};
`;
