const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonInfo = () => {
    const text = getById("pokemonSearch").value;
    fetch(pokemonUrl + text.toLowerCase())
        .then(response => response.json())
        .then(data => {
            getById("pokemon").style.backgroundImage = `url(${data.sprites.other.dream_world.front_default})`
            getById("pokemonId").innerText = data.id;
            getById("pokemonName").innerText = data.name;
            getById("pokemonHeight").innerText = data.height;
            getById("pokemonWeight").innerText = data.weight;
            getById("pokemonHp").innerText = data.stats[0].base_stat;
            getById("pokemonType").innerText = data.types[0].type.name;
            getById("pokemonAtk").innerText = data.stats[1].base_stat;
            getById("pokemonDef").innerText = data.stats[2].base_stat;
        })
        .catch(err => console.error(err));
}