import { Animation } from "./animation.js";

// -------------------------------------
const font = new Font('default');
const canvasWidth = 640;
const canvasHeight = 448;
const canvas = Screen.getMode();
canvas.height = canvasHeight;
canvas.width = canvasWidth;
Screen.setMode(canvas);

//----------------------------
let tiros = [];
const velocidadeTiro = 5;
const hpImages = [
    new Image('src/player/vida/hp1-c.png'),
    new Image('src/player/vida/hp2.png'),
    new Image('src/player/vida/hp3.png')
];
let playerHP = 3;
let hitCooldown = 0;
const maxHitCooldown = 60;

let free_mem;
let free_vram;
let ram_usage = System.getMemoryStats();
let ramUse = (ram_usage.used / 1048576).toFixed(2);

let boss = {
    x: 540,
    y: 400,
    velX: 2,
    velY: 0,
    gravity: 0.5,
    jumpForce: -12,
    facingLeft: false,
    noChao: true,
    tempoAtePulo: 70,
    width: 50,
    height: 50,
    direcao: -1,
};

let player = {
    X: 180,
    Y: 400,
    velY: 0,
    gravity: 0.5,
    noChao: true,
    jumpForce: -10,
    facingLeft: false,
    cooldown: 0,
    maxCooldown: 20,
    width: 30,
    height: 60,
    dashSpeed: 10,
    dashDuration: 20,
    dashCooldown: 30,
    isDashing: false,
    dashFrames: 0,
    dashCooldownFrames: 0
};


export class Tiro {
    constructor(x, y, facingLeft) {
        this.x = x;
        this.y = y;
        this.facingLeft = facingLeft;
        this.width = 20;
        this.height = 10;
        this.speed = velocidadeTiro;
        this.active = true;
        this.effectTimer = 0;
    }

    update() {
        this.x += this.facingLeft ? -this.speed : this.speed;
        if (this.x < -50 || this.x > canvasWidth + 50) {
            this.active = false;
        }
    }

    draw() {
        if (this.active) {
            bulletAnimation.draw(this.x, this.y, this.facingLeft);
        }
    }

    checkCollision(target) {
        if (!this.active) return false;
        const tiroLeft = this.x - this.width / 2;
        const tiroRight = this.x + this.width / 2;
        const tiroTop = this.y - this.height / 2;
        const tiroBottom = this.y + this.height / 2;
        const targetLeft = target.x - target.width / 2;
        const targetRight = target.x + target.width / 2;
        const targetTop = target.y - target.height;
        const targetBottom = target.y;
        const collided = tiroRight > targetLeft &&
            tiroLeft < targetRight &&
            tiroBottom > targetTop &&
            tiroTop < targetBottom;
        if (collided) {
            this.active = false;
            efeitoBalaAnimation.reset();
            efeitoBalaAnimation.draw(this.x, this.y);
        }

        return collided;
    }
}

