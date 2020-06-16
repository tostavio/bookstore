import styled from '../styles/styled-components';
import { moderateScale } from 'react-native-size-matters';

interface Props {
  bg: string;
  width?: number | string;
  mr?: number;
}

export const Button = styled.TouchableOpacity<Props>`
  height: ${moderateScale(36)}px;
  ${({ width }) =>
    typeof width === 'number'
      ? `width: ${moderateScale(width)}px;`
      : width && `width: ${width};`}
  ${({ mr }) =>
    typeof mr === 'number' &&
    `margin-right: ${moderateScale(mr)}px;`}
  border-radius: 50px;
  ${({ bg }) => bg && `background:${bg}`};
  align-items: center;
  justify-content: center;
`;
