import { Header } from '../../components/Header';
import { useLocation } from 'react-router-dom';

export function NotFoundPage() {
	let location = useLocation();

	window.document.title = `Página não encontrada! - Anota ai`;

	return (
		<>
			<Header />
			<main className="container">
				<div className="bg-light p-5 rounded mt-3 text-center">
					<h1>NOT FOUND!!</h1>
					<p className="lead">
						A página <strong>{location.pathname}</strong> não foi encontrada!
					</p>
				</div>
			</main>
		</>
	);
}
