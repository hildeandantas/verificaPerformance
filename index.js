import si from "systeminformation";
import reports from "./models/report.js";
import "dotenv/config";

export default async function getSystemStats() {
  // Obter informações de memória
  const mem = await si.mem();
  const usedMemory = (mem.used / 1024 / 1024).toFixed(2); // em MB
  const usedMemoryPercent = ((mem.used / mem.total) * 100).toFixed(2);

  // Obter informações de CPU
  const cpu = await si.currentLoad();
  const cpuUsagePercent = cpu.currentLoad.toFixed(2);

  const dataHoraBrasil = new Date().toLocaleString("sv-SE", {
    timeZone: "America/Sao_Paulo",
  });

  reports
    .create({
      serverName: process.env.SERVER_NAME,
      ramEmUso: usedMemory,
      porcentagemRam: usedMemoryPercent,
      porcentagemCpu: cpuUsagePercent,
      dataHoraParcial: dataHoraBrasil,
    })
    .then(() => {
      console.log("Informações do sistema enviadas com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao enviar informações do sistema:", error);
    });
}