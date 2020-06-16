import styled from './styled-components';
import { moderateScale } from 'react-native-size-matters';
import { MarginStyle, PaddingStyle, FlexStyle } from './Container';

interface TextProps extends MarginStyle, PaddingStyle, FlexStyle {
  color?: string;
  size?: string;
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  lineHeight?: string;
  bg?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text = styled.Text<TextProps>`
  ${({ color }) => color && `color: ${color};`}
  ${({ align }) => align && `text-align: ${align};`}
  ${({ size }) => size && `font-size: ${size};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`}
  ${({ bg }) => bg && `background-color: ${bg};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}

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
