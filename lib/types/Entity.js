// @flow

export default class Entity {

    x: number
    y: number

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(context: CanvasRenderingContext2D): void {
        throw new Error('not implemented')
    }
}
