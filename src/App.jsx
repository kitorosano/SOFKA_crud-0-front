import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
const HOST_API = 'http://localhost:8080/api';

const initialState = {
	list: [],
	item: {},
};
const Store = createContext(initialState);

const Form = () => {
	const formRef = useRef(null);
	const {
		dispatch,
		state: { item },
	} = useContext(Store);
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
};

const List = () => {
	const { state, dispatch } = useContext(Store);

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
				{state.list.map((todo,i) => (
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
};

const StoreProvider = ({ children }) => {
	function reducer(state, action) {
		switch (action.type) {
      case 'update-item':
        const listUpdateEdit = state.list.map(item => item.id === action.item.id ? action.item : item);
        console.log(listUpdateEdit)
        return {...state, list: listUpdateEdit, item: {}}
			case 'delete-item':
				const listUpdate = state.list.filter((item) => item.id !== action.id);
				return { ...state, list: listUpdate };
			case 'update-list':
				return { ...state, list: action.list };
			case 'edit-item':
				return { ...state, item: action.item };
			case 'add-item':
				const newList = state.list;
				newList.push(action.item);
				return { ...state, list: newList };
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
	);
};

function App() {
	return (
		<StoreProvider>
			<Form />
			<List />
		</StoreProvider>
	);
}

export default App;
