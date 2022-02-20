import {
	ADD_ITEM,
	SELECT_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
	GET_LIST
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case GET_LIST:
			return {
				...state,
				list: action.payload,
			};
		case SELECT_ITEM:
			return {
				...state,
				item: action.payload,
			};
		case ADD_ITEM:
			return {
				...state,
				list: [...state.list, action.payload],
			};
		case UPDATE_ITEM:
			return {
				...state,
				item: {},
				list: state.list.map((item) =>
					item.id === action.payload.id ? action.payload : item
				),
			};
		case DELETE_ITEM:
			return {
				...state,
				list: state.list.filter((item) => item.id !== action.payload),
			};
		default:
			return state;
	}
};
