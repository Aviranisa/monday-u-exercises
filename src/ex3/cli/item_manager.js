import PokemonClient from "./PokemonClient.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const envFile = process.env;
const cleanFile = { data: [] };
class ItemManager {
	constructor() {
		this.pokemonClient = new PokemonClient();
	}

	getAllItems() {
		let file = fs.readFileSync(envFile.jsonFilePath);
		return JSON.parse(file);
	}

	async setAllItems(file) {
		fs.writeFileSync(envFile.jsonFilePath, JSON.stringify(file), (err) => {
			if (err) {
				console.error(err);
			}
		});
	}

	addListItem(item) {
		const file = this.getAllItems();
		file.data = [...file.data, { value: item }];
		this.setAllItems(file);
		return file;
	}

	removeItem(itemIndex) {
		const file = this.getAllItems();
		file.data = [
			...file.data.filter((item, i) => i !== parseInt(itemIndex) - 1),
		];
		const newFIle = this.setAllItems(file);
		return;
	}

	async pokemonIdsHendeling(pokeID) {
		const pokemon = await this.pokemonClient.getPokemon(pokeID);
		return pokemon;
	}

	async pokemonIdsTostring(pokemonIdsStr) {
		const pokemonIdsArray = pokemonIdsStr.split(",");
		const pokemonPromises = [];

		pokemonIdsArray.forEach((pokemonIdStr) => {
			pokemonPromises.push(this.pokemonIdsHendeling(pokemonIdStr.trim()));
		});
		const pokemonsRsult = await Promise.all(pokemonPromises);
		pokemonsRsult.forEach((pokemon) => {
			const items = this.addListItem(pokemon);
			return items;
		});
		return pokemonsRsult;
	}

	clearItemsArray() {
		this.setAllItems(cleanFile);
		return cleanFile;
	}
}

export default ItemManager;
