function abrirCurso() {
    const select = document.getElementById("cursoSelect");
    const curso = select.value;

    if (curso === "") return;

    const nomesCursos = {
        ads: "Análise e Desenvolvimento de Sistemas",
        logistica: "Logística",
        mecatronica: "Mecatrônica Industrial",
        gestaoTI: "Gestão da Tecnologia da Informação"
    };

    const confirmacao = prompt("Deseja abrir informações sobre o curso de " + nomesCursos[curso] + "?");

    if (confirmacao !== null) {
        const novaJanela = window.open("", "_blank", "width=600,height=300");
        let conteudo = "<!DOCTYPE html><html><head><title>" + nomesCursos[curso] + "</title></head><body>";
        conteudo += "<h1>" + nomesCursos[curso] + "</h1>";

        switch (curso) {
            case "ads":
                conteudo += "<p>Curso voltado ao desenvolvimento de software, banco de dados e engenharia de sistemas.</p>";
                break;
            case "logistica":
                conteudo += "<p>Focado na cadeia de suprimentos, transporte e armazenamento de produtos.</p>";
                break;
            case "mecatronica":
                conteudo += "<p>Integra mecânica, eletrônica e computação para automação industrial.</p>";
                break;
            case "gestaoTI":
                conteudo += "<p>Gerenciamento de infraestrutura de TI e alinhamento estratégico com os negócios.</p>";
                break;
        }

        conteudo += "</body></html>";
        novaJanela.document.write(conteudo);
        novaJanela.document.close();
    }
}
