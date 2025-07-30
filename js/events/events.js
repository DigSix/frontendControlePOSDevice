import { renderDevices, clearDevicesTable, setStorageColor, setBrokenColor } from "../ui/ui.js";

export async function renderEvent(onRender){
    const rendered  = await onRender();
    renderDevices(rendered);
}

export async function storageColorEvent(onSetColor){
    const quantity = await onSetColor();
    setStorageColor(quantity);
}

export async function brokenColorEvent(onSetColor){
    const quantity = await onSetColor();
    setBrokenColor(quantity);
}

export function filterEvent(onFilter) {
    const fields = [
        "filteringSerialNumber", "filteringLogicalNumber", "filteringReciveDate",
        "filteringStatus", "filteringChangeReason", "filteringProtocol", "filteringExitDate"
    ];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", async () => {
            const filter = fields.reduce((acc, id) => {
                acc[id.replace("filtering", "").charAt(0).toLowerCase() + id.slice(10)] =
                    document.getElementById(id).value;
                return acc;
            }, {});
            const filtered = await onFilter(filter)
            clearDevicesTable();
            renderDevices(filtered);
        });
    });
}

export function createEvent(onCreate, onRender, onStorageColor, onBrokenColor){
    const createBtn = document.getElementById("btn-create");
    createBtn.onclick = () => {
        const editCreateModal = new bootstrap.Modal("#editCreateModal", {
            keyboard: false
        })

        document.getElementById("editCreateModalLabel").textContent = `Criando:`;
        document.getElementById("deviceSerialDisplay").style.display = "block";
        document.getElementById("deviceLogicalDisplay").style.display = "block";
        document.getElementById("deviceReciveDateDisplay").style.display = "block";

        editCreateModal.show();

        const saveBtn = document.getElementById("btn-save-device");
        saveBtn.onclick = async () => {
            const posDevice = {
                serialNumber: document.getElementById("creatingSerialNumber").value,
                logicalNumber: document.getElementById("creatingLogicalNumber").value,
                reciveDate: document.getElementById("creatingReciveDate").value,
                status: document.getElementById("creatingStatus").value,
                changeReason: document.getElementById("creatingChangeReason").value,
                protocol: document.getElementById("creatingProtocol").value,
                exitDate: document.getElementById("creatingExitDate").value
            };
            editCreateModal.hide();
            await onCreate(posDevice);
            await renderEvent(onRender);
            await storageColorEvent(onStorageColor);
            await brokenColorEvent(onBrokenColor);
        };
    }
}

export function editEvent(onEdit, onRender, onStorageColor, onBrokenColor){
    const tableBody = document.getElementById("table-posDevices");

    tableBody.addEventListener("click", (event) => {
        const clickedButton = event.target.closest(".btn-edit");
        if (clickedButton) {
            const editCreateModal = new bootstrap.Modal("#editCreateModal", {
                keyboard: false
            });
                    
            const deviceId = clickedButton.dataset.id;

            document.getElementById("editCreateModalLabel").textContent = `Editando: ${deviceId}`;
            document.getElementById("deviceSerialDisplay").style.display = "none";
            document.getElementById("deviceLogicalDisplay").style.display = "none";
            document.getElementById("deviceReciveDateDisplay").style.display = "none";

            editCreateModal.show();

            const saveBtn = document.getElementById("btn-save-device");
            saveBtn.onclick = async() => {
                const posDevice = {
                    serialNumber: deviceId,
                    logicalNumber: "",
                    reciveDate: "",
                    status: document.getElementById("creatingStatus").value,
                    changeReason: document.getElementById("creatingChangeReason").value,
                    protocol: document.getElementById("creatingProtocol").value,
                    exitDate: document.getElementById("creatingExitDate").value
                };
                editCreateModal.hide();
                await onEdit(posDevice);
                await renderEvent(onRender);
                await storageColorEvent(onStorageColor);
                await brokenColorEvent(onBrokenColor);
            };
        }
    });
}