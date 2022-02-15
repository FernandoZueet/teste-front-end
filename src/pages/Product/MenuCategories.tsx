import { Link } from 'react-router-dom';
import { TCategory } from '../../api';

type TMenuCategoriesProps = {
	menus: TCategory[];
};

export function MenuCategories({ menus }: TMenuCategoriesProps) {
	return (
		<>
			<ul className="list-group">
				{menus.map((menu, i) => (
					<li key={menu.category_title + i} className="list-group-item">
						<Link to={{ pathname: '/category/' + menu.category_title }}>{menu.category_title}</Link>
					</li>
				))}
			</ul>
		</>
	);
}
