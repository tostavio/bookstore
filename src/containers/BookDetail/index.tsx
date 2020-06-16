import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { theme } from 'src/shared/theme';
import { FullScreenLoading } from 'src/shared/components/FullScreenLoading';
import { GenericStatusBar } from 'src/shared/components/GenericStatusBar';
import { Header } from 'src/shared/components/Header';
import { Container } from 'src/shared/styles/Container';
import { StyledSafeAreaView } from 'src/shared/styles/StyledSafeAreaView';
import { booksSelectors } from 'src/state/ducks/books';
import { BookDescription } from './components/BookDescription';
import { BookOverview } from './components/BookOverview';
import { moderateScale } from 'react-native-size-matters';

export const BookDetail: React.FC = () => {
  const isLoadingBookDetail = useSelector(booksSelectors.isLoadingBookDetail);
  const bookDetail = useSelector(booksSelectors.getBookDetail);
  return (
    <>
      <StyledSafeAreaView flex={0} bg={theme.colors.primary} />
      <StyledSafeAreaView bg={theme.colors.white}>
        <GenericStatusBar />
        <Header hasGoBack hasSearch={false} bg={theme.colors.primary} />
        <Container flex={1}>
          {isLoadingBookDetail || (isLoadingBookDetail && !bookDetail) ? (
            <FullScreenLoading />
          ) : (
            // This content off set is to bounces background color in IOS
            <ScrollView
              overScrollMode="never"
              contentInset={{ top: moderateScale(-1000) }}
              contentOffset={{ x: 0, y: moderateScale(1000) }}>
              {Platform.OS === 'ios' && (
                <Container height={1000} bg={theme.colors.primary} />
              )}
              <BookOverview bookDetail={bookDetail} />
              <BookDescription bookDetail={bookDetail} />
            </ScrollView>
          )}
        </Container>
      </StyledSafeAreaView>
    </>
  );
};
