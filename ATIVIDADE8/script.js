const totalPessoas = 45
let idades = []
let opinioes = []
let sexos = []

for (let i = 0; i < totalPessoas; i++) {
	let idade = parseInt(prompt(`Pessoa ${i + 1} - Digite a idade:`))
	let sexo = prompt(`Pessoa ${i + 1} - Digite o sexo (F/M/O):`).toUpperCase()
	let opiniao = parseInt(
		prompt(
			`Pessoa ${
				i + 1
			} - Opinião sobre o filme (4=ótimo, 3=bom, 2=regular, 1=péssimo):`
		)
	)

	idades.push(idade)
	sexos.push(sexo)
	opinioes.push(opiniao)
}

// Funções auxiliares
const media = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
const maisVelha = Math.max(...idades)
const maisNova = Math.min(...idades)
const pessimos = opinioes.filter((o) => o === 1).length
const otimos = opinioes.filter((o) => o === 4).length
const bons = opinioes.filter((o) => o === 3).length
const percentualOtimoBom = ((otimos + bons) / totalPessoas) * 100

const qtdMulheres = sexos.filter((s) => s === "F").length
const qtdHomens = sexos.filter((s) => s === "M").length
const qtdOutros = sexos.filter((s) => s === "O").length

console.log(`Média de idade: ${media(idades).toFixed(1)} anos`)
console.log(`Idade da pessoa mais nova: ${maisNova} anos`)
console.log(`Idade da pessoa mais velha: ${maisVelha} anos`)
console.log(`Quantidade que responderam 'péssimo': ${pessimos}`)
console.log(
	`% que responderam 'ótimo' ou 'bom': ${percentualOtimoBom.toFixed(2)}%`
)
console.log(`Número de mulheres: ${qtdMulheres}`)
console.log(`Número de homens: ${qtdHomens}`)
console.log(`Número de outros: ${qtdOutros}`)
