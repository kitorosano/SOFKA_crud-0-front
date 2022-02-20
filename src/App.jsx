import Form from './components/Form';
import List from './components/List';
import StoreProvider from './context/store/storeProvider';

function App() {
	return (
		<StoreProvider>
			<Form />
			<List />
		</StoreProvider>
	);
}

export default App;
