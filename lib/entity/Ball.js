// @flow
import Entity from './Entity'

export default class Ball extends Entity {

    radius: number

    constructor(width: number, height: number) {
        const radius = Math.floor(width / 50)
        const x = Math.floor(width / 2) - radius
        const y = Math.floor(height / 2) - radius

        super(x, y)
        this.radius = radius
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'rgb(255, 255, 255)'

        const x = this.x + this.radius
        const y = this.y + this.radius

        context.beginPath()
        context.arc(x, y, this.radius, 0, 2 * Math.PI, true)
        context.fill()
    }
}