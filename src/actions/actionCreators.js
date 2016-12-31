import {MENU_FILTER_CLICK} from './constants'

/**
 * 侧边栏点击事件
 */
export function menuClick(indexMenu){
    return {
        indexMenu:indexMenu,
        type:MENU_FILTER_CLICK
    }
}
