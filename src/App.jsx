import Form from './components/Form';
import List from './components/List';
import StoreProvider from './context/store/storeProvider';

function App() {
	return (
		<StoreProvider>
			<div className='container  text-center'>
				<h1>CRUD desde 0</h1>

				<div className='flex-row '>
					<div className='flex-large mt-4 '>
						<Form />
					</div>
					<div className='flex-large mt-4'>
						<List />
					</div>
				</div>
			</div>
		</StoreProvider>
	);
}

export default App;
