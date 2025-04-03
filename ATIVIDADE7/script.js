function jogar(escolhaUsuario) {
  let escolhaComputador = gerarEscolhaComputador();
  
  document.getElementById('escolhaUsuario').textContent = escolhaUsuario;
  document.getElementById('escolhaComputador').textContent = escolhaComputador;

  let vencedor = determinarVencedor(escolhaUsuario, escolhaComputador);
  document.getElementById('vencedor').textContent = vencedor;
}

function gerarEscolhaComputador() {
  let numeroAleatorio = Math.random();

  if (numeroAleatorio < 0.33) {
    return 'pedra';
  } else if (numeroAleatorio < 0.66) {
    return 'papel';
  } else {
    return 'tesoura';
  }
}

function determinarVencedor(usuario, computador) {
  if (usuario === computador) {
    return 'Empate!';
  }

  if (
    (usuario === 'pedra' && computador === 'tesoura') ||
    (usuario === 'tesoura' && computador === 'papel') ||
    (usuario === 'papel' && computador === 'pedra')
  ) {
    return 'Você venceu!';
  } else {
    return 'O computador venceu!';
  }
}
