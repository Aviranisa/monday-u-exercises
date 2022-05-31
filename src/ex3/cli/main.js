// import chalk from "chalk";
import { Command } from "commander";
import dotenv from "dotenv";
import ItemManager from "./item_manager.js";
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

program
	.name("cli-todoApp")
	.description("The best CLI for todo list")
	.version("1.0.0");

program
	.command("get-items")
	.description(envFile.getDescription)
	// .option("-c, --color <string>", "Result color", "white")
	.action(() => {
		const file = itemManager.getAllItems();
		let index = 1;
		file.data.forEach((item) => {
			console.log(`${index}. ${item.value}`);
			index++;
		});
		// console.log(chalk[options.color](`Result: ${Number(temp) + String(city)}`));
	});

program
	.command("add-item")
	.description(envFile.addDescription)
	.argument("<starig>", envFile.addDescription)
	.action((itemToAdd) => {
		validateInput(itemToAdd);
		console.log("item saved");
	});

program
	.command("remove-item")
	.description(envFile.removeDescription)
	.argument("<number>", envFile.removeDescription)
	.action((index) => {
		itemManager.removeItem(index);
		console.log(`Removeing successfully`);
	});

program
	.command("clear")
	.description("Clean all the file data and decrement id to 0")
	.action(() => {
		let CleanFile = itemManager.clearItemsArray();
		console.log(CleanFile, `Successfully clear`);
	});
program.parse();
