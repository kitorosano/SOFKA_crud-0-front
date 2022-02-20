import { useReducer } from 'react';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';


const StoreProvider = (props) => {
	const initialState = {
		list: [],
		item: {},
	};

	const [state, dispatch] = useReducer(StoreReducer, initialState);

	return (
		<StoreContext.Provider
			value={{
				state, dispatch
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
};

export default StoreProvider;