import { checkLogin } from "./auth/auth.js";
import { getDevices, getStorageQuantity, createDevice } from "./services/posDeviceService.js";
import { renderDevices, setEstoqueColor } from "./ui/ui.js";
import { registerFilterEvents, registerCreateEvent } from "./events/events.js";

document.addEventListener("DOMContentLoaded", async () => {
    await checkLogin();
    const devices = await getDevices();
    renderDevices(devices);
    const quantity = await getStorageQuantity();
    setEstoqueColor(quantity);
    registerFilterEvents();
    await createDevice(registerCreateEvent());
});