//Tmj mano Ballaco!
let canvasWidth = 640;
let canvasHeight = 480;
let cursorX = canvasWidth / 2;
let cursorY = canvasHeight / 2;
let cursorSize = 2;
let gridSize = 32;
const canvas = Screen.getMode();
canvas.double_buffering = true;
Screen.setMode(canvas);
const background = new Image("assets/background.png");
const cursor = new Image("assets/cursor.png");
const app1 = new Image("assets/lixeira.png");
const app2 = new Image("assets/cuphead.png");
const app3 = new Image("assets/sis.png");
const startButtonImage = new Image("assets/win.png");
let showBorder = false;
let lastSelectState = false;
let showCoords = false;
let lastStartState = false;
let showHitbox = false;
let showMenu = false;
let lastCrossState = false;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragEndX = 0;
let dragEndY = 0;
let showClockMenu = false;
let showRightClickMenuTaskbar = false;
let showRightClickMenuDesktop = false;
let lastCircleState = false;
let colorMode = 1;
const startButtonSize = 40;
const startButtonY = canvasHeight - startButtonSize - 54;
const taskbarHeight = startButtonSize;
const taskbarY = startButtonY;
const defaultTaskbarColor = Color.new(0, 0, 0, 0);
const currentTaskbarColor = Color.new(0, 90, 170, 255);
const transparentColor = Color.new(0, 120, 215, 255);
const menuWidth = 150;
const menuHeight = 100;
const menuColor = Color.new(200, 200, 200, 255);
const menuX = 0;
const menuY = taskbarY - menuHeight;
const selectionColor = Color.new(0, 120, 215, 180);
const clockSize = 100;
const defaultClockColor = Color.new(0, 0, 0, 0);
const currentClockColor = Color.new(0, 90, 170, 255);
const clockX = canvasWidth - clockSize - 10;
const clockY = taskbarY;
const rightClickMenuWidth = 150;
const rightClickMenuHeight = 100;
const rightClickMenuColor = Color.new(200, 200, 200, 255);
let rightClickMenuX = 0;
let rightClickMenuY = 0;

let lastTimeUpdate = 0;
let currentTimeStr = "";

