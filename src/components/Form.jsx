import React, { useContext, useRef, useState } from 'react';
import StoreContext from '../context/store/storeContext';


function Form() {
	const formRef = useRef(null);
	const { item: actualItem, addItem, updateItem } = useContext(StoreContext);
	const [modifiedItem, setModifiedItem] = useState(actualItem);

	const onAdd = (ev) => {
		ev.preventDefault();

		addItem({
			name: modifiedItem.name,
			description: modifiedItem.description,
			id: null,
			isComplete: false,
		});

		setModifiedItem({ name: '' });
		formRef.current.reset();
	};

	const onEdit = (ev) => {
		ev.preventDefault();

		updateItem({
			name: modifiedItem.name,
			description: modifiedItem.description,
			id: actualItem.id,
			isComplete: actualItem.isComplete,
		});

		setModifiedItem({ name: '' });
		formRef.current.reset();
	};

	return (
		<form ref={formRef}>
			<input
				type='text'
				name='name'
				defaultValue={actualItem.name}
				onChange={(ev) => setModifiedItem({ ...modifiedItem, name: ev.target.value })}
			/>
			{actualItem.id ? (
				<button onClick={onEdit}>Actualizar</button>
			) : (
				<button onClick={onAdd}>Agregar</button>
			)}
		</form>
	);
}

export default Form;
