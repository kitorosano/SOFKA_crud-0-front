import React, { useContext, useEffect } from 'react';
import StoreContext from '../context/store/storeContext';


function List() {
	const { list, getList, selectItem, deleteItem } = useContext(StoreContext);

	useEffect(() => {
		getList();
	}, [list.length]);

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
				{list.map((todo, i) => (
					<tr key={i}>
						<td>{todo.id}</td>
						<td>{todo.name}</td>
						<td>{todo.descripcion}</td>
						<td>{todo.isComplete ? '✅' : '❌'}</td>
						<td>
							<button onClick={() => deleteItem(todo.id)}>Eliminar</button>
						</td>
						<td>
							<button onClick={() => selectItem(todo)}>Editar</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default List;
