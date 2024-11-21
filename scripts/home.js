function redirectTo(location) {
    window.location.href = `${location}.php`;
}
document.addEventListener("DOMContentLoaded", function () {
    xhttp = new XMLHttpRequest();

    if (!xhttp) {
        console.log("Erro ao criar objeto xhttp");
        return;
    }

    xhttp.onreadystatechange = mountHistory;
    xhttp.open("GET", "../backend/getUserHistory.php");
    xhttp.send();
});

function mountHistory() {
    try {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
            if (xhttp.status == 200) {
                const data = JSON.parse(xhttp.responseText);
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
                console.log(xhttp.responseText);
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
