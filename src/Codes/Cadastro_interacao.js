console.log("carregado")
// Referências aos elementos
const chefeRadio = document.getElementById("chefe");
const membroRadio = document.getElementById("membro");
const editarMembrosBtn = document.getElementById("editarMembrosBtn");
const abrirFormularioBtn = document.getElementById("abrirFormularioBtn");
const membrosForm = document.getElementById("membrosForm");
const listaMembros = document.getElementById("listaMembros");
const adicionarMembroBtn = document.getElementById("adicionarMembroBtn");
const pesquisarMembroInput = document.getElementById("pesquisarMembro");

// Exibir ou esconder o botão "Editar Membros"
[chefeRadio, membroRadio].forEach((radio) => {
    radio?.addEventListener("change", () => {
        if (chefeRadio.checked) {
            editarMembrosBtn.classList.remove("hidden");
        } else {
            editarMembrosBtn.classList.add("hidden");
            membrosForm.classList.add("hidden");
        }
    });
});

// Abrir o formulário de edição de membros
abrirFormularioBtn?.addEventListener("click", () => {
    membrosForm.classList.remove("hidden");
});

// Adicionar um membro à lista
adicionarMembroBtn?.addEventListener("click", () => {
    const membroNome = pesquisarMembroInput.value.trim();
    if (membroNome) {
        const li = document.createElement("li");
        li.textContent = membroNome;
        listaMembros.appendChild(li);
        pesquisarMembroInput.value = ""; // Limpa o campo de pesquisa
    }
});

const currentYear = new Date().getFullYear();
// Preencher opções de dias (1 a 31)
const daySelect = document.getElementById('day');
for (let i = 1; i <= 31; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  daySelect?.appendChild(option);
}

// Preencher opções de anos (1900 até o ano atual)
const yearSelect = document.getElementById('year');
for (let i = currentYear; i >= 1900; i--) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  yearSelect?.appendChild(option);
}


// Preencher opções de dias (1 a 31) para batismo
const baptismDaySelect = document.getElementById('baptism-day');
for (let i = 1; i <= 31; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  baptismDaySelect?.appendChild(option);
}

// Preencher opções de anos (1900 até o ano atual) para batismo
const baptismYearSelect = document.getElementById('baptism-year');
for (let i = currentYear; i >= 1900; i--) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  baptismYearSelect?.appendChild(option);
}


// Preencher opções de dias (1 a 31) para data de publicador
const publisherDayElement = document.getElementById('publisherDay');
for (let day = 1; day <= 31; day++) {
  const dayOption = document.createElement('option');
  dayOption.value = day;
  dayOption.textContent = day;
  publisherDayElement?.appendChild(dayOption);
}

// Preencher opções de anos (1900 até o ano atual) para data de publicador
const publisherYearElement = document.getElementById('publisherYear');
const currentPublisherYear = new Date().getFullYear();
for (let year = currentPublisherYear; year >= 1900; year--) {
  const yearOption = document.createElement('option');
  yearOption.value = year;
  yearOption.textContent = year;
  publisherYearElement?.appendChild(yearOption);
}