const background = new Image("src/boss/goopy/bg/bg_goppy.png");
const upBulletFrames = ['src/player/Up/1.png', 'src/player/Up/2.png', 'src/player/Up/3.png']
const efeitoBalaFrames = ['src/player/efeito/0.png', 'src/player/efeito/1.png', 'src/player/efeito/2.png', 'src/player/efeito/3.png']
const bulletFrames = ['src/player/img_tiro/1.png', 'src/player/img_tiro/2.png', 'src/player/img_tiro/3.png', 'src/player/img_tiro/4.png', 'src/player/img_tiro/5.png'];
const idleFrames = ['src/player/idle/1.png', 'src/player/idle/2.png', 'src/player/idle/3.png', 'src/player/idle/4.png', 'src/player/idle/5.png', 'src/player/idle/6.png', 'src/player/idle/7.png', 'src/player/idle/8.png'];
const runFrames = ['src/player/run/Normal/1.png', 'src/player/run/Normal/2.png', 'src/player/run/Normal/3.png', 'src/player/run/Normal/4.png', 'src/player/run/Normal/5.png', 'src/player/run/Normal/6.png', 'src/player/run/Normal/7.png', 'src/player/run/Normal/8.png', 'src/player/run/Normal/9.png'];
const jumpFrames = ['src/player/jump/1.png', 'src/player/jump/2.png', 'src/player/jump/3.png', 'src/player/jump/4.png', 'src/player/jump/5.png', 'src/player/jump/6.png', 'src/player/jump/7.png', 'src/player/jump/8.png'];
const shootFrames = ['src/player/tiro/boil_1.png', 'src/player/tiro/boil_2.png', 'src/player/tiro/boil_3.png', 'src/player/tiro/shoot_1.png', 'src/player/tiro/shoot_2.png', 'src/player/tiro/shoot_3.png'];
const jumpFramesGoopy = ['src/boss/goopy/phase1/Jump/slime_jump_0001.png', 'src/boss/goopy/phase1/Jump/slime_jump_0002.png', 'src/boss/goopy/phase1/Jump/slime_jump_0003.png', 'src/boss/goopy/phase1/Jump/slime_jump_0004.png', 'src/boss/goopy/phase1/Jump/slime_jump_0005.png', 'src/boss/goopy/phase1/Jump/slime_jump_0006.png', 'src/boss/goopy/phase1/Jump/slime_jump_0007.png', 'src/boss/goopy/phase1/Jump/slime_jump_0008.png', 'src/boss/goopy/phase1/Jump/slime_jump_0009.png'];
const introFrame = ['src/boss/goopy/phase1/Intro/slime_intro_0001.png', 'src/boss/goopy/phase1/Intro/slime_intro_0002.png', 'src/boss/goopy/phase1/Intro/slime_intro_0003.png', 'src/boss/goopy/phase1/Intro/slime_intro_0004.png', 'src/boss/goopy/phase1/Intro/slime_intro_0005.png', 'src/boss/goopy/phase1/Intro/slime_intro_0006.png', 'src/boss/goopy/phase1/Intro/slime_intro_0007.png', 'src/boss/goopy/phase1/Intro/slime_intro_0008.png', 'src/boss/goopy/phase1/Intro/slime_intro_0009.png', 'src/boss/goopy/phase1/Intro/slime_intro_0010.png', 'src/boss/goopy/phase1/Intro/slime_intro_0011.png', 'src/boss/goopy/phase1/Intro/slime_intro_0012.png', 'src/boss/goopy/phase1/Intro/slime_intro_0013.png', 'src/boss/goopy/phase1/Intro/slime_intro_0014.png', 'src/boss/goopy/phase1/Intro/slime_intro_0015.png', 'src/boss/goopy/phase1/Intro/slime_intro_0016.png', 'src/boss/goopy/phase1/Intro/slime_intro_0017.png', 'src/boss/goopy/phase1/Intro/slime_intro_0018.png', 'src/boss/goopy/phase1/Intro/slime_intro_0019.png', 'src/boss/goopy/phase1/Intro/slime_intro_0020.png', 'src/boss/goopy/phase1/Intro/slime_intro_0021.png', 'src/boss/goopy/phase1/Intro/slime_intro_0022.png', 'src/boss/goopy/phase1/Intro/slime_intro_0023.png', 'src/boss/goopy/phase1/Intro/slime_intro_0024.png', 'src/boss/goopy/phase1/Intro/slime_intro_0025.png', 'src/boss/goopy/phase1/Intro/slime_intro_0026.png', 'src/boss/goopy/phase1/Intro/slime_intro_0027.png'];
const airUpFrame = ['src/boss/goopy/phase1/Air Up/slime_air_up_0001.png', 'src/boss/goopy/phase1/Air Up/slime_air_up_0002.png', 'src/boss/goopy/phase1/Air Up/slime_air_up_0003.png'];
const atackGoopyFrame = ['src/boss/goopy/phase1/Punch/slime_punch_0001.png', 'src/boss/goopy/phase1/Punch/slime_punch_0002.png', 'src/boss/goopy/phase1/Punch/slime_punch_0003.png', 'src/boss/goopy/phase1/Punch/slime_punch_0004.png', 'src/boss/goopy/phase1/Punch/slime_punch_0005.png', 'src/boss/goopy/phase1/Punch/slime_punch_0006.png', 'src/boss/goopy/phase1/Punch/slime_punch_0007.png', 'src/boss/goopy/phase1/Punch/slime_punch_0008.png', 'src/boss/goopy/phase1/Punch/slime_punch_0009.png', 'src/boss/goopy/phase1/Punch/slime_punch_0010.png', 'src/boss/goopy/phase1/Punch/slime_punch_0011.png', 'src/boss/goopy/phase1/Punch/slime_punch_0012.png', 'src/boss/goopy/phase1/Punch/slime_punch_0013.png', 'src/boss/goopy/phase1/Punch/slime_punch_0014.png', 'src/boss/goopy/phase1/Punch/slime_punch_0015.png', 'src/boss/goopy/phase1/Punch/slime_punch_0016.png'];
const olhaPraBaixoGoopy = ['src/boss/goopy/phase1/Air Down/slime_air_down_0001.png', 'src/boss/goopy/phase1/Air Down/slime_air_down_0002.png', 'src/boss/goopy/phase1/Air Down/slime_air_down_0003.png']
const dashPlayer = ['src/player/dash/dash_001.png', 'src/player/dash/dash_002.png', 'src/player/dash/dash_003.png', 'src/player/dash/dash_004.png', 'src/player/dash/dash_005.png', 'src/player/dash/dash_006.png']

