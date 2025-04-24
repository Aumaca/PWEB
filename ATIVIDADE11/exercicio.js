// Usando object literal
const Funcionario1 = {
    matricula: "001",
    nome: "Caio Castro",
    funcao: "Desenvolvedor"
};

console.log("Forma 1:", Funcionario1);

// Usando new Object() e atribuição direta
const Funcionario2 = new Object();
Funcionario2.matricula = "002";
Funcionario2.nome = "Ana de Armas";
Funcionario2.funcao = "Actress";

console.log("Forma 2:", Funcionario2);

// Usando função construtora
function Funcionario(matricula, nome, funcao) {
    this.matricula = matricula;
    this.nome = nome;
    this.funcao = funcao;
}

const Funcionario3 = new Funcionario("003", "Carlos Cardoso", "IT Support & Infrastructure");

console.log("Forma 3:", Funcionario3);