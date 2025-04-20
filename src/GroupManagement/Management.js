//Seção de apresentação de formulários

//Seção de grupos
let criar_grupo = document.getElementById('criar_grupo')
let add_grupo = document.getElementById('add_grupo')

//Variáveis dos membros
let sair = document.getElementById('sair')
let add_membro = document.getElementById('add_membro')
let novo_membro = document.getElementById('novo_membro')
let fundo_fusco = document.getElementById('fundo_fusco')
let fundo_fusco2 = document.getElementById('fundo_fusco2')

//LocalStorage

let Users = localStorage.getItem('Membro');// **Desnessário
let usuario = JSON.parse(Users);// Correção : JSON.parse(localStorage.getItem('Membro'));

let tbody = document.getElementById('tbody');

const add_Grupo = () =>{// ***Podia ter sido adionada diretamente no bloco da funcão "criar_grupo"
    if (add_grupo.classList.contains('hidden')) {
        add_grupo.classList.add('flex')
        add_grupo.classList.remove('hidden')
        fundo_fusco.classList.remove('hidden')
        fundo_fusco.classList.add('flex')

    } else {
        add_grupo.classList.add('hidden')
        add_grupo.classList.remove('flex')
        fundo_fusco.classList.add('hidden')
        fundo_fusco.classList.remove('flex')
    }

}

function MyUsers(valor) {
    for (let i = 0; i < usuario.length; i++) { 
        let tr = document.createElement('tr'); 
        tr.classList.add('border-b', 'border-gray-400', 'hover:bg-gray-100'); 
        let td = document.createElement('td'); 
        td.classList.add('py-2', 'px-6', 'text-left', 'whitespace-nowrap', 'flex', 'items-center', 'gap-2'); 
        let span = document.createElement('span'); 
        span.textContent = 'DC'; 
        span.classList.add('bg-blue-600', 'rounded-full', 'p-3', 'text-white', 'font-bold'); 
        let span2 = document.createElement('span'); 
        span2.classList.add('flex', 'flex-col', 'items-start', 'gap-1'); 
        let p1 = document.createElement('p'); p1.classList.add('text-[14px]', 'font-[500]'); 
        p1.textContent = usuario[i].Nome; 
        let p2 = document.createElement('p'); 
        p2.textContent = usuario[i].Email; 
        let td2 = document.createElement('td'); 
        td2.classList.add('py-2', 'px-6', 'text-left'); 
        td2.textContent = usuario[i].Grupo; 
        let td3 = document.createElement('td'); 
        td3.classList.add('py-2', 'px-6', 'text-left'); 
        td3.textContent = usuario[i].Serviço_no_grupo; 
        let td4 = document.createElement('td'); 
        td4.classList.add('py-2', 'px-6', 'text-center'); 
        let btn1 = document.createElement('button'); 
        btn1.textContent = 'Adicionar'; 
        btn1.setAttribute('id', `add-btn-${i}`); //***Por que atribuir um id a cada botão "adicionar"?
        // Atribuir um ID único a cada botão 
        btn1.classList.add('bg-blue-800', 'text-white', 'px-6', 'py-2', 'rounded-lg', 'hover:bg-blue-900'); 
        td4.appendChild(btn1); 
        td.appendChild(span); 
        td.appendChild(span2); 
        span2.appendChild(p1); 
        span2.appendChild(p2); 
        tr.appendChild(td); 
        tr.appendChild(td2); 
        tr.appendChild(td3); 
        tr.appendChild(td4); 
        valor.appendChild(tr); 
    } 
}



criar_grupo.addEventListener('click', (e) =>{
    e.preventDefault()
    if(add_membro.classList.contains('hidden')){
        add_Grupo()
    }else{
        alert('Uma seção já está aberta!')
    }
})

const mostra_membros = () => {
    if (usuario) {
        tbody.innerHTML = null;
        MyUsers(tbody);
    }
};





const Remover_membroform = () =>{
    if(add_membro.classList.contains('flex')){
        add_membro.classList.remove('flex')
        add_membro.classList.add('hidden')
        fundo_fusco2.classList.add('hidden')
        fundo_fusco2.classList.remove('flex')
    }
}


sair.addEventListener('click', (e) =>{
    e.preventDefault()
    mostra_membros()
    Remover_membroform()
})

//Adicionando grupos numa lista de opções

let escolher_super = document.getElementById('Superintendente2')
let escolher_ajuda = document.getElementById('Ajudante2')
let lista_super = []
let lista_ajuda = []

let criar_super = document.getElementById('criar_super')
let criar_ajuda = document.getElementById('criar_ajuda')
let criar_local = document.getElementById('criar_local')
let criar_nome = document.getElementById('nome_grupo')
let criar_dia = document.getElementById('criar_dia')
let criar_hora = document.getElementById('criar_hora')

