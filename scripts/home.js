function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let homeXHTTP;

document.addEventListener("DOMContentLoaded", function () {
    homeXHTTP = new XMLHttpRequest();

    if (!homeXHTTP) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }

    homeXHTTP.onreadystatechange = mountHistory;
    homeXHTTP.open("GET", "../backend/getUserHistory.php");
    homeXHTTP.send();
});

function mountHistory() {
    try {
        if (homeXHTTP.readyState === XMLHttpRequest.DONE) {
            if (homeXHTTP.status === 200) {
                const data = JSON.parse(homeXHTTP.responseText);
                if (data.length > 0) {
                    const table = document.querySelector(".tableHistory");
                    data.forEach((item) => {
                        const row = document.createElement("tr");
                        const matchMode =
                            item.modalidade === 0 ? "Normal" : "Rivotril";
                        const matchResult =
                            item.resultado === 0 ? "Derrota" : "Vitória";

                        const matchDate = new Date(
                            item.datahora
                        ).toLocaleDateString();

                        const matchTime = new Date(
                            item.datahora
                        ).toLocaleTimeString();

                        row.innerHTML = `
                            <td>${item.linhas}x${item.colunas}</td>
                            <td>${item.bombas}</td>
                            <td>${matchMode}</td>
                            <td>${formatTime(item.tempo)}</td>
                            <td>${matchResult}</td>
                            <td>${matchDate}</td>
                            <td>${matchTime}</td>
                        `;
                        table.appendChild(row);
                    });
                } else {
                    const tableSection = document.querySelector(".history");
                    const noGamesText = document.createElement("p");
                    noGamesText.innerHTML = "Nenhum registro de jogo";
                    tableSection.removeChild(
                        document.querySelector(".tableHistory")
                    );
                    tableSection.appendChild(noGamesText);
                }
            } else {
                console.log(homeXHTTP.responseText);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
}
