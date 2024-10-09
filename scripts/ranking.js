function redirectTo(location) {
    window.location.href = `${location}.html`;
}

document.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('.tableRanking');

    const mockData = [
        {
            "user": "mariasm",
            "dimension": "30x30",
            "bombsNumber": 10,
            "kind": "Normal",
            "duration": "3:00",
            "result": 1,
            "date": "10/10/2024",
            "time": "19:51"
        },
        {
            "user": "mariasm",
            "dimension": "20x30",
            "bombsNumber": 15,
            "kind": "Normal",
            "duration": "5:00",
            "result": 1,
            "date": "08/10/2024",
            "time": "13:12"
        },
        {
            "user": "mariasm",
            "dimension": "30x10",
            "bombsNumber": 23,
            "kind": "Rivotril",
            "duration": "5:23",
            "result": 0,
            "date": "11/08/2024",
            "time": "12:51"
        }
    ];

    mockData.forEach(item => {
        const row = document.createElement('tr');
        const resultText = item.result === 1 ? 'Vitória' : 'Derrota';

        row.innerHTML = `
            <td>${item.user}</td>
            <td>${item.dimension}</td>
            <td>${item.bombsNumber}</td>
            <td>${item.kind}</td>
            <td>${item.duration}</td>
            <td>${resultText}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
        `;

        table.appendChild(row);
    });
});