// Array para armazenar os membros adicionados
let membrosAdicionados = [];


const btn_grupo = document.getElementById('btn_grupo')



const Mostra_super_E_Ajuda = () =>{
    
    for (let i = 0; i < usuario.length; i++) {
        if(usuario[i].Serviço_no_grupo === 'Superintendente'){
            lista_super[i] = usuario.Nome
            
            escolher_super.innerHTML += '<option>'+usuario[i].Nome+' '+usuario[i].Sobrenome+'</option>'
        }

        if (usuario[i].Serviço_no_grupo != 'Superintendente') {
            lista_ajuda[i] = usuario.Nome
            escolher_ajuda.innerHTML += '<option>'+usuario[i].Nome+' '+usuario[i].Sobrenome+'</option>'
        }
    }

    escolher_super.addEventListener('change', (e) =>{
        e.preventDefault();
       criar_super.value = escolher_super.value
       if (escolher_super.value === escolher_ajuda.value) {
        alert('Não podes ter duas pessoas a exercer a mesma tarefa!')
        criar_super.value = ' '
        escolher_super.value = ' '
        escolher_ajuda.value = ' '
        criar_ajuda.value = ' '
    }
    })
    escolher_ajuda.addEventListener('change', (e) =>{
        e.preventDefault();
       criar_ajuda.value = escolher_ajuda.value
       if (escolher_super.value === escolher_ajuda.value) {
        alert('Não podes ter duas pessoas a exercer a mesma tarefa!')
        criar_super.value = ' '
        escolher_super.value = ' '
        escolher_ajuda.value = ' '
        criar_ajuda.value = ' '
    }
    })

    
// Função para adicionar membros ao array
novo_membro.addEventListener('click', (e) =>{
    e.preventDefault()  
    let tbody = document.getElementById('tbody');

    //Verificando outros campos.
    if(escolher_super.value === "" && criar_super.value === ""){
        alert('Preencha o campo de Superintendente!');
        return;
    }

    if(escolher_ajuda.value === "" && criar_ajuda.value === ""){
        alert('Preencha o campo de Ajudadnte!');
        return;
    }

    if (criar_local.value === "" || criar_dia.value === "" || criar_nome.value === "") {
        alert('Por favor preencha todos os campos!');
        return;
    }

    if(add_membro.classList.contains('hidden')) {
        add_membro.classList.remove('hidden');
        add_membro.classList.add('flex');
        fundo_fusco2.classList.remove('hidden');
        fundo_fusco2.classList.add('flex');
    } else {
        add_membro.classList.remove('flex');
        add_membro.classList.add('hidden');
        fundo_fusco2.classList.add('hidden');
        fundo_fusco2.classList.remove('flex');
    }

    // Delegação de eventos para os botões
    tbody.addEventListener('click', function(e) {
        if (e.target && e.target.matches('button[id^="add-btn-"]')) {
            let btn_id = e.target.id.split('-')[2]; // Obter o índice a partir do ID do botão
            let membro = usuario[btn_id]; // Obter o membro correspondente
            membrosAdicionados.push(membro); // Adicionar o membro ao array
            alert(`Membro adicionado: ${membro.Nome}`); // Exibir mensagem de sucesso
            console.log(membrosAdicionados)
            localStorage.setItem('Grupo', grupos)
        }
    });

    
})
}

    //2

