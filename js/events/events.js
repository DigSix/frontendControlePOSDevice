import { filterDevices } from "../services/posDeviceService.js";
import { renderDevices, clearDevicesTable } from "../ui/ui.js";

export function registerFilterEvents() {
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
            const filtered = await filterDevices(filter);
            clearDevicesTable();
            renderDevices(filtered);
        });
    });
}

export function registerCreateEvent(){
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

        const posDevice = {
            serialNumber: document.getElementById("creatingSerialNumber").value,
            logicalNumber: document.getElementById("creatingLogicalNumber").value,
            reciveDate: document.getElementById("creatingReciveDate").value,
            status: document.getElementById("creatingStatus").value,
            changeReason: document.getElementById("creatingChangeReason").value,
            protocol: document.getElementById("creatingProtocol").value,
            exitDate: document.getElementById("creatingExitDate").value
        };

        const saveBtn = document.getElementById("btn-save-device");
        saveBtn.onclick = () => {
            editCreateModal.hide();
            return posDevice;
        }
    }
}