// Configuração do Axios
const API_URL = "http://localhost:3000/api";





function clearLoign(){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
}

function clearDevices(){
    const tbody = document.getElementById("table-posDevices");
    tbody.innerHTML = "";
}

function showDevices(devices){
    devices.forEach(device => {
        const tbody = document.getElementById("table-posDevices");
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
                <button id="btn-edit" class="btn btn-primary btn-sm" data-id="${device.serialNumber}" title="Editar dispositivo">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Endpoints
async function checkLogin() {
    try {
        const test1 = await axios.post(`${API_URL}/login`, {
            login: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password")
        });

        if (!test1.data.success){
            const test2 = await axios.post(`${API_URL}/login`, {
                login: localStorage.getItem("username"),
                password: localStorage.getItem("password")
            });
            if(!test2.data.success){
                window.location.href = "login.html";
           }
            
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login. Por favor, tente novamente.");
    }
}


async function loadDevices() {
    try {
        const response = await axios.get(`${API_URL}/loadDevices`);
        const devices = response.data;

        clearDevices();
        showDevices(devices);
        storagedDevices();

    } catch (error) {
        console.error("Erro ao carregar dispositivos:", error);
    }
}

async function createDevice(){
    try{
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
            saveBtn.onclick = async() => {
                try{
                    const posDevice = {
                        serialNumber: document.getElementById("creatingSerialNumber").value,
                        logicalNumber: document.getElementById("creatingLogicalNumber").value,
                        reciveDate: document.getElementById("creatingReciveDate").value,
                        status: document.getElementById("creatingStatus").value,
                        changeReason: document.getElementById("creatingChangeReason").value,
                        protocol: document.getElementById("creatingProtocol").value,
                        exitDate: document.getElementById("creatingExitDate").value
                    };
    
                    await axios.post(`${API_URL}/createDevice`, posDevice);
                    editCreateModal.hide();
                    loadDevices();
                } catch (error){
                    console.error("Erro ao criar dispositivo: ", error);
                    alert("Erro ao criar dispositivo. Por favor, tente novamente.");
                }
            };
        };
    }
    catch (error) {
        console.error("Erro ao abrir modal de criação:", error);
        alert("Não foi possível abrir o formulário de criação de dispositivo.");
    }
}

async function filterDevices(){
    try{
        const posDevice = {
            serialNumber: document.getElementById("filteringSerialNumber").value,
            logicalNumber: document.getElementById("filteringLogicalNumber").value,
            reciveDate: document.getElementById("filteringReciveDate").value,
            status: document.getElementById("filteringStatus").value,
            changeReason: document.getElementById("filteringChangeReason").value,
            protocol: document.getElementById("filteringProtocol").value,
            exitDate: document.getElementById("filteringExitDate").value
        };
        const resDevices = await axios.post(`${API_URL}/filterDevices`, posDevice);
        console.log(resDevices.data);
        clearDevices();
        showDevices(resDevices.data);

    }
    catch(error){
        console.error("Erro ao filtrar dispositivos: ", error);
        alert("Erro ao filtrar dispositivos. Por favor, tente novamente.");
    }
}

async function editDevice() {
    try {
        const tableBody = document.getElementById("table-posDevices");

        tableBody.addEventListener("click", (event) => {
            const clickedButton = event.target.closest("#btn-edit");
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
                    try {
                        const posDevice = {
                            serialNumber: deviceId,
                            logicalNumber: "",
                            reciveDate: "",
                            status: document.getElementById("creatingStatus").value,
                            changeReason: document.getElementById("creatingChangeReason").value,
                            protocol: document.getElementById("creatingProtocol").value,
                            exitDate: document.getElementById("creatingExitDate").value
                        };
                        await axios.post(`${API_URL}/editDevice`, posDevice);
                        editCreateModal.hide();
                        loadDevices();
                    } catch (error) {
                        console.error("Erro ao salvar edição do dispositivo: ", error);
                        alert("Erro ao salvar edição. Por favor, tente novamente.");
                    }
                };
            }
        });
    } catch (error) {
        console.error("Erro na função editDevice: ", error);
        alert("Ocorreu um erro ao tentar editar o dispositivo.");
    }
}

async function storagedDevices() {
    try {
        const span = document.getElementById("qtd-estoque");
        const response = await axios.get(`${API_URL}/storagedDevices`);
        const valor = response.data.quantity;
        span.innerText = valor;
        setEstoqueGradient(valor);
    } catch (error) {
        span.innerText = "Erro";
        span.style.background = "";
        console.error("Erro ao buscar quantidade de devices em estoque:", error);
    }
}

function setEstoqueGradient(valor) {
    const span = document.getElementById("qtd-estoque");
    let color = "";

    if (valor <= 5) {
        color = "#ff0000"; // Vermelho puro
    } else if (valor >= 10) {
        color = "#00c853"; // Verde puro
    } else {
        // Gradiente entre vermelho, amarelo e verde no texto
        // Até 7.5 vai de vermelho para amarelo, depois para verde
        if (valor < 7.5) {
            // Vermelho para amarelo
            const ratio = (valor - 5) / 2.5;
            const r = 255;
            const g = Math.round(0 + 255 * ratio);
            const b = 0;
            color = `rgb(${r},${g},${b})`;
        } else {
            // Amarelo para verde
            const ratio = (valor - 7.5) / 2.5;
            const r = Math.round(255 - 255 * ratio);
            const g = 255;
            const b = Math.round(0 + 83 * ratio);
            color = `rgb(${r},${g},${b})`;
        }
    }
    span.style.background = "";
    span.style.color = color;
    span.style.fontWeight = "bold";
    span.style.fontSize = "2rem";
}

// Carrega os dispositivos quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
    loadDevices();
    createDevice();
    editDevice();

    // Adiciona evento de filtro automático
    const filterFields = [
        "filteringSerialNumber",
        "filteringLogicalNumber",
        "filteringReciveDate",
        "filteringStatus",
        "filteringChangeReason",
        "filteringProtocol",
        "filteringExitDate"
    ];
    filterFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", filterDevices);
        }
    });
});