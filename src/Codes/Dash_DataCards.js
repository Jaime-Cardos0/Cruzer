import { congregacao } from './Congregacao.js';
let i;

// Funcao para recuperar a quantidade de propriedades com um determinado valor
export function getSome(valor){
    i = 0;
    congregacao.membros.forEach(m => {
        for(let propriedade in m){
            if(m[propriedade] == valor)
                i++;
        }
    });
    return i;
}
//Funcao que retorna a percentagem de comentarios por membros nos cadastros
export function getComments(){
    i = 0;
    congregacao.membros.forEach(membro => {
        if(membro.Informação != '')
            i++;
    });
    return ((i*100)/congregacao.membros.length).toFixed(1);
}
//Array de objetos que representam os dados dos cadastrados
let generalDataCount = [
    {titulo:"Total Publicadores", valor: congregacao.membros.length},
    {titulo:"Publicadores Ativos", valor: getSome('Ativo')},
    {titulo:"Publicadores Irregulares", valor: getSome('Irregular')},
    {titulo:"Publicadores Batizados", valor: getSome('Batizado')},
    {titulo:"Publicadores Não Batizados", valor: getSome('Não é batizado')},
    {titulo:"Publicadores Masculinos", valor: getSome('Masculino')},
    {titulo:"Publicadoras Femininas", valor: getSome('Feminino')},
    {titulo:"Comentários", valor: `${getComments()} %`},
]

//*DataCards: Apresenta as devidas informacoes na dashboard atraves dos cartoes de informacao
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".dataCard");

    generalDataCount.forEach((dado, index) => {
        if (cards[index]) {
            cards[index].querySelector('.titulo').textContent = dado.titulo;
            cards[index].querySelector('.valor').textContent = dado.valor;
        }
    });
})


//Meters Bars: Efeito de aumento ou diminuicao de alguma coisa, ainda nao sei o que

document.querySelector('#progress-cont').addEventListener('click',()=>{
    let j = 0;
let span = document.querySelector('#progress-cont span');
let timer = setInterval(() => {
    if(j++<=70){
        document.getElementById('progress').value = j;
        // document.getElementById('progre').value = j;
        // document.getElementById('prog').value = j;
        span.textContent = `${j}%`;
    }else{clearInterval(timer)}
},100);
})