export function clearDevicesTable() {
    document.getElementById("table-posDevices").innerHTML = "";
}

export function renderDevices(devices) {
    const tbody = document.getElementById("table-posDevices");
    tbody.innerHTML = ""; // limpeza segura
    devices.forEach(device => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${device.serialNumber}</td>
            <td>${device.logicalNumber}</td>
            <td>${device.reciveDate}</td>
            <td>${device.status}</td>
            <td>${device.changeReason}</td>
            <td>${device.protocol}</td>
            <td>${device.exitDate}</td>
            <td>
                <button class="btn btn-primary btn-sm btn-edit" data-id="${device.serialNumber}">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

export function setEstoqueColor(valor) {
    const span = document.getElementById("qtd-estoque");
    let color = "#000";

    if (valor <= 5) color = "#ff0000";
    else if (valor >= 10) color = "#00c853";
    else {
        const ratio = (valor - 5) / 5;
        const r = Math.round(255 - 255 * ratio);
        const g = Math.round(255 * ratio);
        color = `rgb(${r},${g},0)`;
    }

    span.innerText = valor;
    span.style.color = color;
    span.style.fontWeight = "bold";
    span.style.fontSize = "2rem";
}