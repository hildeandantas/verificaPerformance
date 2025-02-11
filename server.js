import getSystemStats from "./index.js";

function getNextHour() {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  now.setHours(now.getHours() + 1);
  return now;
}

function scheduleNextHour(callback) {
  const nextHour = getNextHour();
  const delay = nextHour - new Date();
  console.log(`Proxima execução em ${(delay / 1000 / 60).toFixed(2)} minutos`);
  setTimeout(() => {
    callback();
    scheduleNextHour(callback);
  }, delay);
}

scheduleNextHour(() => {
  console.log("Iniciando execução...");
  getSystemStats()
    .then(() => {
      console.log("Execução concluida com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao executar o script:", error);
    });
});
