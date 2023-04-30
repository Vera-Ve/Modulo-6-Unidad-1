const fs = require('fs');
const http = require('http');



const fetchPokemonsData = async () => {
    return new Promise((resolve, reject)=> {
        fs.readFile('pokemons.json','utf8', (err, data) => {
    if (err) {
        reject (err);
    } else {
        resolve(JSON.parse(data));
    }
    });
});
};

const handleRequest = async (req, res) => {
  const pokemonID = parseInt(req.url.split('/')[1]);
  const pokemonName = decodeURI(req.url.substring(1));
  
  
  
  const pokemonsData = await fetchPokemonsData();
  let pokemonData = null;
  pokemonsData.forEach((pokemon) => {
    const nameValues = Object.values(pokemon.name);
    console.log(nameValues);
        if (nameValues.includes(pokemonName) || pokemon.id === pokemonID) {
        pokemonData = pokemon;
        
        
    }
  });
  if (pokemonData) {
    const response = {
      'Tipo': `[${pokemonData.type.join(', ')}]`,
      'HP': pokemonData.HP,
      'Attack': pokemonData.base.Attack,
      'Defense': pokemonData.base.Defense,
      ' Sp. Attack:': pokemonData.base['Sp. Attack'],
      ' Sp. Defense:': pokemonData.base['Sp. Defense'],
      'Speed': pokemonData.base.Speed
      
    };
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(response, null, 2));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Pokemon no encontrado');
  }
};

const port = 1000;
const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
