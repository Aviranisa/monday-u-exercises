import "../../App.css";
import "./InputComp.css";
import React, { useCallback, useRef, useState } from "react";
import ButtonComp from "../buttonComp/ButtonComp";
import plusImg from "../../images/plus.png";
import { useEffect } from "react";

function InputComp({
	dispatchAddItems,
	dispatchIsLoading,
	dispatchSearchText,
}) {
	const [inputValue, setInputValue] = useState(null);
	const inputElement = useRef();

	const addItemHandeler = useCallback(async () => {
		dispatchIsLoading(true);
		await dispatchAddItems(inputValue);
		dispatchIsLoading(false);
	}, [dispatchAddItems, inputValue, dispatchIsLoading]);

	const eventListenerForEnter = useCallback(
		(e) => {
			if (inputValue && inputValue !== "" && e.keyCode === 13) {
				addItemHandeler();
			}
		},
		[inputValue, addItemHandeler]
	);

	useEffect(() => {
		dispatchSearchText(inputValue);
	}, [inputValue, dispatchSearchText]);

	return (
		<div className="new-task-container">
			<input
				type="text"
				className="task-input"
				placeholder="Write your task here"
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				onKeyDown={(e) => eventListenerForEnter(e)}
				ref={inputElement}
			></input>
			<ButtonComp
				className={"clickable pluse-icon-element"}
				imgSrc={plusImg}
				imgClassName={"pluse-icon"}
				alt={"add an item to the items list"}
				onClick={() => addItemHandeler()}
			/>
		</div>
	);
}

export default InputComp;
