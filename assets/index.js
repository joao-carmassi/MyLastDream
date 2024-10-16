// Dooms -----
const containerGaleria = document.querySelector(".containerGaleria");

// Codigo -----
document.addEventListener("DOMContentLoaded", async () => {
  const data = await capituraFotos();
  adicionaFotosNaGaleria(data);
});

async function adicionaFotosNaGaleria(data) {
  // Gera Categorias
  const listaDeRegiao = Object.keys(data);
  listaDeRegiao.forEach((regiao) => {
    const idRegiao = regiao.replace(/ /g, "-");

    containerGaleria.innerHTML += `
    <div id='${idRegiao}'>
        <div class='containerInfo infoRegiao fundo-${idRegiao}'>
          <div>
            <h2>${regiao}</h2>
            <p id='p-${idRegiao}'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque, eaque? Asperiores voluptatibus sunt at dicta,
              repellendus neque repellat officiis beatae tempore, cum optio
              enim rem, dolor maxime? Rem, facilis a.
            </p>
          </div>
        </div>
        <span id='container__${idRegiao}'>
        </span>
    </div>
    `;

    // Coloca Texto
    const dataLugar = data[regiao];
    const pRegiao = document.getElementById(`p-${idRegiao}`);
    pRegiao.textContent = `${dataLugar.texto}`;

    // Coloca img fundo
    const containerRegiao = document.querySelector(`.fundo-${idRegiao}`);
    containerRegiao.style.backgroundImage = `url(assets/imgs/${idRegiao}/${dataLugar.banner})`;

    // Coloca informacoes no lado certo
    if (dataLugar.lado === "right") {
      containerRegiao.setAttribute("lado", "right");
    }

    // Gera imagens
    const imgsLugar = dataLugar.imgs;
    imgsLugar.forEach((fotos) => {
      const containerLugar = document.getElementById(`container__${idRegiao}`);
      containerLugar.innerHTML += `
          <img class="aparesceAnimacaoFotos" loading="lazy" src='./assets/imgs/${idRegiao}/${fotos}' />
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
