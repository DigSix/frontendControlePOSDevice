import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Estas duas linhas criam __dirname em ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const app = express();

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Permite apenas rede local 131.107 e localhost
        if (!origin || origin.startsWith("http://131.107")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
    credentials: false
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/index.html", (req, res) => {
    res.status(403).send("Bloqueado");
});

app.get("/login.html", (req, res) => {
    res.status(403).send("Bloqueado");
});

app.get("/devices", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});