import { DefaulTheme } from 'styled-components';
import 'styled-components'
import Theme from '.'

declare module 'styled-components' {
    type ThemeType = typeof Theme;
    export interface DefaulTheme extends ThemeType{}
}