import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMenuProducts, TCategory } from '../../api';
import { Header } from '../../components/Header';
import { MenuCategories } from '../Product/MenuCategories';

export function HomePage() {
	const location = useLocation();
	const [menus, setMenus] = useState<TCategory[]>([]);

	window.document.title = `Anota ai`;

	/**
	 * Get categorys API
	 */
	useEffect(() => {
		async function getProd() {
			const result = await getMenuProducts();
			setMenus(
				result.map((item) => {
					return { category_title: item.category_title };
				})
			);
		}
		getProd();
	}, [location]);

	return (
		<>
			<Header />
			<div className="container">
				<h4 className="mb-3">Escolha uma categoria</h4>
				<MenuCategories menus={menus} />
			</div>
		</>
	);
}
