// Плашка

import React from 'react'
import logo from './logo.svg'
import {TileType} from "./App"

type PropsType = {
    tile: TileType
    clickHandler: (ri: number, ci: number) => void
}

const Tile = React.memo((props: PropsType) => {

    return (
        <div className={`tile ${props.tile.isOpened ? 'opened' : 'not-opened-yet'}`}
            onClick={() => { if(!props.tile.isTurnedOver) props.clickHandler(props.tile.rowIndex, props.tile.columnIndex) }}>
            <div>
                {props.tile.isTurnedOver ? props.tile.value : <img src={logo} className="logo" alt="X" />}
            </div>
        </div>
    )
})

export default Tile