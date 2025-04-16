function calcularIMC(peso, altura) {
	return peso / (altura * altura)
}

function classificarIMC(imc) {
	if (imc < 18.5) return ["Magreza", "0"]
	if (imc < 25) return ["Normal", "0"]
	if (imc < 30) return ["Sobrepeso", "I"]
	if (imc < 40) return ["Obesidade", "II"]
	return ["Obesidade grave", "III"]
}

function mostrarResultado() {
	const pesoInput = document.getElementById("peso")
	const alturaInput = document.getElementById("altura")
	const peso = parseFloat(pesoInput.value)
	const altura = parseFloat(alturaInput.value)
	const resultado = document.getElementById("resultado")

	if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
		console.log("aq")
		resultado.innerText =
			"Por favor, insira valores numéricos válidos para peso e altura."
		resultado.style.color = "red"
		return
	}

	resultado.style.color = "black"
	const imc = calcularIMC(peso, altura).toFixed(2)
	console.log(altura)
	const [classificacao, grau] = classificarIMC(imc)

	resultado.innerHTML = `
    IMC: ${imc} <br>
    Classificação: ${classificacao} <br>
    Obesidade (grau): ${grau}
  `
}
