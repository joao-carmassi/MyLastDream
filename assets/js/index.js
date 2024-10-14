// Dooms -----
const containerGaleria = document.querySelector(".containerGaleria");

// Codigo -----
document.addEventListener("DOMContentLoaded", async () => {
  await adicionaFotosNaGaleria();
});

async function adicionaFotosNaGaleria() {
  const data = await capituraFotos();

  // TODO: arruma nao pode espaco em nome da regiao
  // Gera Categorias
  const listaDeLugares = Object.keys(data);
  listaDeLugares.forEach((lugar) => {
    const idRegiao = lugar.replace(" ", "-");
    containerGaleria.innerHTML += `
    <div id='${idRegiao}'>
        <h2>${lugar}</h2>
        <span id='container__${idRegiao}'>
        </span>
    </div>
    `;

    // Gera imagens
    const fotosDoLugar = data[lugar];
    fotosDoLugar.forEach((fotos) => {
      const containerLugar = document.getElementById(`container__${lugar}`);
      containerLugar.innerHTML += `
          <img class="aparesceAnimacaoFotos" src='./assets/imgs/${fotos}' />
        `;
    });
  });
}

async function capituraFotos() {
  const res = await fetch("./assets/db.json");
  const data = await res.json();
  console.log(data);
  return data;
}
