import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const envFile = process.env;
class PokemonClient {
	constructor() {}
	async getPokemon(pokeID) {
		try {
			const res = await fetch(`${envFile.pokemonApi}${pokeID}`);
			const pokemonObj = await res.json();
			return `catch ${pokemonObj.name}`;
		} catch (err) {
			console.error(err);
			return `Invalid pokemon id ${pokeID}`;
		}
	}
}
export default PokemonClient;
