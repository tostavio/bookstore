import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BookBox from 'src/shared/components/BookBox';
import {
  booksSelectors,
  fetchBooksThunk,
  getBookDetailThunk,
} from 'src/state/ducks/books';
import { Book, BooksList } from 'src/state/types';
import { EmptyList } from './EmptyList';

const GRID_COLUMNS = 3;

interface Props {
  books?: BooksList;
}
export const BooksRoster: React.FC<Props> = ({ books }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoadingBookList = useSelector(booksSelectors.isLoadingBookList);
  const searchBooksQuery = useSelector(booksSelectors.getSearchBooksQuery);

  function handleBookBoxPress(id: string): void {
    navigation.navigate('BookDetail');
    dispatch(getBookDetailThunk(id));
  }

  const ghostBookBoxes =
    books?.items && books?.items.length > GRID_COLUMNS
      ? GRID_COLUMNS - (books?.items.length % GRID_COLUMNS)
      : 0;

  function shouldFixPosition(index: number): boolean {
    return index + 1 === books?.items.length && ghostBookBoxes > 0;
  }

  return (
    <FlatList<Book>
      keyExtractor={(book: Book) => book.id}
      data={books?.items}
      extraData={books?.items}
      style={style.flatList}
      numColumns={GRID_COLUMNS}
      refreshing={isLoadingBookList}
      onRefresh={() => dispatch(fetchBooksThunk(searchBooksQuery))}
      ListEmptyComponent={<EmptyList />}
      renderItem={({ item, index }) => (
        <BookBox
          uri={
            item.volumeInfo?.imageLinks?.thumbnail ||
            'https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png'
          }
          shouldFixPosition={shouldFixPosition(index)}
          ghostBoxes={ghostBookBoxes}
          handlePress={() => handleBookBoxPress(item.id)}
        />
      )}
    />
  );
};

const style = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});
