let http = require('http');
let server = http.createServer(function (req, res) {
  let opcao = req.url;
  if (opcao == '/historia') {
    res.end('<html><body>historia da fatec sorocaba</body></html>');
  } else if (opcao == '/cursos') {
    res.end('<html><body>cursos</body></html>');
  } else if (opcao == '/professores') {
    res.end('<html><body>professores</body></html>');
  } else res.end('<html><body>site da fatec sorocaba</body></html>');
});
server.listen(3000);
