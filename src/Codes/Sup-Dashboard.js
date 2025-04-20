let i;
const Membros = JSON.parse(localStorage.getItem('Membro')) || [];

// Funcao para recuperar a quantidade de propriedades com um determinado valor
function getSome(valor){
    i = 0;
    Membros.forEach(membro => {
        for(let propriedade in membro){
            if(membro[propriedade] == valor)
                i++;
        }
    });
    return i;
}
//Funcao que retorna a percentagem de comentarios por membros nos cadastros
function getComments(){
    i = 0;
    Membros.forEach(membro => {
        if(membro.Informação != '')
            i++;
    });
    return ((i*100)/Membros.length).toFixed(1);
}
//Array de objetos que representam os dados dos cadastrados
let generalDataCount = [
    {titulo:"Total Publicadores", valor: Membros.length},
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
});