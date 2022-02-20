import React, { useContext, useEffect } from 'react';
import StoreContext from '../context/store/storeContext';

function List() {
	const { list, getList, selectItem, deleteItem } = useContext(StoreContext);

	useEffect(() => {
		getList();
	}, [list.length]);

	return (
		<table className='table table-striped table-hover'>
			<caption>TODO List</caption>
			<thead>
				<tr>
					<th scope='col'>#ID</th>
					<th scope='col'>Nombre</th>
					<th scope='col'>¿Está compleatado?</th>
					<th scope='col'>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{list.map((todo, i) => (
					<tr key={i}>
						<th scope='row'>{todo.id}</th>
						<td>{todo.name}</td>
						<td>{todo.isComplete ? '✅' : '❌'}</td>
						<td>
							<button
								className='btn btn-secondary'
								onClick={() => selectItem(todo)}
							>
								Editar
							</button>{' '}
							<button
								className='btn btn-danger'
								onClick={() => deleteItem(todo.id)}
							>
								Eliminar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default List;
