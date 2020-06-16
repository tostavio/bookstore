import React, { memo } from 'react';
import styled from '../styles/styled-components';
import { moderateScale } from 'react-native-size-matters';
import { Container } from '../styles/Container';

interface Props {
  uri: string;
  shouldFixPosition: boolean;
  ghostBoxes: number;
  handlePress: () => void;
}
export const BookBox: React.FC<Props> = ({
  uri,
  shouldFixPosition,
  ghostBoxes,
  handlePress,
}) => {
  const ghostBoxesArray = shouldFixPosition && [...Array(ghostBoxes)];
  return (
    <>
      <Wrapper delayPressIn={100} onPress={handlePress}>
        <Image source={{ uri }} />
      </Wrapper>
      {ghostBoxesArray &&
        ghostBoxesArray.map((_, index) => (
          <Container
            key={index}
            flex={1}
            pv={15}
            ph={10}
            opacity={0}
            pointerEvents="none"
          />
        ))}
    </>
  );
};

const Image = styled.Image`
  height: ${({ theme }) => theme.imageMetrics.height};
  width: ${({ theme }) => theme.imageMetrics.width};
`;

const Wrapper = styled.TouchableOpacity`
  padding: ${moderateScale(15)}px ${moderateScale(10)}px;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

export default memo(BookBox);
