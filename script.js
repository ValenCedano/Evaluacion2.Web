
const urlName = 'https://pokeapi.co/api/v2/pokemon/';

const entradaNombre = document.querySelector("#in1");
const botones = document.getElementsByClassName("buttonSearch");
const getPokemon = async (nombre) => {
    try {
        const response = await axios.get(`${urlName}${nombre}`);
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

const getOtherLinks = async (url) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    }
    catch (error) {
        console.log(error);
    }
}


const insertarNombre = document.querySelector(".pokemonName");
const insertarTipo = document.querySelector(".pokemonType");
const insertarHabilidades = document.querySelector(".pokemonAbilities");
const container = document.getElementsByTagName("div");
const insertarDescripcion = document.querySelector(".pokemonDescrition");
const insertarImagen = document.querySelector(".pokemonImg");
const botonEvolucion = document.querySelector(".buttonEvolution");
console.log(botonEvolucion);
console.log(container);
console.log(insertarNombre);
const tipo = document.getElementsByClassName("pokemonType");
let habilidades = [];

let nombreOriginal;
let link_proximo;


document.addEventListener("DOMContentLoaded", async () => {
    let habilitacion = false;
    let nombrePokemonAntiguo = null;
    let nombrePokemon;
    const botonImagen = botones[0].querySelector("img");
    const imprimirTarjeta = async () => {
        let descripcion = [];
        let datosPokemon = await getPokemon(nombrePokemon);
        insertarDescripcion.innerHTML = '';
        console.log(datosPokemon);
        if (datosPokemon == undefined){
            container[1].setAttribute('style', 'display:flex');
        } else{
            container[1].setAttribute('style', 'display:none');
        }
        nombrePokemon= datosPokemon.species.name;
        nombrePokemonAntiguo = nombrePokemon;
        const fotosrc = datosPokemon.sprites.other['official-artwork'].front_default;
        console.log(fotosrc);
        const tipo = datosPokemon.types[0].type.name;
        insertarNombre.innerHTML = nombrePokemon;
        container[2].setAttribute('style', 'display:flex')
        datosPokemon.abilities.forEach(element => {
            habilidades.push(element.ability.name)
            console.log(element.ability.name)

        });

        insertarTipo.textContent = tipo;
        insertarHabilidades.textContent = habilidades;
        insertarImagen.src = fotosrc;
        console.log(tipo);
        console.log(nombrePokemon);



        const urlSpecies = datosPokemon.species.url;

        const datosPokemon2 = await getOtherLinks(urlSpecies);
        const urlchain = datosPokemon2.evolution_chain.url;
        const evolution = await getOtherLinks(urlchain);
        console.log(evolution);
        console.log(datosPokemon);
        console.log(datosPokemon2);

        (datosPokemon2.flavor_text_entries).forEach((elemento) => {
            if (elemento.language.name == "es") {
                descripcion.push(elemento.flavor_text);
            }
        });

        descripcion.forEach(texto => {
            insertarDescripcion.innerHTML += `${texto}`;
        })
        console.log(descripcion);

        let sigueEvolucion = evolution.chain.evolves_to[0];

        console.log(sigueEvolucion.evolves_to[0]);
        if (Array.from(sigueEvolucion.evolves_to[0].evolves_to).length == 0) {
            const valor = sigueEvolucion.evolves_to[0]
            console.log(valor);
            //link_proximo = species.url;
            habilitacion = true;
            nombrePokemon = valor.species.name;
            if (nombrePokemon == nombrePokemonAntiguo) {
                habilitacion = false;
            }
        }

        
        console.log(habilitacion);
        if (habilitacion == true) {
            container[8].setAttribute('style', 'display:flex');
            botonEvolucion.setAttribute('style', 'display:flex');
            botonEvolucion.addEventListener("click", () => {
                imprimirTarjeta();
            });
        } else {
            botonEvolucion.setAttribute('style', 'display:none');
        }
    };

    botonImagen.addEventListener("click", async () => {
        console.log("Hiciste clic en la imagen del botón de búsqueda.");
        nombrePokemon = entradaNombre.value;
        nombreOriginal = entradaNombre.value;
        imprimirTarjeta();
    });


});

