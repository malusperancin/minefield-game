const MODES = {
    NORMAL: "Normal",
    RIVOTRIL: "Rivotril",
};

const actualGame = {
    linesNumber: 0,
    columnsNumber: 0,
    bombs: [],
    plays: [],
    revealedCellsCount: 0,
    startedPlaying: false,
    cheatModeActive: false,
    mode: MODES.NORMAL,
    elapsedTime: "00:00",
};

var timerInterval = null;
var stopWatchInterval = null;

function redirectTo(location) {
    window.location.href = `${location}.html`;
}

function generateBombs(bombsNumber, lines, columns) {
    const bombs = [];

    for (let i = 0; i < bombsNumber; i++) {
        const bomb = {
            x: parseInt(Math.random() * columns),
            y: parseInt(Math.random() * lines),
        };
        if (
            bombs.some(
                (existingBomb) =>
                    existingBomb.x === bomb.x && existingBomb.y === bomb.y
            )
        ) {
            i--;
            continue;
        }
        bombs.push(bomb);
    }

    return bombs;
}

function validateGameForm(
    linesNumber,
    columnsNumber,
    bombsNumber,
    selectedMode
) {
    let errorMessage = "";

    if (linesNumber > 30 || linesNumber < 1) {
        errorMessage = "Número de linhas inválido. Deve estar entre 1 e 30.";
    } else if (columnsNumber > 30 || columnsNumber < 1) {
        errorMessage = "Número de colunas inválido. Deve estar entre 1 e 30.";
    } else if (bombsNumber > linesNumber * columnsNumber || bombsNumber < 1) {
        errorMessage =
            "Número de bombas inválido. Deve estar entre 1 e " +
            linesNumber * columnsNumber +
            ".";
    }

    if (selectedMode === null) errorMessage = "Selecione um modo de jogo";

    if (errorMessage) {
        generateErrorMessage(errorMessage);
        return false;
    }

    return true;
}

function generateErrorMessage(message) {
    const existingError = document.getElementById("errorMessage");

    if (existingError) {
        existingError.remove();
    }

    const errorElement = document.createElement("div");
    errorElement.id = "errorMessage";
    errorElement.style.color = "red";
    errorElement.textContent = message;
    document.getElementById("gameForm").appendChild(errorElement);
}

function generateGame() {
    const linesNumber = document.getElementById("lines").value;
    const columnsNumber = document.getElementById("columns").value;
    const bombsNumber = document.getElementById("bombs").value;

    const selectedMode = document.querySelector(
        'input[name="gameMode"]:checked'
    );

    if (
        !validateGameForm(linesNumber, columnsNumber, bombsNumber, selectedMode)
    ) {
        return false;
    }

    document.getElementById("inicio").style.display = "none";
    document.getElementById("game").style.display = "block";

    actualGame.bombs = generateBombs(bombsNumber, linesNumber, columnsNumber);
    actualGame.linesNumber = linesNumber;
    actualGame.columnsNumber = columnsNumber;
    actualGame.revealedCellsCount = 0;
    actualGame.plays = [];
    actualGame.startedPlaying = false;
    actualGame.cheatModeActive = false;

    if (selectedMode.value === MODES.RIVOTRIL) {
        actualGame.mode = MODES.RIVOTRIL;
    } else {
        actualGame.mode = MODES.NORMAL;
    }

    document.getElementById(
        "dimensionInfo"
    ).textContent = `${linesNumber}x${columnsNumber}`;
    document.getElementById("modeInfo").textContent = actualGame.mode;

    if (actualGame.mode === MODES.RIVOTRIL) {
        document.getElementById("timerInfo").textContent = convertTime(
            calculateTime()
        );
        document.getElementById("timer").classList.add("active");
    } else {
        document.getElementById("timer").classList.remove("active");
    }

    renderGrid(actualGame);
    return false;
}

