import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'src/components/Button/Button';

const NotFound = () => {
	const history = useHistory();

	return (
		<section className='not-found-container router-min-full-height'>
			<div className='container'>
				<div className='row py-5'>
					<div className='col-12 text-center'>
						<img
							className='mb-5'
							src='https://static.thenounproject.com/png/98571-200.png'
							alt='404'
						/>
						<h1 style={{ fontSize: '7rem' }}>
							<strong>404</strong>
						</h1>
						<span className='lead-color'>
							O recurso procurado ainda está em construção ou não foi encontrado
						</span>
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-12 col-md-4 col-lg-3'>
						<Button variant='primary' onClick={() => history.push('/login')}>
							Voltar para o início
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
