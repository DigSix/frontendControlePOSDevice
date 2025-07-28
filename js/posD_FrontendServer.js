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
        if (!origin || origin.startsWith("http://131.107") || origin.startsWith("http://localhost")) {
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

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});