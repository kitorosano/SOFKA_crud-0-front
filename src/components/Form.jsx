import React, { useContext, useRef, useState } from 'react';
import StoreContext from '../context/store/storeContext';

const HOST_API = 'http://localhost:8080/api';

function Form() {
	const formRef = useRef(null);
	const {
		dispatch,
		state: { item },
	} = useContext(StoreContext);
	const [state, setState] = useState(item);

	const onAdd = (ev) => {
		ev.preventDefault();

		const request = {
			name: state.name,
			description: state.description,
			id: null,
			isComplete: false,
		};

		fetch(HOST_API + '/todo', {
			method: 'POST',
			body: JSON.stringify(request),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((todo) => {
				dispatch({ type: 'add-item', item: todo });
				setState({ name: '' });
				formRef.current.reset();
			});
	};

	const onEdit = (ev) => {
		ev.preventDefault();

		const request = {
			name: state.name,
			description: state.description,
			id: item.id,
			isComplete: item.isComplete,
		};

		fetch(HOST_API + '/todo', {
			method: 'PUT',
			body: JSON.stringify(request),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((todo) => {
				dispatch({ type: 'update-item', item: todo });
				setState({ name: '' });
				formRef.current.reset();
			});
	};

	return (
		<form ref={formRef}>
			<input
				type='text'
				name='name'
				defaultValue={item.name}
				onChange={(ev) => setState({ ...state, name: ev.target.value })}
			/>
			{item.id ? (
				<button onClick={onEdit}>Actualizar</button>
			) : (
				<button onClick={onAdd}>Agregar</button>
			)}
		</form>
	);
}

export default Form;
