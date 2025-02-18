import getSystemStats from "./index.js";
import { sequelize } from "./config/database.js";

// Faz todo o cálculo via GETDATE() do SQL Server e retorna o tempo restante até a próxima hora cheia em milissegundos
async function minutesToExecute() {
  try {
    const result = await sequelize.query(`
      SELECT DATEDIFF(MILLISECOND, GETDATE(), 
        DATEADD(HOUR, 1, DATEADD(MINUTE, -DATEPART(MINUTE, GETDATE()), 
        DATEADD(SECOND, -DATEPART(SECOND, GETDATE()), GETDATE())))) AS minutesToExecute;
    `);

    const delay = result[0][0]?.minutesToExecute ?? 5000; // Se der erro, espera 5s
    console.log(
      `⏳ Próxima execução em ${delay / 1000} segundos (${delay} ms)`
    );
    return delay;
  } catch (error) {
    console.error("❌ Erro ao calcular tempo de execução:", error);
    return 5000; // Espera 5s antes de tentar de novo
  }
}

// Executa a função e reagenda a próxima execução
async function mainExecute() {
  console.log(`🚀 Executando em: ${new Date().toLocaleString()}`);

  try {
    await getSystemStats();
    console.log("✅ Informações do sistema enviadas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao enviar informações do sistema:", error);
  }

  const delay = await minutesToExecute();
  setTimeout(mainExecute, delay);
}

mainExecute();
