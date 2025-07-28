import { api } from "../api/api.js";

export async function getDevices() {
    const res = await api.get("/loadDevices");
    return res.data;
}

export async function createDevice(device) {
    return await api.post("/createDevice", device);
}

export async function editDevice(device) {
    return await api.post("/editDevice", device);
}

export async function filterDevices(filter) {
    const res = await api.post("/filterDevices", filter);
    return res.data;
}

export async function getStorageQuantity() {
    const res = await api.get("/storagedDevices");
    return res.data.quantity;
}