import { checkLogin } from "./auth/auth.js";
import { getDevices, getStorageQuantity, getBrokenQuantity, filterDevices, createDevice, editDevice } from "./services/posDeviceService.js";
import { renderEvent, storageColorEvent, brokenColorEvent, filterEvent, createEvent, editEvent} from "./events/events.js";

document.addEventListener("DOMContentLoaded", async () => {
    await checkLogin();
    renderEvent(async () => await getDevices());
    storageColorEvent(async () => await getStorageQuantity());
    brokenColorEvent(async () => await getBrokenQuantity());
    
    filterEvent(async (filter) => await filterDevices(filter));

    createEvent(async (device) => await createDevice(device), 
                async () => await getDevices(),
                async () => await getStorageQuantity(),
                async () => await getBrokenQuantity());
                
    editEvent(async (device) => await editDevice(device),
              async () => await getDevices(),
              async () => await getStorageQuantity(),
              async () => await getBrokenQuantity());
});