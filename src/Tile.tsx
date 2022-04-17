// Плашка

import logo from './logo.svg'
import {TileType} from "./App"

type PropsType = {
    tile: TileType
    clickHandler: (ri: number, ci: number) => void
}

const Tile = (props: PropsType) => {

    function clickHandler(): void {
        props.clickHandler(props.tile.rowIndex, props.tile.columnIndex)
    }

    return (
        <div className={`tile ${props.tile.isOpened ? 'opened' : 'not-opened-yet'}`} onClick={clickHandler}>
            <div>
                {props.tile.isTurnedOver ? props.tile.value : <img src={logo} className="logo" alt="X" />}
            </div>
        </div>
    )
}

export default Tile