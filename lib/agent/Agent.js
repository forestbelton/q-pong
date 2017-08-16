// @flow
import Grid from '../Grid'
import Player from '../entity/Player'
import Direction from '../Direction'

export default class Agent {

    player: string

    constructor(player: string) {
        this.player = player
    }

    decideMove(game: Grid): Direction {
        throw new Error('not implemented')
    }
}
