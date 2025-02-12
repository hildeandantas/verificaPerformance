import getSystemStats from "./index.js";

function executarNaHoraRedonda(funcao) {
  function calcularTempoAteProximaHora() {
    const agora = new Date();
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    const milissegundos = agora.getMilliseconds();
    const tempoAteProximaHora =
      (60 - minutos) * 60 * 1000 - segundos * 1000 - milissegundos;
    return tempoAteProximaHora;
  }

  setTimeout(() => {
    funcao();
    setInterval(funcao, 60 * 60 * 1000);
  }, calcularTempoAteProximaHora());
}

executarNaHoraRedonda(() => {
  console.log("Iniciando execução!");
  getSystemStats()
    .then(() => {
      console.log("Execução concluida com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao executar o script:", error);
    });
});
