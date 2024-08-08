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

    console.log(bombs);
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
    document.getElementById("grid").style.display = "block";

    const bombs = generateBombs(bombsNumber, linesNumber, columnsNumber);

    const infos = {
        linesNumber,
        columnsNumber,
        bombs,
    };

    renderGrid(infos);
}


function renderGrid(infos) {
    for (let lin = 0; lin < infos.linesNumber; lin++) {
        const newTr = document.createElement("tr");
        for (col = 0; col < infos.columnsNumber; col++) {
            const newTd = document.createElement("td");
            newTd.addEventListener("click", ((lin, col) => {
                const clickedBomb = {
                    x: col,
                    y: lin,
                }
                return () => onCellClick(clickedBomb, infos.bombs);
            })(lin, col));
            newTr.appendChild(newTd);
        }
        document.getElementById("table").appendChild(newTr);
    }
}

function onCellClick(clickedBomb, bombs) {
    if (bombs.some(existingBomb => existingBomb.x === clickedBomb.x && existingBomb.y === clickedBomb.y)) {
        console.log("BOMBA");
        // finishGame();
    }
}

// function finishGame() {
//     showAllBombs();
//     saveGame();
//     showGameOverModal();
// }