function maiorDeTres(a, b, c) {
	return Math.max(a, b, c)
}

function ordenarCrescente(a, b, c) {
	return [a, b, c].sort((x, y) => x - y)
}

function ehPalindromo(str) {
	const texto = str.toUpperCase().replace(/[\W_]/g, "")
	const invertido = texto.split("").reverse().join("")
	return texto === invertido
}

function tipoTriangulo(a, b, c) {
	if (a + b > c && a + c > b && b + c > a) {
		if (a === b && b === c) return "Equilátero"
		if (a === b || a === c || b === c) return "Isósceles"
		return "Escaleno"
	}
	return "Não é um triângulo"
}

export { maiorDeTres, ordenarCrescente, ehPalindromo, tipoTriangulo }
