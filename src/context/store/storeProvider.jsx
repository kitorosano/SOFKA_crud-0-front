import { useReducer } from 'react';
import {
	ADD_ITEM,
	SELECT_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
	SAVE_LIST,
} from '../../types';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';
const HOST_API = 'http://localhost:8080/api';

const StoreProvider = (props) => {
	const initialState = {
		list: [],
		item: {},
	};

	const [state, dispatch] = useReducer(StoreReducer, initialState);

	// Get every item on the list
	const getList = async () => {
		const response = await fetch(HOST_API + '/todos');
		const list = await response.json();

		dispatch({ type: SAVE_LIST, list });
	};

	// Selects the item to edit
	const selectItem = (todo) => {
		dispatch({ type: SELECT_ITEM, item: todo });
	};

	// Delete item by id
	const deleteItem = async (id) => {
		fetch(`${HOST_API}/todos/${id}`, {
			method: 'DELETE',
		}).then(() => dispatch({ type: DELETE_ITEM, id }));
	};

  // Adds item to the list
	const addItem = async (request) => {
		const response = await fetch(HOST_API + '/todos', {
			method: 'POST',
			body: JSON.stringify(request),
			headers: { 'Content-Type': 'application/json' },
		});
		const todo = response.json();

		dispatch({ type: ADD_ITEM, item: todo });
	};

  // Updates item by id
	const updateItem = async (request) => {
		const response = await fetch(HOST_API + `/todos/${request.id}`, {
			method: 'PUT',
			body: JSON.stringify(request),
			headers: { 'Content-Type': 'application/json' },
		});
		const todo = await response.json();

		dispatch({ type: UPDATE_ITEM, item: todo });
	};

	return (
		<StoreContext.Provider
			value={{
				list: state.list,
				item: state.item,
				getList,
				selectItem,
				deleteItem,
				addItem,
				updateItem,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreProvider;
