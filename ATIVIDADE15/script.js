function validar(event) {
    event.preventDefault();
    const form = document.formulario;
    const nome = form.elements['nome'].value.trim();
    const email = form.elements['email'].value;
    const comentario = form.elements['comentario'].value.trim();
    const pesquisa = form.elements['pesquisa'];

    if (nome.length < 10) {
        prompt("Erro", "O nome deve ter pelo menos 10 caracteres.");
        return false;
    }

    if (comentario.length < 20) {
        prompt("Erro", "O comentário deve ter pelo menos 20 caracteres.");
        return false;
    }

    let pesquisaSelecionada = false;
    let resposta = '';
    for (let i = 0; i < pesquisa.length; i++) {
        if (pesquisa[i].checked) {
            pesquisaSelecionada = true;
            resposta = pesquisa[i].value;
            break;
        }
    }

    if (!pesquisaSelecionada) {
        prompt("Atenção", "Você precisa responder a pesquisa.");
        return false;
    }

    if (resposta === "sim") {
        prompt("Mensagem", "Que bom que você voltou a visitar esta página!");
    } else {
        prompt("Mensagem", "Volte sempre à esta página!");
    }

    return true;
}