const idleAnimation = new Animation(idleFrames, 20);
const runAnimation = new Animation(runFrames, 40);
const jumpAnimation = new Animation(jumpFrames, 20);
const shootAnimation = new Animation(shootFrames, 20);
const shootUpAnimation = new Animation(upBulletFrames, 20)
const bulletAnimation = new Animation(bulletFrames, 20);
const introGoopy = new Animation(introFrame, 10, false);
const jumpAnimationGoopy = new Animation(jumpFramesGoopy, 20);
const airUpAnimation = new Animation(airUpFrame, 20);
const efeitoBalaAnimation = new Animation(efeitoBalaFrames, 1)
const airDownGoopy = new Animation(olhaPraBaixoGoopy, 20)
const atackGoopyAnimation = new Animation(atackGoopyFrame, 20, false)
const dashPlayerAnimation = new Animation(dashPlayer, 20)




let currentAnimation = idleAnimation;
let pad = Pads.get();

function drawHP() {
    const hpIndex = Math.max(0, Math.min(playerHP - 1, hpImages.length - 1));
    hpImages[hpIndex].draw(20, canvasHeight - 60);
}
function checkPlayerBossCollision() {
    if (hitCooldown > 0 || introGoopy.finished === false) return false;

    return player.X < boss.x + boss.width / 2 &&
        player.X + player.width > boss.x - boss.width / 2 &&
        player.Y < boss.y + boss.height / 2 &&
        player.Y + player.height > boss.y - boss.height / 2;
}


while (true) {
    pad.update();
    if (hitCooldown > 0) hitCooldown--;
    if (checkPlayerBossCollision() && hitCooldown <= 0) {
        playerHP--;
        hitCooldown = maxHitCooldown;
    }
    Screen.clear();
    background.draw(0, 0);
    if (!introGoopy.finished) {
        introGoopy.draw(boss.x, boss.y);
    } else if (boss.velY < 0) {
        airUpAnimation.draw(boss.x, boss.y, boss.facingLeft);
    } else if (boss.velY > 1) {
        airDownGoopy.draw(boss.x, boss.y, boss.facingLeft);
    } else {
        jumpAnimationGoopy.draw(boss.x, boss.y, boss.facingLeft);
    }


    currentAnimation.draw(player.X, player.Y, player.facingLeft);
    tiros.forEach(tiro => {
        tiro.update();
        tiro.draw();
    });

    handleDash(pad);
    removeTIro()
    mostraFPS()
    playerMove(pad);
    atualizaGoopy();
    animationPlayer(pad);
    jumpPlayer();
    drawHP();
    Screen.flip();
}

