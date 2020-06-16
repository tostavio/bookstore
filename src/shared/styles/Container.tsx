import styled from './styled-components';
import { moderateScale } from 'react-native-size-matters';
import { ViewStyle } from 'react-native';

export type PaddingStyle = {
  // Padding
  p?: number | ViewStyle;
  // Padding horizontal
  ph?: number;
  // Padding vertical
  pv?: number;
  // Padding top
  pt?: number;
  // Padding right
  pr?: number;
  // Padding bottom
  pb?: number;
  // Padding left
  pl?: number;
};

export type MarginStyle = {
  // Margin
  m?: number;
  // Margin horizontal
  mh?: number;
  // Margin vertical
  mv?: number;
  // Margin top
  mt?: number;
  // Margin right
  mr?: number;
  // Margin bottom
  mb?: number;
  // Margin left
  ml?: number;
};

export type FlexStyle = {
  flex?: number;
  flexBasis?: number | string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
};

interface ContainerProps extends PaddingStyle, MarginStyle, FlexStyle {
  // Justify Content
  jc?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  // Align Items
  ai?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  // Background Color
  bg?: string;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  overflow?: 'visible' | 'hidden' | 'scroll';
  opacity?: number;
  position?: 'absolute' | 'relative';
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  top?: number | string;
  zIndex?: number;
}

export const Container = styled.View<ContainerProps>`
  ${({ height }) =>
    typeof height === 'number'
      ? `height: ${moderateScale(height)}px;`
      : height && `height: ${height};`}
  ${({ minHeight }) =>
    typeof minHeight === 'number'
      ? `min-height: ${moderateScale(minHeight)}px;`
      : minHeight && `min-height: ${minHeight};`}
  ${({ maxHeight }) =>
    typeof maxHeight === 'number'
      ? `max-height: ${moderateScale(maxHeight)}px;`
      : maxHeight && `max-height: ${maxHeight};`}
  ${({ width }) =>
    typeof width === 'number'
      ? `width: ${moderateScale(width)}px;`
      : width && `width: ${width};`}
  ${({ minWidth }) =>
    typeof minWidth === 'number'
      ? `min-width: ${moderateScale(minWidth)}px;`
      : minWidth && `min-width: ${minWidth};`}
  ${({ maxWidth }) =>
    typeof maxWidth === 'number'
      ? `max-width: ${moderateScale(maxWidth)}px;`
      : maxWidth && `max-width: ${maxWidth};`}

  ${({ flex }) => typeof flex === 'number' && `flex: ${flex};`}
  ${({ flexBasis }) =>
    typeof flexBasis === 'number' || typeof flexBasis === 'string'
      ? `flex-basis: ${flexBasis};`
      : 'flex-basis: auto;'}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ flexGrow }) => typeof flexGrow === 'number' && `flex-grow: ${flexGrow};`}
  ${({ flexShrink }) =>
    typeof flexShrink === 'number'
      ? `flex-shrink: ${flexShrink};`
      : 'flex-shrink: 1;'}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ jc }) => jc && `justify-content: ${jc};`}
  ${({ jc }) => jc && `justify-content: ${jc};`}
  ${({ ai }) => ai && `align-items: ${ai};`}

  ${({ bg }) => bg && `background-color: ${bg};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ opacity }) => typeof opacity === 'number' && `opacity: ${opacity};`}
  ${({ top }) =>
    typeof top === 'number' ? `top: ${top}px;` : top && `top: ${top}px;`}
  ${({ right }) =>
    typeof right === 'number'
      ? `right: ${right};`
      : right && `right: ${right};`}
  ${({ bottom }) =>
    typeof bottom === 'number'
      ? `bottom: ${bottom};`
      : bottom && `bottom: ${bottom};`}
  ${({ left }) =>
    typeof left === 'number' ? `left: ${left};` : left && `left: ${left};`}
  ${({ zIndex }) => typeof zIndex === 'number' && `z-index: ${zIndex};`}
  ${({ position }) => position && `position: ${position};`}

  ${({ p }) => typeof p === 'number' && `padding: ${moderateScale(p)}px;`}
  ${({ ph }) =>
    typeof ph === 'number' &&
    `padding-left: ${moderateScale(ph)}px;
     padding-right: ${moderateScale(ph)}px;`}
  ${({ pv }) =>
    typeof pv === 'number' &&
    `padding-top: ${moderateScale(pv)}px;
     padding-bottom: ${moderateScale(pv)}px;`}
  ${({ pt }) =>
    typeof pt === 'number' && `padding-top: ${moderateScale(pt)}px;`}
  ${({ pr }) =>
    typeof pr === 'number' && `padding-right: ${moderateScale(pr)}px;`}
  ${({ pb }) =>
    typeof pb === 'number' && `padding-bottom: ${moderateScale(pb)}px;`}
  ${({ pl }) =>
    typeof pl === 'number' && `padding-left: ${moderateScale(pl)}px;`}

  ${({ m }) => typeof m === 'number' && `margin: ${moderateScale(m)}px;`}
  ${({ mh }) =>
    typeof mh === 'number' &&
    `margin-left: ${moderateScale(mh)}px;
     margin-right: ${moderateScale(mh)}px;`}
  ${({ mv }) =>
    typeof mv === 'number' &&
    `margin-top: ${moderateScale(mv)}px;
     margin-bottom: ${moderateScale(mv)}px;`}
  ${({ mt }) => typeof mt === 'number' && `margin-top: ${moderateScale(mt)}px;`}
  ${({ mr }) =>
    typeof mr === 'number' && `margin-right: ${moderateScale(mr)}px;`}
  ${({ mb }) =>
    typeof mb === 'number' && `margin-bottom: ${moderateScale(mb)}px;`}
  ${({ ml }) =>
    typeof ml === 'number' && `margin-left: ${moderateScale(ml)}px;`}
`;
