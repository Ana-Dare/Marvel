const content = document.querySelector("#exibir");
export function renderizarItem(dataApi) {
  const div = document.createElement("div");
  div.style.marginBottom = "15px";
  const titulo = document.createElement("h3");
  const texto =
    dataApi.currentType === "characters"
      ? dataApi.name || "Nome não encontrado."
      : dataApi.title || "Título não encontrado.";
  titulo.textContent = texto;
  const descricao = document.createElement("p");
  descricao.textContent = dataApi.description || "Sem descrição";
  const img = document.createElement("img");
  img.src = `${dataApi.thumbnail.path}.${dataApi.thumbnail.extension}`;
  img.alt = texto;
  img.width = 150;
  div.appendChild(titulo);
  div.appendChild(descricao);
  div.appendChild(img);
  content.appendChild(div);
}
