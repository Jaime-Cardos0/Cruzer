class Relatorio{
    constructor(){
        this.participacao = document.querySelector('input[name = "Participacao"]:checked').value;
        this.estudosBiblicos = document.querySelector('#estudosBiblicos').value;
        this.horas = document.querySelector('#horas').value;
        this.observacoes = document.querySelector('#obs').value;
        this.data_Relatorio = new Date().toLocaleDateString();
    }
}
 const relatorio = new Relatorio();
// const ob = JSON.parse(localStorage.getItem('Membro')) || []; // Evita erro caso 'Membro' não esteja no localStorage

// class GeneralData {
//     constructor() {
//         this.generalPublisher = ob.length;
//         this.generalActiveEstate = this.getSome('Ativo');
//         this.generalIrregularEstate = this.generalPublisher - this.generalActiveEstate;
//         this.generalBatizado = this.getSome('Batizado');
//         this.generalNaobatizado = this.generalPublisher - this.generalBatizado;
//         this.generalMascSex = this.getSome('Masculino');
//         this.generalFemSex = this.generalPublisher - this.generalMascSex;
//     }

//     getSome(valor) {
//         let i = 0;
//         ob.forEach((membro) => {
//             for (let propriedade in membro) {
//                 console.log(`Propriedade: ${propriedade}, Valor: ${membro[propriedade]}`);
//                 if (membro[propriedade] == valor) {
//                     i++;
//                 }
//             }
//         });
//         return i;
//     }
// }

// const data = new GeneralData();
// console.log(data);
