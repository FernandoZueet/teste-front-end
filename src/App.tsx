import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { ProductPage } from './pages/Product/ProductPage';

export function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/category/:category" element={<ProductPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}
