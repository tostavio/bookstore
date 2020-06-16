import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { theme } from 'src/shared/theme';
import { Text } from 'src/shared/styles/Text';
import { BookDetail } from 'src/state/types';

type Props = {
  bookDetail?: BookDetail;
};

export const BookDescription: React.FC<Props> = ({ bookDetail }) => {
  if (!bookDetail || !bookDetail.volumeInfo?.description) {
    return null;
  }
  return (
    <Text
      size={theme.fontMetrics.normal.size}
      p={20}
      bg={theme.colors.white}
      color={theme.colors.textNormal}
      lineHeight={`${moderateScale(30)}px`}
      align="justify"
      weight="bold">
      {bookDetail.volumeInfo.description}
    </Text>
  );
};
