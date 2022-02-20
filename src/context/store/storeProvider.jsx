import { useReducer } from 'react';
import {
	ADD_ITEM,
	SELECT_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
	GET_LIST,
} from '../../types';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';
const HOST_API = 'http://localhost:8080/api';

const StoreProvider = (props) => {
	const initialState = {
		list: [],
		item: {},
	};
	/**TODO: message state for reading request errors*/

	const [state, dispatch] = useReducer(StoreReducer, initialState);

	// Get every item on the list
	const getList = async () => {
		try {
			const response = await fetch(HOST_API + '/todos');
			const list = await response.json();

			dispatch({ type: GET_LIST, payload: list });
		} catch (error) {
			console.error(error);
		}
	};

	// Selects the item to edit
	const selectItem = (todo) => {
		dispatch({ type: SELECT_ITEM, payload: todo });
	};

	// Adds item to the list
	const addItem = async (newTodo) => {
		try {
			const response = await fetch(HOST_API + '/todos', {
				method: 'POST',
				body: JSON.stringify(newTodo),
				headers: { 'Content-Type': 'application/json' },
			});
			const todo = response.json();

			dispatch({ type: ADD_ITEM, payload: todo });
		} catch (error) {
			console.error(error);
		}
	};

	// Updates item by id
	const updateItem = async (id, newTodo) => {
		try {
			const response = await fetch(HOST_API + `/todos/${id}`, {
				method: 'PUT',
				body: JSON.stringify(newTodo),
				headers: { 'Content-Type': 'application/json' },
			});
			const todo = await response.json();

			dispatch({ type: UPDATE_ITEM, payload: todo });
		} catch (error) {
			console.error(error);
		}
	};

	// Delete item by id
	const deleteItem = async (id) => {
		try {
			fetch(`${HOST_API}/todos/${id}`, {
				method: 'DELETE',
			}).then(() => dispatch({ type: DELETE_ITEM, payload: id }));
		} catch (error) {
			console.error(error);
		}
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
