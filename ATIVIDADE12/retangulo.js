function Retangulo(base, altura) {
    this.base = base;
    this.altura = altura;

    this.calcularArea = function () {
        return this.base * this.altura;
    };
}

const base = parseFloat(prompt("Digite a base do retângulo:"));
const altura = parseFloat(prompt("Digite a altura do retângulo:"));

const meuRetangulo = new Retangulo(base, altura);

console.log("=== Retângulo ===");
console.log("Base:", base);
console.log("Altura:", altura);
console.log("Área do retângulo:", meuRetangulo.calcularArea());
