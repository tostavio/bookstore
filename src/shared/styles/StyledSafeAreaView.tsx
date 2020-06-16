import styled from './styled-components';

interface Props {
  bg?: string;
  flex?: number;
}

export const StyledSafeAreaView = styled.SafeAreaView<Props>`
  ${({ flex }) => (typeof flex === 'number' ? `flex: ${flex};` : 'flex:1')}
  flex-basis: auto;
  flex-shrink: 1;
  ${({ bg }) => bg && `background-color: ${bg};`};
`;
