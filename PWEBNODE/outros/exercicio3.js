let soma = 0;
for (let i = 2; i <= process.argv.length - 1; i++) {
  soma = soma + Number(process.argv[i]);
}
console.log('soma= ' + soma);

/* argv[0]=Node; 
argv[1]= nome do programa; 
argv[2]= o primeiro argumento passado */