function renderGrid() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    const table = document.getElementById("table");
    table.innerHTML = "";
    for (let lin = 0; lin < actualGame.linesNumber; lin++) {
        const newTr = document.createElement("tr");
        for (let col = 0; col < actualGame.columnsNumber; col++) {
            const newTd = document.createElement("td");
            newTd.setAttribute("data-x", col);
            newTd.setAttribute("data-y", lin);
            newTd.addEventListener(
                "click",
                handleOnClick(parseInt(lin), parseInt(col))
            );

            newTd.addEventListener(
                "contextmenu",
                ((lin, col) => {
                    const clickedBomb = {
                        x: col,
                        y: lin,
                    };
                    return () => setFlag(clickedBomb);
                })(lin, col)
            );
            newTr.appendChild(newTd);
        }
        table.appendChild(newTr);
    }
}

function handleOnClick(lin, col){
    const clickedBomb = {
        x: col,
        y: lin,
    };
    return () => revealCell(clickedBomb, false);
}

function revealCell(clickedBomb, isAutomatic) {
    const {
        bombs,
        linesNumber,
        columnsNumber,
        revealedCellsCount,
        startedPlaying,
        cheatModeActive,
        mode,
    } = actualGame;

    if(cheatModeActive && !isAutomatic) return;

    if (!startedPlaying) {
        startStopWatch();
        if (mode === MODES.RIVOTRIL) startTimer();
    }

    if (revealedCellsCount === 0) {
        actualGame.startedPlaying = true;
    }

    const cell = document.querySelector(
        `td[data-x='${clickedBomb.x}'][data-y='${clickedBomb.y}']`
    );

    if (
        !actualGame.plays.some(
            (play) => play.x === clickedBomb.x && play.y === clickedBomb.y
        )
    ) {
        actualGame.plays.push(clickedBomb);
    }

    if (cell.classList.contains("revealed")) {
        return;
    }

    if (hasBomb(clickedBomb, bombs)) {
        if (isAutomatic) {
            cell.innerHTML =
                '<img class="bomb" src="../images/bomb.png" alt="" />';
        } else {
            cell.innerHTML =
                '<img class="bomb" src="../images/bomb.png" alt="" />';
            cell.classList.add("revealed");
            onLose();
        }
        return;
    }

    verifySpace(
        clickedBomb.x,
        clickedBomb.y,
        bombs,
        columnsNumber,
        linesNumber
    );
}

function setFlag(clickedBomb) {
    const cell = document.querySelector(
        `td[data-x='${clickedBomb.x}'][data-y='${clickedBomb.y}']`
    );
    if (!cell.classList.contains("revealed")) {
        cell.innerHTML = '<img class="bomb" src="../images/flag.png" alt="" />';
    }
}

function hasBomb(potencialBomb, bombs) {
    return bombs.some(
        (existingBomb) =>
            existingBomb.x === potencialBomb.x &&
            existingBomb.y === potencialBomb.y
    );
}

function verifySpace(x, y, bombs, xMax, yMax) {
    if (hasBomb({ x, y }, bombs)) {
        return;
    }

    let totalBombsCount = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (
                (i === x && j === y) ||
                i < 0 ||
                j < 0 ||
                i >= xMax ||
                j >= yMax
            )
                continue;

            if (hasBomb({ x: i, y: j }, bombs)) {
                totalBombsCount++;
            }
        }
    }

    const cell = document.querySelector(`td[data-x='${x}'][data-y='${y}']`);
    if (cell.classList.contains("revealed")) return;

    cell.classList.add("revealed");
    cell.style.backgroundColor = "gray";
    actualGame.revealedCellsCount++;

    if (totalBombsCount > 0) {
        showNumber(x, y, totalBombsCount);
    } else {
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (
                    (i === x && j === y) ||
                    i < 0 ||
                    j < 0 ||
                    i >= xMax ||
                    j >= yMax
                )
                    continue;
                verifySpace(i, j, bombs, xMax, yMax);
            }
        }
    }

    verifyWin();
}

function showNumber(x, y, number) {
    const cell = document.querySelector(`td[data-x='${x}'][data-y='${y}']`);
    cell.innerHTML = number;
    cell.style.backgroundColor = "gray";
}

