
export default (state, action) => {
	switch (action.type) {
		case 'update-item':
			const listUpdateEdit = state.list.map((item) =>
				item.id === action.item.id ? action.item : item
			);
			console.log(listUpdateEdit);
			return { ...state, list: listUpdateEdit, item: {} };
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
};
