// @flow

export default class Entity {

    x: number
    y: number

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    distance(other: Entity): number {
        const distanceX = this.x - other.x
        const distanceY = this.y - other.y

        return Math.sqrt(distanceX * distanceX - distanceY * distanceY)
    }

    draw(context: CanvasRenderingContext2D): void {
        throw new Error('not implemented')
    }
}
