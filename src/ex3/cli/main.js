// import chalk from "chalk";
import { Command } from "commander";
import dotenv from "dotenv";
import ItemManager from "./item_manager.js";
import inquirer from "inquirer";
const program = new Command();
const itemManager = new ItemManager();
dotenv.config();
const envFile = process.env;

const validateInput = async (inputValue) => {
	const patternForNumbers = /^\d+$/;
	if (patternForNumbers.test(inputValue) || inputValue.includes(",")) {
		await itemManager.pokemonIdsTostring(inputValue);
	} else {
		itemManager.addListItem(inputValue);
	}
};

const bojIndexInArray = (obj, array) => {
	const objIndex = array.findIndex((item) => {
		return item.value === obj;
	});
	return objIndex;
};

const validateRemovingItem = (removeingItems) => {
	if (Array.isArray(removeingItems.item)) {
		removeingItems.item.forEach((itemToRemove) => {
			const file = itemManager.getAllItems();
			const itemIndex = bojIndexInArray(itemToRemove, file.data);
			itemManager.removeItem(itemIndex);
		});
	}
};

const createInquirer = (type, message, choices, callback) => {
	inquirer
		.prompt([
			{
				type: type,
				name: "item",
				message: message,
				choices: choices,
			},
		])
		.then((answers) => {
			callback(answers);
		});
};

function removeFirstWord(str) {
	const indexOfSpace = str.indexOf(" ");
	if (indexOfSpace === -1) {
		return "";
	}
	return str.substring(indexOfSpace + 1);
}

program
	.name("cli-todoApp")
	.description("The best CLI for todo list and catch pokemons")
	.version("1.0.0");

program
	.command("get-items")
	.description(envFile.getDescription)
	.action(() => {
		const file = itemManager.getAllItems();
		createInquirer("rawlist", "Which is better?", file.data, (answers) => {
			console.log(`${removeFirstWord(answers.item)} is the best!`);
		});
	});

program
	.command("add-item")
	.description(envFile.addDescription)
	.argument("<starig>", envFile.addDescription)
	.action((itemToAdd) => {
		validateInput(itemToAdd);
		console.log(envFile.addMessage);
	});

program
	.command("remove-item")
	.description(envFile.removeDescription)
	.action(() => {
		const file = itemManager.getAllItems();
		createInquirer(
			"checkbox",
			"Which items do you want to remove?",
			file.data,
			(answers) => {
				validateRemovingItem(answers);
				console.log(envFile.removeMessage, answers.item);
			}
		);
	});

program
	.command("clear")
	.description(envFile.clearDescription)
	.action(() => {
		let CleanFile = itemManager.clearItemsArray();
		console.log(CleanFile, envFile.clearMessage);
	});
program.parse();