function cheatMode() {
    const { linesNumber, columnsNumber, plays } = actualGame;
    const flag = document.getElementById("cheatFlag");

    actualGame.cheatModeActive = true;
    showAll();

    flag.textContent = "ON";
    flag.style.backgroundColor = "green";

    setTimeout(() => {
        for (let x = 0; x < columnsNumber; x++) {
            for (let y = 0; y < linesNumber; y++) {
                const cell = document.querySelector(
                    `td[data-x='${x}'][data-y='${y}']`
                );
                cell.innerHTML = "";
                cell.style.backgroundColor = "";
                cell.classList.remove("revealed");
            }
        }

        plays.forEach((item) => {
            revealCell(item, true);
        });
        actualGame.cheatModeActive = false;
        
        flag.textContent = "OFF";
        flag.style.backgroundColor = "rgb(207, 51, 51)";
    }, 2000);
}

function onLose() {
    showModal("Você perdeu!");
    if (actualGame.mode === MODES.RIVOTRIL) {
        clearInterval(timerInterval);
    }
    clearInterval(stopWatchInterval);
    console.log(actualGame.elapsedTime); // será utilizado para salvar histórico
    showAll();
}

function inicialPageScreen() {
    closeModal();
    redirectTo("home");
}

function newGame() {
    closeModal();
    generateGame();
}

function showModal(text) {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    document.getElementById("modalText").textContent = text;
    modal.classList.add("active");
    overlay.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.style.display = "none"; // Oculta o overlay
}

function showAll() {
    const { bombs, linesNumber, columnsNumber } = actualGame;
    actualGame.revealedCellsCount = 0;

    bombs.forEach((bomb) => {
        const cell = document.querySelector(
            `td[data-x='${bomb.x}'][data-y='${bomb.y}']`
        );
        cell.innerHTML = '<img class="bomb" src="../images/bomb.png" alt="" />';
    });

    for (let x = 0; x < columnsNumber; x++) {
        for (let y = 0; y < linesNumber; y++) {
            const cell = document.querySelector(
                `td[data-x='${x}'][data-y='${y}']`
            );
            if (!hasBomb({ x, y }, bombs)) {
                let totalBombsCount = 0;

                for (let i = x - 1; i <= x + 1; i++) {
                    for (let j = y - 1; j <= y + 1; j++) {
                        if (
                            (i === x && j === y) ||
                            i < 0 ||
                            j < 0 ||
                            i >= columnsNumber ||
                            j >= linesNumber
                        )
                            continue;
                        if (hasBomb({ x: i, y: j }, bombs)) {
                            totalBombsCount++;
                        }
                    }
                }

                if (totalBombsCount > 0) {
                    cell.innerHTML = totalBombsCount;
                }
                cell.style.backgroundColor = "gray";
            }
        }
    }
}

function verifyWin() {
    const {
        linesNumber,
        columnsNumber,
        bombs,
        revealedCellsCount,
        elapsedTime,
        mode,
    } = actualGame;

    if (revealedCellsCount === linesNumber * columnsNumber - bombs.length) {
        if (mode === MODES.RIVOTRIL) {
            clearInterval(timerInterval);
        }
        clearInterval(stopWatchInterval);
        console.log(elapsedTime); // será utilizado para salvar histórico
        showModal("Você venceu!");
        showAll();
    }
}

function calculateTime() {
    const maxTime = 240;
    const minTime = 0;

    const normalizedSize =
        (actualGame.columnsNumber * actualGame.linesNumber) / (30 * 30);

    const time = minTime + Math.round(normalizedSize * (maxTime - minTime));

    return time;
}

function startStopWatch() {
    let seconds = 0;
    let minutes = 0;
    const stopwatch = document.getElementById("stopwatchInfo");
    stopWatchInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        const result = `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
        }`;
        actualGame.elapsedTime = result;
        stopwatch.textContent = result;
    }, 1000);
}

function startTimer() {
    const totalSeconds = calculateTime();

    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60);
    const timer = document.getElementById("timerInfo");

    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                onLose();
                return;
            }
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }
        timer.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
        }`;
    }, 1000);
}

function convertTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
}