function main() {
  const font = new Font("default");
  font.scale = 0.6;
  font.color = Color.new(0, 0, 0, 255);

  while (true) {
    Screen.clear();

    background.draw(0, 0, canvasWidth, canvasHeight);

    let taskbarColor = defaultTaskbarColor;
    if (colorMode === 2) taskbarColor = currentTaskbarColor;
    if (colorMode === 3) taskbarColor = transparentColor;
    if (colorMode !== 3) Draw.rect(0, taskbarY, canvasWidth, taskbarHeight, taskbarColor);

    startButtonImage.draw(0, startButtonY, startButtonSize, startButtonSize);

    let clockColor = defaultClockColor;
    if (colorMode === 2) clockColor = currentClockColor;
    if (colorMode === 3) clockColor = transparentColor;
    if (colorMode !== 3) Draw.rect(clockX, clockY, clockSize, taskbarHeight, clockColor);
    const currentTime = new Date();
    if (Date.now() - lastTimeUpdate > 1000) {
      lastTimeUpdate = Date.now();
      currentTimeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).replace(/\s*:\d{2}\s*(AM|PM)/i, ' $1');
    }
    font.color = Color.new(255, 255, 255, 255);
    font.print(clockX + 15, clockY + 5, currentTimeStr, 0.4);

    if (showClockMenu) {
      Draw.rect(clockX, clockY - menuHeight, clockSize, menuHeight, menuColor);
      const fullDateStr = currentTime.toLocaleDateString();
      const fullTimeStr = currentTime.toLocaleTimeString();
      font.color = Color.new(0, 0, 0, 255);
      font.print(clockX + 10, clockY - menuHeight + 40, fullDateStr, 0.6);
      font.print(clockX + 10, clockY - menuHeight + 60, fullTimeStr, 0.6);
    }

    const appSize = 48;
    const appSpacing = 16;
    app1.draw(30, 23, appSize, appSize);
    app2.draw(30, 23 + appSize + appSpacing + 4, appSize, appSize);
    app3.draw(30, 23 + (appSize + appSpacing + 4) * 2, appSize, appSize);

    if (showHitbox) {
      Draw.rect(30, 23, appSize, appSize, Color.new(255, 255, 0, 128));
      Draw.rect(30, 23 + appSize + appSpacing + 4, appSize, appSize, Color.new(255, 255, 0, 128));
      Draw.rect(30, 23 + (appSize + appSpacing + 4) * 2, appSize, appSize, Color.new(255, 255, 0, 128));
    }

    font.color = Color.new(255, 255, 255, 255);
    font.print(30, 23 + appSize - 10, "Lixeira", 0.4);
    font.print(30, 23 + appSize + appSpacing + 4 + appSize - 10, "Cuphead", 0.4);
    font.print(30, 23 + (appSize + appSpacing + 4) * 2 + appSize - 10, "Sistema solar", 0.4);

    const hoverSize = 55;
    const hoverOffset = (hoverSize - appSize) / 2;
    const hoverColor = Color.new(0, 0, 255, 128);
    if (cursorX >= 30 && cursorX <= 30 + appSize && cursorY >= 23 && cursorY <= 23 + appSize) {
      Draw.rect(30 - hoverOffset, 23 - hoverOffset, hoverSize, hoverSize, hoverColor);
    }
    if (cursorX >= 30 && cursorX <= 30 + appSize && cursorY >= 23 + appSize + appSpacing + 4 && cursorY <= 23 + (appSize + appSpacing + 4) + appSize) {
      Draw.rect(30 - hoverOffset, 23 + appSize + appSpacing + 4 - hoverOffset, hoverSize, hoverSize, hoverColor);
    }
    if (cursorX >= 30 && cursorX <= 30 + appSize && cursorY >= 23 + (appSize + appSpacing + 4) * 2 && cursorY <= 23 + (appSize + appSpacing + 4) * 2 + appSize) {
      Draw.rect(30 - hoverOffset, 23 + (appSize + appSpacing + 4) * 2 - hoverOffset, hoverSize, hoverSize, hoverColor);
    }

    app1.draw(30, 23, appSize, appSize);
    app2.draw(30, 23 + appSize + appSpacing + 4, appSize, appSize);
    app3.draw(30, 23 + (appSize + appSpacing + 4) * 2, appSize, appSize);


    if (showMenu) {
      Draw.rect(menuX, menuY, menuWidth, menuHeight, menuColor);
      font.color = Color.new(0, 0, 0, 255);
      font.print(menuX + 10, menuY + 10, "Desligar");
      font.print(menuX + 10, menuY + 30, "Reiniciar");
      font.print(menuX + 10, menuY + 50, "Salir");
    }


    if (showRightClickMenuTaskbar) {
      Draw.rect(rightClickMenuX, rightClickMenuY, rightClickMenuWidth, rightClickMenuHeight, rightClickMenuColor);
      font.color = Color.new(0, 0, 0, 255);
      font.print(rightClickMenuX + 10, rightClickMenuY + 10, "Azul desconhecido");
      font.print(rightClickMenuX + 10, rightClickMenuY + 30, "Azul (Padrão)");
      font.print(rightClickMenuX + 10, rightClickMenuY + 50, "Transparente");
    }


    if (showRightClickMenuDesktop) {
      Draw.rect(rightClickMenuX, rightClickMenuY, rightClickMenuWidth, rightClickMenuHeight, rightClickMenuColor);
      font.color = Color.new(0, 0, 0, 255);
      font.print(rightClickMenuX + 10, rightClickMenuY + 10, "Abrir diretorio");
      font.print(rightClickMenuX + 10, rightClickMenuY + 30, "Excluir");
      font.print(rightClickMenuX + 10, rightClickMenuY + 50, "Jogar");
    }


    if (isDragging) {
      let selectionWidth = dragEndX - dragStartX;
      let selectionHeight = dragEndY - dragStartY;
      let selectionX = dragStartX;
      let selectionY = dragStartY;


      if (selectionWidth < 0) {
        selectionX = dragEndX;
        selectionWidth = -selectionWidth;
      }
      if (selectionHeight < 0) {
        selectionY = dragEndY;
        selectionHeight = -selectionHeight;
      }


      Draw.rect(selectionX, selectionY, selectionWidth, selectionHeight, selectionColor);
    }


    cursor.draw(cursorX, cursorY, cursorSize, cursorSize);


    let pad = Pads.get();


    let velocidadBase = 0.1;


    const deadZone = 20;


    let analogX = pad.lx;
    let analogY = pad.ly;

    if (Math.abs(analogX) > deadZone) {
      cursorX += analogX * velocidadBase;
    }
    if (Math.abs(analogY) > deadZone) {
      cursorY += analogY * velocidadBase;
    }


    if (pad.btns & Pads.LEFT) {
      cursorX = Math.max(0, cursorX - gridSize);
    }
    if (pad.btns & Pads.RIGHT) {
      cursorX = Math.min(canvasWidth - cursorSize, cursorX + gridSize);
    }
    if (pad.btns & Pads.UP) {
      cursorY = Math.max(0, cursorY - gridSize);
    }
    if (pad.btns & Pads.DOWN) {
      cursorY = Math.min(canvasHeight - cursorSize, cursorY + gridSize);
    }


    cursorX = Math.max(0, Math.min(canvasWidth - cursorSize, cursorX));
    cursorY = Math.max(0, Math.min(canvasHeight - cursorSize, cursorY));


    if (pad.btns & Pads.SELECT && !lastSelectState) {
      showBorder = !showBorder;
      showHitbox = !showHitbox;
    }
    lastSelectState = pad.btns & Pads.SELECT;


    if (showBorder) {
      Draw.rect(cursorX - 2, cursorY - 2, cursorSize + 4, cursorSize + 4, Color.new(255, 0, 0, 100));
    }


    if (pad.btns & Pads.START && !lastStartState) {
      showCoords = !showCoords;
    }
    lastStartState = pad.btns & Pads.START;


    if (!(pad.btns & Pads.CROSS) && lastCrossState) {
      if (cursorX >= 30 && cursorX <= 30 + appSize && cursorY >= 23 + appSize + appSpacing + 4 && cursorY <= 23 + (appSize + appSpacing + 4) + appSize) {
        System.loadELF(System.boot_path + "/apps/cup/athena.elf");
      }
    }


    if (pad.btns & Pads.CROSS && !lastCrossState) {
      if (cursorX >= 0 && cursorX <= startButtonSize && cursorY >= startButtonY && cursorY <= startButtonY + startButtonSize) {
        showMenu = !showMenu;
      }

      if (cursorX >= clockX && cursorX <= clockX + clockSize && cursorY >= clockY && cursorY <= clockY + taskbarHeight) {
        showClockMenu = !showClockMenu;
      }
    }
    lastCrossState = pad.btns & Pads.CROSS;


    if (pad.btns & Pads.CIRCLE && !lastCircleState && cursorY >= startButtonY && cursorY <= startButtonY + taskbarHeight) {
      showRightClickMenuTaskbar = true;
      showRightClickMenuDesktop = false;
      rightClickMenuX = cursorX;
      rightClickMenuY = startButtonY - rightClickMenuHeight;
      if (rightClickMenuX + rightClickMenuWidth > canvasWidth) {
        rightClickMenuX = canvasWidth - rightClickMenuWidth;
      }
    }


    if (pad.btns & Pads.CIRCLE && !lastCircleState && cursorY < startButtonY) {
      showRightClickMenuDesktop = true;
      showRightClickMenuTaskbar = false;
      rightClickMenuX = cursorX;
      rightClickMenuY = cursorY;
      if (rightClickMenuY + rightClickMenuHeight > canvasHeight) {
        rightClickMenuY = canvasHeight - rightClickMenuHeight;
      }
      if (rightClickMenuX + rightClickMenuWidth > canvasWidth) {
        rightClickMenuX = canvasWidth - rightClickMenuWidth;
      }
    }


    if (pad.btns & Pads.CROSS && !lastCrossState) {
      if (showMenu && (cursorX < menuX || cursorX > menuX + menuWidth || cursorY < menuY || cursorY > menuY + menuHeight)) {
        showMenu = false;
      }
      if (showClockMenu && (cursorX < clockX || cursorX > clockX + clockSize || cursorY < clockY - menuHeight || cursorY > clockY)) {
        showClockMenu = false;
      }
      if (showRightClickMenuTaskbar && (cursorX < rightClickMenuX || cursorX > rightClickMenuX + rightClickMenuWidth || cursorY < rightClickMenuY || cursorY > rightClickMenuY + rightClickMenuHeight)) {
        showRightClickMenuTaskbar = false;
      }
    }
    if (!(pad.btns & Pads.CROSS) && lastCrossState) {
      if (showRightClickMenuDesktop) {
        if (cursorY < startButtonY &&
          (cursorX < rightClickMenuX || cursorX > rightClickMenuX + rightClickMenuWidth || cursorY < rightClickMenuY || cursorY > rightClickMenuY + rightClickMenuHeight)) {
          showRightClickMenuDesktop = false;
        }
      }
      if (isDragging && cursorY < startButtonY) {
        if (showRightClickMenuDesktop) {
          showRightClickMenuDesktop = false;
        }
      }
    }


    if (showRightClickMenuTaskbar && !(pad.btns & Pads.CIRCLE) && (pad.btns & Pads.CROSS)) {
      if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 10 && cursorY <= rightClickMenuY + 30) {
        colorMode = 1;
        showRightClickMenuTaskbar = false;
      } else if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 30 && cursorY <= rightClickMenuY + 50) {
        colorMode = 2;
        showRightClickMenuTaskbar = false;
      } else if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 50 && cursorY <= rightClickMenuY + 70) {
        colorMode = 3;
        showRightClickMenuTaskbar = false;
      }
    }


    if (showRightClickMenuDesktop && !(pad.btns & Pads.CIRCLE) && (pad.btns & Pads.CROSS)) {
      if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 10 && cursorY <= rightClickMenuY + 30) {

        showRightClickMenuDesktop = false;
      } else if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 30 && cursorY <= rightClickMenuY + 50) {

        showRightClickMenuDesktop = false;
      } else if (cursorX >= rightClickMenuX + 10 && cursorX <= rightClickMenuX + rightClickMenuWidth - 10 &&
        cursorY >= rightClickMenuY + 50 && cursorY <= rightClickMenuY + 70) {

        showRightClickMenuDesktop = false;
      }
    }


    if (pad.btns & Pads.CROSS) {
      if (!isDragging && cursorY < startButtonY) {
        isDragging = true;
        dragStartX = cursorX;
        dragStartY = cursorY;
      }
      dragEndX = cursorX;
      dragEndY = cursorY;
    } else if (isDragging) {
      isDragging = false;
    }


    if (showCoords) {
      try {
        font.print(10, 10, `X: ${cursorX.toFixed(0)}, Y: ${cursorY.toFixed(0)}`);
      } catch (e) {

      }
    }

    Screen.flip();
    Screen.waitVblankStart(1);
  }
}


main();