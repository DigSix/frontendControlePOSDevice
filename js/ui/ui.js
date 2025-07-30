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

export function setStorageColor(value) {
    const span = document.getElementById("qtd-estoque");
    let color = "#000";

    if (value <= 5) color = "#ff0000";
    else if (value >= 10) color = "#ffffff";
    else {
        const ratio = (value - 5) / 5;
        const cRatio = Math.round(255 * ratio);
        color = `rgb(255,${cRatio},${cRatio})`;
    }

    span.innerText = value;
    span.style.color = color;
    span.style.fontWeight = "bold";
    span.style.fontSize = "2rem";
}

export function setBrokenColor(value) {
    const span = document.getElementById("qtd-broken");
    let color = "#000";

    if (value <= 0) color = "#ffffff";
    else if (value >= 10) color = "#ff0000";
    else {
        const cRatio = Math.round(255 / value);
        color = `rgb(255,${cRatio},${cRatio})`;
    }

    span.innerText = value;
    span.style.color = color;
    span.style.fontWeight = "bold";
    span.style.fontSize = "2rem";
}