function handleDash(pad) {
    if (player.dashCooldownFrames <= 0 && !player.isDashing) {
        if (pad.justPressed(Pads.L1)) {
            if (pad.pressed(Pads.LEFT) || pad.pressed(Pads.RIGHT)) {
                player.isDashing = true;
                player.dashFrames = player.dashDuration;
                player.dashCooldownFrames = player.dashCooldown;
                player.facingLeft = pad.pressed(Pads.LEFT);
            }
        }
    }
    if (player.isDashing) {
        let dashDirection = player.facingLeft ? -1 : 1;
        player.X += dashDirection * player.dashSpeed;
        player.dashFrames--;

        if (player.dashFrames <= 0) {
            player.isDashing = false;
        }
    }

    if (player.dashCooldownFrames > 0) {
        player.dashCooldownFrames--;
    }
}
function atualizaGoopy() {

    if (!introGoopy.finished) return;


    if (boss.noChao) {
        if (boss.x <= 0) {
            boss.x = 0;
            boss.direcao = 1;
        } else if (boss.x >= canvasWidth) {
            boss.x = canvasWidth - boss.width;
            boss.direcao = -1;
        }
    }

    boss.facingLeft = (boss.velX > 0);



    boss.tempoAtePulo--;
    if (boss.tempoAtePulo <= 0 && boss.noChao) {
        boss.noChao = false;
        boss.velY = boss.jumpForce;
        boss.velX = boss.direcao * 2;
        boss.tempoAtePulo = 70;
    }
    if (!boss.noChao) {
        boss.velY += boss.gravity;
        boss.y += boss.velY;
        boss.x += boss.velX;


        if (boss.x <= boss.largura / 2) {
            boss.x = boss.largura / 2;
            boss.velX *= -1;
        } else if (boss.x >= canvasWidth - boss.largura / 2) {
            boss.x = canvasWidth - boss.largura / 2;
            boss.velX *= -1;
        }
        if (boss.y >= 400) {
            boss.y = 400;
            boss.velY = 0;
            boss.noChao = true;
        }
    }
}
function animationPlayer(pad) {
    currentAnimation = idleAnimation;

    if (player.isDashing) {
        currentAnimation = dashPlayerAnimation;
        return;
    }

    if (!player.noChao) {
        currentAnimation = jumpAnimation;
        return
    } else if (pad.pressed(Pads.LEFT) || (pad.pressed(Pads.RIGHT))) {
        currentAnimation = runAnimation;

        return;
    } else {
        currentAnimation = idleAnimation
    }
    if (pad.pressed(Pads.SQUARE)) {
        currentAnimation = shootAnimation;
        return;
    }

}
function playerMove(pad) {
    if (player.cooldown > 0) player.cooldown--;

    if (!player.isDashing) {
        if (pad.pressed(Pads.LEFT)) {
            player.X -= 4;
            player.facingLeft = true;
        }

        if (pad.pressed(Pads.RIGHT)) {
            player.X += 4;
            player.facingLeft = false;
        }
    }


    if (pad.justPressed(Pads.CIRCLE) && player.noChao) {
        player.velY = player.jumpForce;
        player.noChao = false;
    }

    if (pad.pressed(Pads.SQUARE) && player.cooldown <= 0) {
        const offsetX = player.facingLeft ? -40 : 35;
        const offsetY = -40;
        tiros.push(new Tiro(
            player.X + offsetX,
            player.Y + offsetY,
            player.facingLeft
        ));
        efeitoBalaAnimation.reset();
        efeitoBalaAnimation.draw(
            player.X + (player.facingLeft ? -25 : 25),
            player.Y - 30,
            player.facingLeft
        );
        player.cooldown = player.maxCooldown;
    }


    for (let i = tiros.length - 1; i >= 0; i--) {
        tiros[i].update();
        tiros[i].draw();
        if (tiros[i].checkCollision(boss)) {
            boss.noChao ?
                jumpAnimationGoopy.frames[jumpAnimationGoopy.frame] :
                airUpAnimation.frames[airUpAnimation.frame];
            tiros.splice(i, 1);
        }
    }
}
function jumpPlayer() {
    player.velY += player.gravity;
    player.Y += player.velY;

    if (player.Y >= 400) {
        player.Y = 400;
        player.velY = 0;
        player.noChao = true;
    } else {
        player.noChao = false;
    }
}
function mostraFPS() {
    free_mem = System.getMemoryStats();
    free_vram = Screen.getFreeVRAM();
    ram_usage = System.getMemoryStats();

    ramUse = (ram_usage.used / 1048576).toFixed(2);
    font.print(0, 50, "Using Ram " + ramUse + "MB/32MB");
    font.print(0, 100, "Free RAM: " + (32 - ramUse) + "MB/32MB");
    font.print(0, 150, "Used Ram: " + ram_usage.used + " B");
    font.print(0, 200, "Free VRAM: " + free_vram + " KB");
}
function removeTIro() {
    tiros = tiros.filter(tiro => tiro.x > -100 && tiro.x < canvasWidth + 100 && tiro.active);
}