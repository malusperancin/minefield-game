function generateBombs(bombsNumber, lines, columns) {
    const bombs = [];

    for (let i = 0; i < bombsNumber; i++) {
        const bomb = {
            x: parseInt(Math.random() * lines),
            y: parseInt(Math.random() * columns),
        }
        if (bombs.some(existingBomb => existingBomb.x === bomb.x && existingBomb.y === bomb.y)) {
            i--;
            continue;
        }
        bombs.push(bomb);
    }

    return bombs;
}

function generateGame() {
    const linesNumber = document.getElementById("lines").value;
    const columnsNumber = document.getElementById("columns").value;
    const bombsNumber = document.getElementById("bombs").value;

    const existingError = document.getElementById("error-message");
    if (existingError) {
        existingError.remove();
    }

    let errorMessage = "";

    if (linesNumber > 30 || linesNumber < 1) {
        errorMessage = "Número de linhas inválido. Deve estar entre 1 e 30.";
    } else if (columnsNumber > 30 || columnsNumber < 1) {
        errorMessage = "Número de colunas inválido. Deve estar entre 1 e 30.";
    } else if (bombsNumber > (linesNumber * columnsNumber) || bombsNumber < 1) {
        errorMessage = "Número de bombas inválido. Deve estar entre 1 e " + (linesNumber * columnsNumber) + ".";
    }

    if (errorMessage) {
        const errorElement = document.createElement("div");
        errorElement.id = "error-message";
        errorElement.style.color = "red";
        errorElement.textContent = errorMessage;
        document.getElementById("form").appendChild(errorElement);

        document.getElementById("lines").value = "";
        document.getElementById("columns").value = "";
        document.getElementById("bombs").value = "";

        return;
    }

    document.getElementById("form").style.display = "none";
    document.getElementById("grid").style.display = "flex";

    const bombs = generateBombs(bombsNumber, linesNumber, columnsNumber);

    const infos = {
        linesNumber,
        columnsNumber,
        bombs,
    };

    renderGrid(infos);
}


function renderGrid(infos) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    const table = document.getElementById("table");
    table.innerHTML = '';
    for (let lin = 0; lin < infos.linesNumber; lin++) {
        const newTr = document.createElement("tr");
        for (let col = 0; col < infos.columnsNumber; col++) {
            const newTd = document.createElement("td");
            newTd.setAttribute('data-x', col);
            newTd.setAttribute('data-y', lin);
            newTd.addEventListener("click", ((lin, col) => {
                const clickedBomb = {
                    x: col,
                    y: lin,
                }
                return () => onCellClick(clickedBomb, infos);
            })(lin, col));

            newTd.addEventListener("contextmenu", ((lin, col) => {
                const clickedBomb = {
                    x: col,
                    y: lin,
                }
                return () => setFlag(clickedBomb);
            })(lin, col));
            newTr.appendChild(newTd);
        }
        table.appendChild(newTr);
    }
}


function onCellClick(clickedBomb, infos) {
    const { bombs, linesNumber, columnsNumber } = infos;
    const cell = document.querySelector(`td[data-x='${clickedBomb.x}'][data-y='${clickedBomb.y}']`);
    if (hasBomb(clickedBomb, bombs)) 
        cell.innerHTML = '<img class="bombImage" src="./images/bomb.png" alt="" />';
    else
        verifySpace(clickedBomb.x, clickedBomb.y, bombs, linesNumber, columnsNumber);
}

function setFlag(clickedBomb) {
    const cell = document.querySelector(`td[data-x='${clickedBomb.x}'][data-y='${clickedBomb.y}']`);
    if (!cell.classList.contains('revealed')) {
        cell.innerHTML = '<img class="bombImage" src="./images/flag.png" alt="" />';
    }
}

function hasBomb(potencialBomb, bombs) {
    return bombs.some(existingBomb => existingBomb.x === potencialBomb.x && existingBomb.y === potencialBomb.y);
}

function verifySpace(x, y, bombs, xMax, yMax) {
    let totalBombsCount = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if ((i === x && j === y) || i < 0 || j < 0 || i >= xMax || j >= yMax) continue;

            if (hasBomb({ x: i, y: j }, bombs)) {
                totalBombsCount++;
            }
        }
    }

    const cell = document.querySelector(`td[data-x='${x}'][data-y='${y}']`);
    if (cell.classList.contains('revealed')) return;

    cell.classList.add('revealed');
    cell.style.backgroundColor = 'gray';

    if (totalBombsCount > 0) {
        showNumber(x, y, totalBombsCount);
    } else {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if ((i === x && j === y) || i < 0 || j < 0 || i >= xMax || j >= yMax) continue;
                verifySpace(i, j, bombs, xMax, yMax);
            }
        }
    }
}

function showNumber(x, y, number) {
    const cell = document.querySelector(`td[data-x='${x}'][data-y='${y}']`);
    cell.innerHTML = number;
    cell.style.backgroundColor = 'gray';
}


// function finishGame() {
//     showAllBombs();
//     saveGame();
//     showGameOverModal();
// }