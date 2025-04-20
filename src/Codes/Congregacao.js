console.log('cong carregado');

class Publicador {
    constructor() {  
        this.publicadorNome = this.concatenarNome('.nome');
        this.publicadorDataNascimento = this.data('dataNascimento');
        this.publicadorSexo = document.querySelector('input[name="sexo"]:checked')?.value;
        this.publicadorBairro = document.getElementById('bairro').value;
        this.publicadorEmail = document.getElementById('email').value;
        this.publicadorTelefone = document.getElementById('telefone').value;
        this.publicadorIsBatizado = document.querySelector('input[name="batismo"]:checked')?.value;
        this.publicadorDataDoBatismo = this.data('dataBatismo');
        this.publicadorIsChefeDeFamilia = document.querySelector('input[value="chefe"]:checked');
        this.publicadorMembroDeFamilia = []; 
        this.publicadorServico = document.querySelector(`input[name="servico"]:checked`)?.value;
        this.publicadorAtividade = document.querySelector('input[name="atividade"]:checked')?.value;
        this.publicadorObservacao = document.querySelector('#adInfo')?.value || '';
        this.publicadorDeficiencia = document.querySelector(`input[name="deficiencia"]:checked`)?.value;
        this.publicadorGrupoInfo = 'Sem Grupo';
        this.publicadorRelatorio = [];
        this.publicadorId;
    }
  
    data(classe){
      const datas = document.querySelectorAll(`select[name= dataNascimento]`);
      let i = 0;
      let data = '';
      datas.forEach( d => { i >= datas.length-1 ? data += `${d.value}` : data += `${d.value}/`;i++ })
    }
  
    concatenarNome(classe) {
        const elementos = document.querySelectorAll(classe);
        return elementos.length > 1 
            ? `${elementos[0].value} ${elementos[1].value}` 
            : elementos[0]?.value || ''; 
    }
  }

  class Grupo{
    constructor(){
        this.grupoNome = document.getElementById('nomeGrupo').value;
        this.grupoMembros = [];
        this.grupoSuperintendente = document.getElementById('superintendente').value;
        this.grupoRelatorio = [];
        this.grupoDia = document.getElementById('dia').value;
        this.grupoHora = document.getElementById('hora').value;
        this.grupoLocal = document.getElementById('local').value;
        this.grupoAjudante = document.getElementById('ajudante').value;
        this.grupoId;
    }
}

document.getElementById('cadastrar')?.addEventListener('click', () => {
    //Nao te esquecas de fazer uma comparacao entre os elementos que podem identificar um registro para evitar registros repetidos
    let Membros = JSON.parse(localStorage.getItem('Membro')) || [];
    let novoMembro = new Publicador();
    let idAtualP = localStorage.getItem('idPublicador') ? parseInt(localStorage.getItem('idPublicador')) : 0;
    let novoIdP = ++idAtualP;
    novoMembro.publicadorId = `User${novoIdP}M`;
    Membros.push(novoMembro);
    localStorage.setItem('Membro', JSON.stringify(Membros));
    localStorage.setItem('idPublicador', novoIdP);
    alert(`Usuário cadastrado, ID: ${novoMembro.publicadorId}`);
});


document.getElementById('criarGrupo')?.addEventListener('click',() => {
    let Grupos = JSON.parse(localStorage.getItem('Grupo')) || [];
    let novoGrupo = new Grupo();
    let idAtualG = localStorage.getItem('idGrupo') ? parseInt(localStorage.getItem('idGrupo')) : 0;
    let novoIdG = ++idAtualG;
    novoGrupo.grupoId = `Grupo${novoIdG}G`;
    Grupos.push(novoGrupo);
    localStorage.setItem('Grupo', JSON.stringify(Grupos));
    localStorage.setItem('idGrupo', novoIdG);
    alert(`Grupo criado, ID: ${novoGrupo.grupoId}`);
})

export const congregacao = {
    grupos : JSON.parse(localStorage.getItem('Grupo')) || [],
    membros : JSON.parse(localStorage.getItem('Membro')) || []
};