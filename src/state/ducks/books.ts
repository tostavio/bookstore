import { AxiosResponse } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import api from '../../services/api';
import {
  AppState,
  BookDetail,
  BooksActions,
  BooksList,
  BooksState,
  FetchBooksAction,
  GetBookDetailAction,
  LoadingAction,
  SaveSearchBooksQueryAction,
  SaveBookmarkAction,
} from '../types';

// Initial State
export const initialBooksState: BooksState = {
  isLoadingBookList: {
    isLoading: true,
  },
  isLoadingSelectedBook: {
    isLoading: true,
  },
  bookmarks: [],
};

// Action Types
export enum BOOKS_ACTION_TYPES {
  FECH_BOOKS = 'BOOKS/FECH_BOOKS',
  FECH_BOOKS_LOADING = 'BOOKS/FECH_BOOKS_LOADING',
  GET_BOOK_INFO = 'BOOKS/GET_BOOK_INFO',
  GET_BOOK_INFO_LOADING = 'BOOKS/GET_BOOK_INFO_LOADING',
  SEARCH_BOOK = 'BOOKS/SEARCH_BOOK',
  BOOKMARK = 'BOOKS/BOOKMARK',
}

// Reducer
export default function books(
  state: BooksState = initialBooksState,
  action: BooksActions,
): BooksState {
  const { isLoading, message } = <LoadingAction>action;
  switch (action.type) {
    case BOOKS_ACTION_TYPES.FECH_BOOKS:
      const { booksList } = <FetchBooksAction>action;
      return { ...state, booksList };
    case BOOKS_ACTION_TYPES.GET_BOOK_INFO:
      const { bookDetail } = <GetBookDetailAction>action;
      return { ...state, bookDetail: bookDetail };
    case BOOKS_ACTION_TYPES.SEARCH_BOOK:
      const { query } = <SaveSearchBooksQueryAction>action;
      return { ...state, searchBooksQuery: query };
    case BOOKS_ACTION_TYPES.BOOKMARK:
      const { bookId } = <SaveBookmarkAction>action;
      const hasBookmark = state.bookmarks.some(item => item === bookId);
      const newBookMarks = hasBookmark
        ? state.bookmarks.filter(item => item !== bookId)
        : [...state.bookmarks, bookId];
      return { ...state, bookmarks: newBookMarks };
    case BOOKS_ACTION_TYPES.FECH_BOOKS_LOADING:
      return { ...state, isLoadingBookList: { isLoading, message } };
    case BOOKS_ACTION_TYPES.GET_BOOK_INFO_LOADING:
      return { ...state, isLoadingSelectedBook: { isLoading, message } };
    default:
      return state;
  }
}

// Action Creators
const fetchBooks = (booksList: BooksList): FetchBooksAction => ({
  type: BOOKS_ACTION_TYPES.FECH_BOOKS,
  booksList,
});

const saveSearchBooksQuery = (query: string): SaveSearchBooksQueryAction => ({
  type: BOOKS_ACTION_TYPES.SEARCH_BOOK,
  query,
});

export const saveBookmark = (bookId: string): SaveBookmarkAction => ({
  type: BOOKS_ACTION_TYPES.BOOKMARK,
  bookId,
});

const fetchBooksLoading = (
  isLoading: boolean,
  message?: string,
): LoadingAction => ({
  type: BOOKS_ACTION_TYPES.FECH_BOOKS_LOADING,
  isLoading,
  message,
});

const getBookDetail = (bookDetail: BookDetail): GetBookDetailAction => ({
  type: BOOKS_ACTION_TYPES.GET_BOOK_INFO,
  bookDetail,
});

const getBookDetailLoading = (
  isLoading: boolean,
  message?: string,
): LoadingAction => ({
  type: BOOKS_ACTION_TYPES.GET_BOOK_INFO_LOADING,
  isLoading,
  message,
});

// Thunk Actions
export const fetchBooksThunk = (
  query: string = '""',
): ThunkAction<Promise<BooksList>, AppState, {}, FetchBooksAction> => {
  return async (
    dispatch: ThunkDispatch<
      AppState,
      {},
      FetchBooksAction | LoadingAction | SaveSearchBooksQueryAction
    >,
  ): Promise<BooksList> => {
    dispatch(fetchBooksLoading(true));
    dispatch(saveSearchBooksQuery(query));
    try {
      const { data }: AxiosResponse<BooksList> = await api.get('', {
        params: {
          q: query,
        },
      });
      dispatch(fetchBooks(data));
      dispatch(fetchBooksLoading(false));
      return data || [];
    } catch (error) {
      dispatch(fetchBooksLoading(false, 'error'));
      throw error;
    }
  };
};

export const getBookDetailThunk = (
  id: string,
): ThunkAction<Promise<BookDetail>, AppState, {}, GetBookDetailAction> => {
  return async (
    dispatch: ThunkDispatch<AppState, {}, GetBookDetailAction | LoadingAction>,
  ): Promise<BookDetail> => {
    dispatch(getBookDetailLoading(true));
    try {
      const { data }: AxiosResponse<BookDetail> = await api.get(`/${id}`);
      dispatch(getBookDetail(data));
      dispatch(getBookDetailLoading(false));
      return data || [];
    } catch (error) {
      dispatch(getBookDetailLoading(false, 'error'));
      throw error;
    }
  };
};

// Selectors
export const booksSelectors = {
  getBooksList: (state: AppState) => state.books.booksList,
  getBookDetail: (state: AppState) => state.books.bookDetail,
  getSearchBooksQuery: (state: AppState) =>
    state.books.searchBooksQuery || '""',
  getBookmarks: (state: AppState) => state.books.bookmarks,
  isLoadingBookList: (state: AppState) =>
    state.books.isLoadingBookList?.isLoading,
  isLoadingBookDetail: (state: AppState) =>
    state.books.isLoadingSelectedBook?.isLoading,
};
