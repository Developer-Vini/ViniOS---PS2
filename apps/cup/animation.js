export class Animation {
    constructor(frames, fps, loop = true) {
        this.frames = frames.map(frame => new Image(frame));
        this.fps = 1000000 / fps;
        this.timer = Timer.new();
        this.frame = 0;
        this.loop = loop;
        this.finished = false;
    }

    draw(x, y, flipHorizontal = false) {
        if (this.finished) {
            this.frame = this.frames.length - 1;
        } else if (Timer.getTime(this.timer) >= this.fps) {
            this.frame = (this.frame + 1) % this.frames.length;

            if (!this.loop && this.frame === this.frames.length - 1) {
                this.finished = true;
            }

            Timer.setTime(this.timer, 1);
        }

        const currentImage = this.frames[this.frame];
        let drawX = x - currentImage.width / 2;
        let drawY = y - currentImage.height;

        if (flipHorizontal) {
            currentImage.startx = currentImage.width;
            currentImage.endx = 0;
        } else {
            currentImage.startx = 0;
            currentImage.endx = currentImage.width;
        }

        currentImage.draw(drawX, drawY);
    }

    reset() {
        this.frame = 0;
        this.finished = false;
        Timer.setTime(this.timer, 1);
    }
}
