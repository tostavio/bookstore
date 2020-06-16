import { BOOKS_ACTION_TYPES } from './ducks/books';

export interface Dimensions {
  height?: string;
}

export interface Pdf {
  isAvailable?: boolean;
}

export interface Epub {
  isAvailable?: boolean;
}

export interface SaleInfo {
  country?: string;
  saleability?: string;
  isEbook?: boolean;
  listPrice?: {
    amount?: number;
    currencyCode?: string;
  };
  retailPrice?: {
    amount?: number;
    currencyCode?: string;
  };
  buyLink?: string;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface ReadingModes {
  text?: boolean;
  image?: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles?: boolean;
  containsImageBubbles?: boolean;
}

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export type IndustryIdentifiers = [
  {
    type?: string;
    identifier?: string;
  },
];

export interface AccessInfo {
  country?: string;
  viewability?: string;
  embeddable?: boolean;
  publicDomain?: boolean;
  textToSpeechPermission?: string;
  epub?: Epub;
  pdf?: Pdf;
  webReaderLink?: string;
  accessViewStatus?: string;
  quoteSharingAllowed?: boolean;
}

export interface VolumeInfo {
  title?: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifiers;
  readingModes?: ReadingModes;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: number;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  imageLinks?: ImageLinks;
  panelizationSummary?: PanelizationSummary;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface Book {
  kind?: string;
  id: string;
  etag?: string;
  selfLink?: string;
  volumeInfo?: VolumeInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface BookDetail extends Book {
  volumeInfo: VolumeInfo & Dimensions;
}

export type BooksList = {
  kind: string;
  totalItems: number;
  items: Book[];
};

export interface Loading {
  isLoading: boolean;
  message?: string;
}

export interface Action {
  type: string;
}

export type FetchBooksAction = Action & {
  booksList: BooksList;
};

export type GetBookDetailAction = Action & {
  bookDetail: BookDetail;
};

export type SaveSearchBooksQueryAction = Action & {
  query: string;
};

export type SaveBookmarkAction = Action & {
  bookId: string;
};

export type LoadingAction = Loading & Action;

export type BooksActions =
  | FetchBooksAction
  | GetBookDetailAction
  | SaveSearchBooksQueryAction
  | SaveBookmarkAction
  | LoadingAction;

export type BooksState = {
  booksList?: BooksList;
  isLoadingBookList?: Loading;
  bookDetail?: BookDetail;
  isLoadingSelectedBook?: Loading;
  searchBooksQuery?: string;
  bookmarks: string[] | [];
};

export type AppActionsTypes = BOOKS_ACTION_TYPES | LoadingAction;

export type AppState = {
  books: BooksState;
};
