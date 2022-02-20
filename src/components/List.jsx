import React, { useContext, useEffect } from 'react';
import StoreContext from '../context/store/storeContext';

const HOST_API = 'http://localhost:8080/api';

function List() {
	const { state, dispatch } = useContext(StoreContext);

	useEffect(() => {
		fetch(HOST_API + '/todos')
			.then((response) => response.json())
			.then((list) => {
				dispatch({ type: 'update-list', list });
			});
	}, [state.list.length, dispatch]);

	const onDelete = (id) => {
		fetch(HOST_API + '/' + id + '/todo', {
			method: 'DELETE',
		}).then((list) => {
			dispatch({ type: 'delete-list', id });
		});
	};

	const onEdit = (todo) => {
		dispatch({ type: 'edit-item', item: todo });
	};

	return (
		<table>
			<thead>
				<tr>
					<td>ID</td>
					<td>Nombre</td>
					<td>Descripcion</td>
					<td>¿Está compleatado?</td>
				</tr>
			</thead>
			<tbody>
				{state.list.map((todo, i) => (
					<tr key={i}>
						<td>{todo.id}</td>
						<td>{todo.name}</td>
						<td>{todo.descripcion}</td>
						<td>{todo.isComplete ? '✅' : '❌'}</td>
						<td>
							<button onClick={() => onDelete(todo.id)}>Eliminar</button>
						</td>
						<td>
							<button onClick={() => onEdit(todo)}>Editar</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default List;
