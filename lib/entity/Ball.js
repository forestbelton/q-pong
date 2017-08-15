// @flow
import Entity from './Entity'

export default class Ball extends Entity {

    constructor(width: number, height: number) {
        const radius = Math.floor(width / 50)
        const x = width / 2
        const y = height / 2

        super(x, y)
        this.radius = radius
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(255, 255, 255)'

        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
        context.fill()
    }
}