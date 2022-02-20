import React, { useContext, useRef, useState } from 'react';
import StoreContext from '../context/store/storeContext';

function Form() {
	const formRef = useRef(null);
	const { item: actualItem, addItem, updateItem } = useContext(StoreContext);
	const [modifiedName, setModifiedName] = useState('');

	const onAdd = (ev) => {
		ev.preventDefault();
		if (modifiedName === '') return;

    const request ={
			name: modifiedName,
			completed: false,
		}
    console.log(request)
		addItem(request);

		setModifiedName('');
		formRef.current.reset();
	};

	const onEdit = (ev) => {
		ev.preventDefault();
		if (modifiedName === '') return;

		updateItem(actualItem.id, {
			name: modifiedName,
			completed: actualItem.completed,
		});

		setModifiedName('');
		formRef.current.reset();
	};

	return (
		<form ref={formRef} className='w-50 m-auto'>
			<div className='row my-2'>
				<div className='col-8'>
					<input
						type='text'
						name='name'
						placeholder='TODO name'
						defaultValue={actualItem.name}
						className='form-control'
						onChange={(ev) =>
							setModifiedName(ev.target.value)
						}
					/>{' '}
				</div>
				<div className='col-4'>
					{actualItem.id ? (
						<button className='btn btn-success form-control' onClick={onEdit}>
							Actualizar
						</button>
					) : (
						<button className='btn btn-primary form-control' onClick={onAdd}>
							Agregar
						</button>
					)}
				</div>
			</div>
		</form>
	);
}

export default Form;
