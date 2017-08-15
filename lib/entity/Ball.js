// @flow
import Entity from './Entity'

export default class Ball extends Entity {

    constructor(width: number, height: number) {
        const radius = Math.floor(width / 10)
        const x = (width - radius) / 2
        const y = (height - radius) / 2

        super(x, y)
        this.radius = radius
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(255, 255, 255)'
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        context.stroke()
    }
}