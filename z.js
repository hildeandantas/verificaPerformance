const date = new Date();
const teste = date.toLocaleString("pt-BR").replaceAll("/", "-").replaceAll(",", ""); 

const [dia, mes, ano, hora] = teste.split(/[- ]/);
const dataInvertida = `${ano}-${mes}-${dia} ${hora}`;

console.log(dataInvertida); // Saída: 2025-02-11 17:51:23