// Função para criar um novo grupo e adicionar a lista de membros ao objeto do grupo
const add_New_grupo = () => {
    if(escolher_super.value === "" && criar_super.value === ""){
        alert('Preencha o campo de Superintendente!');
        return;
    }

    if(escolher_ajuda.value === "" && criar_ajuda.value === ""){
        alert('Preencha o campo de Ajudadnte!');
        return;
    }

    if (criar_local.value === "" || criar_dia.value === "" || criar_nome.value === "") {
        alert('Por favor preencha todos os campos!');
        return;
    }

    

    const novo_grupo = {
        Superintendente_do_grupo: escolher_super.value || criar_super.value,
        Ajudante: escolher_ajuda.value || criar_ajuda.value,
        Local_do_grupo: criar_local.value,
        Nome_do_grupo: criar_nome.value,
        Hora_de_entrega: criar_hora.value,
        Data_de_entrega: criar_dia.value,
        membros: membrosAdicionados
    };

    for (let i = 0; i < usuario.length; i++) {
        if(usuario[i].Nome+' '+usuario[i].Sobrenome === novo_grupo.Superintendente_do_grupo){
            usuario[i].Serviço_no_grupo = `Superintendente do grupo ${novo_grupo.Nome_do_grupo}`; 
            novo_grupo.membros.push(usuario[i])
        }else{
            if (usuario[i].Nome+' '+usuario[i].Sobrenome ===novo_grupo.Ajudante) {
                usuario[i].Serviço_no_grupo = `Ajudante do grupo ${novo_grupo.Nome_do_grupo}`; 
                novo_grupo.membros.push(usuario[i])
            }
        }
     }

        // Cadastrando um novo grupo
    let chave = localStorage.getItem("Grupos");
    let verificar = false;
    let listaGrupos;
      

    if (chave) {
        listaGrupos = JSON.parse(chave);
    } else {
        listaGrupos = [];
    }

    for (let user of listaGrupos) {
        if (user.Nome_do_grupo == novo_grupo.Nome_do_grupo && user.Local_do_grupo === novo_grupo.Local_do_grupo) {
            verificar = true;
            break;
        }
    }

    if (!verificar) {
        listaGrupos.push(novo_grupo);
        localStorage.setItem("Grupos", JSON.stringify(listaGrupos));
        alert("O novo grupo foi cadastrado com sucesso!");
        criar_ajuda.value = "";
        criar_dia.value = "";
        criar_hora.value = "";
        criar_local.value = "";
        criar_nome.value = "";
        criar_super.value = "";
        escolher_super.value = "";
        escolher_ajuda.value = "";
      
    } else {
        alert("Erro na criação de grupo, verifique os erros!");
    }

    if(add_grupo.classList.contains('flex')) {
        add_grupo.classList.remove('flex');
        add_grupo.classList.add('hidden');
        fundo_fusco.classList.remove('flex');
        fundo_fusco.classList.add('hidden');
    }
}



btn_grupo.addEventListener('click', (e) =>{
    e.preventDefault()
    add_New_grupo()
    window.location.href = './GroupManagement.html'
})

//Apresentação dos dados da página nos quadrados correspondentes

let grupo = localStorage.getItem('Grupos')
let grupos = JSON.parse(grupo)


function Apresentar_Dados(){
    let numero_publicadores = document.getElementById('numero_publicadores')
    let numero_grupos = document.getElementById('numero_grupos')
    let quantidade_publicador = 0
    let quantidade_grupos = 0

    for (let i = 0; i < usuario.length; i++) {
        if (usuario[i].Serviço_no_grupo === 'Publicador') {
           quantidade_publicador++
        }
    }
    for (let i = 0; i < grupos.length; i++) {
        quantidade_grupos++ 
    }

    numero_publicadores.innerHTML = quantidade_publicador
    numero_grupos.innerHTML = quantidade_grupos
}



//Apresentar informações do grupo selecionado

function Info_grupo() {
    let lista_de_grupos = document.getElementById('grupos')
    lista_de_grupos.innerHTML = grupos.map(grupo => `<option>${grupo.Nome_do_grupo}</option>`).join('');

    lista_de_grupos.addEventListener('change', (e) => {
         e.preventDefault();
         const grupoSelecionado = grupos.find(grupo => grupo.Nome_do_grupo === lista_de_grupos.value);
         const membrosSelecionado = grupoSelecionado.membros;
         membros_grupo.innerHTML = membrosSelecionado.length;
         publicadores_grupo.innerHTML = membrosSelecionado.filter(membro => membro.Serviço_no_grupo === 'Publicador').length;

         name_group.textContent = grupoSelecionado.Nome_do_grupo;
         
         let tbody3 = document.getElementById('tbody2');
         tbody3.innerHTML = membrosSelecionado.map(membro => `
             <tr class="border-b border-gray-400 hover:bg-gray-100">
                 <td class="py-2 px-6 text-left whitespace-nowrap flex items-center gap-2">
                     <span class="bg-blue-600 rounded-full p-3 text-white font-bold">DC</span>
                     <span class="flex flex-col items-start gap-1">
                         <p class="text-[14px] font-[500]">${membro.Nome}</p>
                         <p>${membro.Email}</p>
                     </span>
                 </td>
                 <td class="py-2 px-6 text-left">${membro.Grupo}</td>
                 <td class="py-2 px-6 text-left">${membro.Serviço_no_grupo}</td>
                 <td class="py-2 px-6 text-center">
                     <button id="remove-btn-${membro.id}" class="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900">Remover</button>
                 </td>
             </tr>
         `).join('');
    });
} 




const btn_pesquisa = document.getElementById('btn_pesquisa')

const Pesquisar_membro = () =>{
    let users = document.getElementById('users').value
    let tbody2 = document.getElementById('tbody')

  

    for (let i = 0; i < usuario.length; i++) {
        if(users.toLowerCase() == usuario[i].Nome.toLowerCase()){
            tbody2.innerHTML = null
            MyUsers(tbody2)
        }
    }
}

btn_pesquisa.addEventListener('click', (e) =>{
    Pesquisar_membro()
})



mostra_membros()
Mostra_super_E_Ajuda()
Apresentar_Dados()
Info_grupo()







