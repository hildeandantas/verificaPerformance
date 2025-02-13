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

  // Obter informações de data e hora
  const date = new Date();
  const dataString = date
    .toLocaleString("pt-BR")
    .replaceAll("/", "-")
    .replaceAll(",", "");
  const [dia, mes, ano, hora] = dataString.split(/[- ]/);
  const dataHoraParcial = `${ano}-${mes}-${dia} ${hora} -03:00`;
  console.log(dataHoraParcial);

  reports
    .create({
      serverName: process.env.SERVER_NAME,
      ramEmUso: usedMemory,
      porcentagemRam: usedMemoryPercent,
      porcentagemCpu: cpuUsagePercent,
      dataHoraParcial: dataHoraParcial,
    })
    .then(() => {
      console.log("Informações do sistema enviadas com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao enviar informações do sistema:", error);
    });
}
