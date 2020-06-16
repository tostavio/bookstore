import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FullScreenLoading } from 'src/shared/components/FullScreenLoading';
import { GenericStatusBar } from 'src/shared/components/GenericStatusBar';
import { Header } from 'src/shared/components/Header';
import styled from 'src/shared/styles/styled-components';
import { StyledSafeAreaView } from 'src/shared/styles/StyledSafeAreaView';
import { booksSelectors, fetchBooksThunk } from 'src/state/ducks/books';
import { BooksRoster } from './components/BooksRoster';
import { RosterBlur } from './components/RosterBlur';

export const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isLoadingBookList = useSelector(booksSelectors.isLoadingBookList);
  const books = useSelector(booksSelectors.getBooksList);

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  if (isLoadingBookList && !books) {
    return <FullScreenLoading />;
  }

  return (
    <StyledSafeAreaView>
      <Wrapper behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <GenericStatusBar />
        <Header />
        <BooksRoster books={books} />
        <RosterBlur />
      </Wrapper>
    </StyledSafeAreaView>
  );
};

export const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  flex-basis: auto;
  flex-shrink: 1;
`;
