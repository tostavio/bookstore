import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  BookDetail: { id: string };
};

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type BookDetailRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;

export type BookDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookDetail'
>;
