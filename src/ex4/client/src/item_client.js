// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const getAllItems = async () => {
	try {
		const res = await fetch("/tasks");
		return {
			status: res.status,
			items: await res.json(),
		};
	} catch (err) {
		return err;
	}
};

const addItem = async (item) => {
	const res = await fetch("/tasks/add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	return res.ok;
};

const updateItem = async (itemToUpdate, itemId) => {
	const res = await fetch(`/tasks/update/${itemId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(itemToUpdate),
	});
	return res.ok;
};

const deleteItem = async (itemId) => {
	const res = await fetch(`/tasks/delete/${itemId}`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
	});
	debugger;
	return res.ok;
};

const clearAll = async (itemId) => {
	const res = await fetch(`/tasks/clear`, {
		method: "DELETE",
		headers: {
			"Content-type": "application/json",
		},
	});
	debugger;
	return res.ok;
};

module.exports = {
	getAllItems,
	addItem,
	deleteItem,
	updateItem,
	clearAll,
};