import getSystemStats from "./index.js";

function getNextHour() {
  const now = new Date();
  now.setMinutes(0, 0, 0); // Zera minutos, segundos e milissegundos
  now.setHours(now.getHours() + 1); // Avança para a próxima hora
  return now;
}

function scheduleNextHour(callback) {
  const nextHour = getNextHour();
  const delay = nextHour - new Date(); // Calcula o tempo restante até a próxima hora redonda
  console.log(`Próxima execução em ${((delay / 1000) / 60).toFixed(2)} minutos`);

  setTimeout(() => {
    callback(); // Executa o callback
    scheduleNextHour(callback); // Agenda a próxima execução
  }, delay);
}

scheduleNextHour(() => {
  console.log("Iniciando execução...");
  getSystemStats()
    .then(() => {
      console.log("Execução concluída com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao executar o script:", error);
    });
});
