function validar(event) {
    const form = document.meuFormulario.elements;

    const nome = form["nome"].value.trim();
    const comentario = form["comentario"].value.trim();
    const pesquisa = form["pesquisa"].value;

    // Validação do nome
    if (nome.length < 10) {
        alert("O nome deve conter no mínimo 10 caracteres.");
        return false;
    }

    // Validação do comentário
    if (comentario.length < 20) {
        alert("O comentário deve conter no mínimo 20 caracteres.");
        return false;
    }

    // Validação da pesquisa
    if (!pesquisa) {
        alert("Por favor, responda à pesquisa.");
        return false;
    } else {
        if (pesquisa === "nao") {
            alert("Que bom que você voltou a visitar esta página!");
        } else {
            alert("Volte sempre à esta página!");
        }
    }

    return true; // Permite o envio do formulário
}
