import { congregacao } from './Congregacao.js'; //importando o objeto principal do sistema, olhe a página 'Congregacao.js'


const superSelect = document.getElementById('superSelect');
const ajudanteSelect = document.getElementById('ajudanteSelect');

document.addEventListener('DOMContentLoaded', () => {
    console.log('gr carregado');

    // ## Secção de Criacao e Edicao de Grupos ##
    // Aqui, o código lida com a criação e edição de grupos, permitindo adicionar novos grupos e preencher os campos de super e ajudante.

    let ultimoGrupoId = congregacao.grupos[congregacao.grupos.length - 1]?.grupoId.slice(5, congregacao.grupos[congregacao.grupos.length - 1].grupoId.length - 1) || 0;
    document.getElementById('nomeGrupo').placeholder = `Grupo ${++ultimoGrupoId}`; // Define o placeholder do campo de nome do grupo com o próximo número de grupo disponível

    //Não esquecer de usar a biblioteca select2 para melhorar a aparência e dinamismo dos selects
    // com seletores que fazem pesquisa por opções
    function preencherSelect(select) {
      congregacao.membros?.forEach((m, index) => {
        const option = document.createElement('option');
        option.value = m.publicadorId;
        option.textContent = m.publicadorNome;
        select.appendChild(option);
      });
    }

    preencherSelect(superSelect);
    preencherSelect(ajudanteSelect);




//Adiciona todos os grupos ao select
const grupoSelect = document.getElementById('grupoSelect'); //Select onde estarão os grupos
  congregacao.grupos?.forEach((grupo, index) => { // itera sobre todos os grupos cadastrados
    const option = document.createElement('option');
    option.value = index; // cada opção tem a posição do grupo no array grupos do objeto congregacao
    option.textContent = grupo.grupoNome;
    grupoSelect.appendChild(option); // adiciona o grupo ao select
  });




  // ## Secção de Interação com Grupos ##
  // Aqui, o código lida com a interação entre os membros e os grupos, permitindo adicionar ou remover membros de grupos específicos.

  let grupoIndex;//Observei algumas redundãncias na utilização desta variável,resolvo depois
  let membroSelecionado;
  const tbody2 = document.getElementById('tbody2'); //Corpo da tabela onde serão apresentados os membros da congregação e grupos
  const verMembrosBtn = document.getElementById('verMembros'); // botão para ver membros em um grupo ou na congregação inteira
  const removerGrupoBtn = document.getElementById('removerGrupo') // botão para eliminar um grupo
  const adicionarMembrosBtn = document.getElementById('adicionarMembros'); // botão para ver membros que não têm grupo

  
  //adiciona elementos ao corpo da tabela com três parâmetros
  //grupo: é o grupo a qual o elemento pertence. O valor é 'Sem Grupo' no caso de não estar em um grupo
  //operacao: a função que será aplicada ao evento do botão. Neste caso temos uma para adicionar membros e outra para remover
  //acao: é apenas o texto que aparecerá no botão, 'adicionar' ou 'remover'
  function inserirLinhasNaTabela(grupo, operacao, acao){

    tbody2.innerHTML = '';// Limpa a tabela sempre que a função é chamada, ou seja, quando um botão é clicado

    congregacao.membros?.forEach((membro) => { //itera sobre cada membro no array membros do objeto congregacao
      if (Array.isArray(grupo) ? grupo.includes(membro.publicadorGrupo) : membro.publicadorGrupo === grupo) { 

        let iniciais = membro.publicadorNome.split(' ');
  
        let tr = document.createElement('tr');
        tr.classList.add('border-b', 'border-gray-400', 'hover:bg-gray-100');
  
        let td = document.createElement('td');
        td.classList.add('py-2', 'px-6', 'text-left', 'whitespace-nowrap', 'flex', 'items-center', 'gap-2');
  
        let span = document.createElement('span');
        span.textContent = iniciais[0].charAt(0) + iniciais[1].charAt(0);
        span.classList.add('bg-blue-600', 'rounded-full', 'w-11','h-11', 'text-white', 'font-medium','flex','justify-center','items-center');
  
        let span2 = document.createElement('span');
        span2.classList.add('flex', 'flex-col', 'items-start', 'gap-1');
  
        let p1 = document.createElement('p');
        p1.classList.add('text-[14px]', 'font-[500]');
        p1.textContent = membro.publicadorNome;
  
        let p2 = document.createElement('p');
        p2.textContent = membro.publicadorEmail;
  
        let td2 = document.createElement('td');
        td2.classList.add('py-2', 'px-6', 'text-left');
        td2.textContent = `${membro.publicadorServico || ''} ${membro.publicadorGrupo}`;
  
        let td3 = document.createElement('td');
        td3.classList.add('py-2', 'px-6', 'text-left');
        td3.textContent = membro.publicadorAtividade;
  
        let td4 = document.createElement('td');
        td4.classList.add('py-2', 'px-6', 'text-center');
  
        let btn1 = document.createElement('button');
        btn1.textContent = acao;
        btn1.setAttribute('value', membro.publicadorId);
        btn1.classList.add('bg-blue-800', 'text-white', 'px-6', 'py-2', 'rounded-lg', 'hover:bg-blue-900');

        btn1.addEventListener('click', function(event){operacao(event.target, tr)});
  
        td4.appendChild(btn1);
        td.appendChild(span);
        td.appendChild(span2);
        span2.appendChild(p1);
        span2.appendChild(p2);
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody2.appendChild(tr);
      }
    });
  }

  // e: o parâmetro representa o objeto do evento, neste caso, o botão

  // adiciona um membro a um grupo.
  function addMembro(e, tr){
    grupoIndex = grupoSelect.value
    if (grupoIndex === "") {
      alert("Selecione um grupo antes de adicionar o membro!");
      return;
    }
    else
    {
      grupoIndex = parseInt(grupoIndex);
      membroSelecionado = congregacao.membros.find(m => m.publicadorId === e.value); //procura o membro selecionado no array membros e retorna

      if (membroSelecionado) { // por segurança, melhor verificar a existencia do membro
        membroSelecionado.publicadorGrupo = congregacao.grupos[grupoIndex].grupoId;
        congregacao.grupos[grupoIndex].grupoMembros.push(membroSelecionado);

        //Substitui o membro selecionado pelo seu correspondente no array de membros
        congregacao.membros.forEach( m => {m.publicadorId == membroSelecionado.publicadorId ? m = membroSelecionado : m = m});

        localStorage.setItem('Grupo',JSON.stringify(congregacao.grupos));
        localStorage.setItem('Membro',JSON.stringify(congregacao.membros));

        //membroSelecionado = undefined;// para poder ser reutilizado sem maiores problemas

        tr.remove();
      }
    }
  }

  function removeMembro(e, tr){
    grupoIndex = parseInt(grupoSelect.value);
    let membroSelecionadoIndice = congregacao.grupos[grupoIndex].grupoMembros.findIndex(m => m.publicadorId === e.value);

    if (membroSelecionadoIndice !== -1) {
      membroSelecionado = congregacao.grupos[grupoIndex].grupoMembros.splice(membroSelecionadoIndice, 1);// retorna um array com o membro removido
      //Substitui o membro selecionado pelo seu correspondente no array de membros
      congregacao.membros.forEach( m => {m.publicadorId == membroSelecionado[0].publicadorId ? m.publicadorGrupo = 'Sem Grupo' : m});

      localStorage.setItem('Grupo',JSON.stringify(congregacao.grupos));
      localStorage.setItem('Membro',JSON.stringify(congregacao.membros));

      membroSelecionado = undefined;// para poder ser reutilizado sem maiores problemas

      tr.remove();
    }
  }
  
  verMembrosBtn.addEventListener('click',() => {
    grupoIndex = grupoSelect.value;
    if (grupoIndex === "") {
      const todosGrupos = congregacao.grupos.map(g => g.grupoId);
      todosGrupos.push('Sem Grupo'); // adiciona também os sem grupo
      inserirLinhasNaTabela(todosGrupos, addMembro, 'Adicionar');
    }else{
      grupoIndex = parseInt(grupoIndex);
      inserirLinhasNaTabela(congregacao.grupos[grupoIndex].grupoId, removeMembro, 'Remover');
    }
  });

  adicionarMembrosBtn.addEventListener('click', () => {
    grupoIndex = grupoSelect.value;
    if (grupoIndex !== "") {
      inserirLinhasNaTabela('Sem Grupo', addMembro, 'Adicionar');
    }
  })

  removerGrupoBtn.addEventListener('click', () => {
    grupoIndex = grupoSelect.value
    if (grupoIndex === "") {
      alert("Selecione um grupo para eliminá-lo!");
      return;
    }
    else
    {
      //quero adicionar a possibilidade de exportar os membros antes de eliminar o grupo
      grupoIndex = parseInt(grupoSelect.value);
      congregacao.grupos[grupoIndex].grupoMembros.forEach(m => {m.publicadorGrupo = 'Sem Grupo'})
      congregacao.grupos.splice(grupoIndex, 1);// remove o grupo selecionado do array de grupos
      grupoSelect.options[grupoIndex].remove(); // remove a opção do select

      localStorage.setItem('Grupo',JSON.stringify(congregacao.grupos));
      localStorage.setItem('Membro',JSON.stringify(congregacao.membros));
    }
  })
  
});

export { superSelect, ajudanteSelect };