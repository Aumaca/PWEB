class Conta {
    constructor() {
        this._nomeCorrentista = "";
        this._banco = "";
        this._numeroConta = "";
        this._saldo = 0;
    }

    get nomeCorrentista() { return this._nomeCorrentista; }
    set nomeCorrentista(nome) { this._nomeCorrentista = nome; }

    get banco() { return this._banco; }
    set banco(banco) { this._banco = banco; }

    get numeroConta() { return this._numeroConta; }
    set numeroConta(numero) { this._numeroConta = numero; }

    get saldo() { return this._saldo; }
    set saldo(valor) { this._saldo = valor; }
}

class Corrente extends Conta {
    constructor() {
        super();
        this._saldoEspecial = 0;
    }

    get saldoEspecial() { return this._saldoEspecial; }
    set saldoEspecial(valor) { this._saldoEspecial = valor; }
}


class Poupanca extends Conta {
    constructor() {
        super();
        this._juros = 0;
        this._dataVencimento = "";
    }

    get juros() { return this._juros; }
    set juros(valor) { this._juros = valor; }

    get dataVencimento() { return this._dataVencimento; }
    set dataVencimento(data) { this._dataVencimento = data; }
}

const contaCorrente = new Corrente();
contaCorrente.nomeCorrentista = prompt("Nome do Correntista (Corrente):");
contaCorrente.banco = prompt("Banco (Corrente):");
contaCorrente.numeroConta = prompt("Número da Conta (Corrente):");
contaCorrente.saldo = parseFloat(prompt("Saldo (Corrente):"));
contaCorrente.saldoEspecial = parseFloat(prompt("Saldo Especial (Corrente):"));

console.log("=== Conta Corrente ===");
console.log("Nome:", contaCorrente.nomeCorrentista);
console.log("Banco:", contaCorrente.banco);
console.log("Número da Conta:", contaCorrente.numeroConta);
console.log("Saldo: R$", contaCorrente.saldo.toFixed(2));
console.log("Saldo Especial: R$", contaCorrente.saldoEspecial.toFixed(2));

const contaPoupanca = new Poupanca();
contaPoupanca.nomeCorrentista = prompt("Nome do Correntista (Poupança):");
contaPoupanca.banco = prompt("Banco (Poupança):");
contaPoupanca.numeroConta = prompt("Número da Conta (Poupança):");
contaPoupanca.saldo = parseFloat(prompt("Saldo (Poupança):"));
contaPoupanca.juros = parseFloat(prompt("Juros (% ao mês):"));
contaPoupanca.dataVencimento = prompt("Data de Vencimento (Poupança):");

console.log("=== Conta Poupança ===");
console.log("Nome:", contaPoupanca.nomeCorrentista);
console.log("Banco:", contaPoupanca.banco);
console.log("Número da Conta:", contaPoupanca.numeroConta);
console.log("Saldo: R$", contaPoupanca.saldo.toFixed(2));
console.log("Juros: ", contaPoupanca.juros + "%");
console.log("Data de Vencimento:", contaPoupanca.dataVencimento);
