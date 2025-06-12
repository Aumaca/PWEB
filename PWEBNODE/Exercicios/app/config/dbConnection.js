let sql = require('mssql');
let connSQLServer = function(){
    const sqlConfig = {
        user:'BD2313027',
        password: 'K1912jr@',
        database: 'BD',
        server: 'APOLO',
        options:{
            encrypt: false,
            trustServerCertificate:true,
    }
}
return sql.connect(sqlConfig);
}

module.exports =function(){
    console.log('O autoload carregou o modulo de conexao com o BD');
    return connSQLServer;
}