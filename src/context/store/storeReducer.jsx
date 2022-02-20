import {
	ADD_ITEM,
	SELECT_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
	GET_LIST,
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case GET_LIST:
			return {
				...state,
				list: action.list,
			};
		case SELECT_ITEM:
			return {
				...state,
				item: action.item,
			};
		case ADD_ITEM:
			return {
				...state,
				list: [...state.list, action.item],
			};
		case UPDATE_ITEM:
			return {
				...state,
				item: {},
				list: state.list.map((item) =>
					item.id === action.item.id ? action.item : item
				),
			};
		case DELETE_ITEM:
			return {
				...state,
				list: state.list.filter((item) => item.id !== action.id),
			};
		default:
			return state;
	}
};
