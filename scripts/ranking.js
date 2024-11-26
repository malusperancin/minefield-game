function redirectTo(location) {
    window.location.href = `${location}.php`;
}

let rankingXHTTP;

document.addEventListener("DOMContentLoaded", function () {
    rankingXHTTP = new XMLHttpRequest();
    if (!rankingXHTTP) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }
    rankingXHTTP.onreadystatechange = mountRanking;
    rankingXHTTP.open("GET", "../backend/getRanking.php");
    rankingXHTTP.send();
});

function mountRanking() {
    try {
        if (rankingXHTTP.readyState === XMLHttpRequest.DONE) {
            if (rankingXHTTP.status === 200) {
                const data = JSON.parse(rankingXHTTP.responseText);
                console.log(data);
                if (data.length > 0) {
                    const table = document.querySelector(".tableRanking");

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
                            <td>${item.username}</td>
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
                    const rankingSection = document.querySelector(".ranking");
                    rankingSection.removeChild(
                        document.querySelector(".tableRanking")
                    );
                    const noRankingText = document.createElement("p");
                    noRankingText.innerHTML = "Ranking indisponível";
                    rankingSection.insertBefore(
                        noRankingText,
                        document.querySelector(".buttons")
                    );
                }
            } else {
                console.log(rankingXHTTP.responseText);
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
