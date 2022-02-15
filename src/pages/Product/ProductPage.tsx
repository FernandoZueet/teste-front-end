import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getMenuProducts, TCategory, TProduct } from '../../api';
import { Header } from '../../components/Header';
import { MenuCategories } from './MenuCategories';
import { ProductCard } from './ProductCard';

export function ProductPage() {
	const location = useLocation();
	const { category } = useParams();
	const [menus, setMenus] = useState<TCategory[]>([]);
	const [products, setProducts] = useState<TProduct[]>([]);
	const [inputSearch, setInputSearch] = useState<string>('');
	const [orderList, setOrderList] = useState<string>('');

	window.document.title = `${category} - Anota ai`;

	/**
	 * Get Products and category API
	 */
	useEffect(() => {
		async function getProd() {
			const result = await getMenuProducts();
			setMenus(
				result.map((item) => {
					return { category_title: item.category_title };
				})
			);
			result.forEach((item) => {
				if (item.category_title === category) {
					setProducts([...item.products]);
				}
			});
		}
		getProd();
	}, [location]);

	/**
	 * Search products by title or description
	 */
	function filterSearch(): TProduct[] {
		return products.filter(
			(product) =>
				product.title.toLowerCase().includes(inputSearch) ||
				product.description.toLowerCase().includes(inputSearch) ||
				inputSearch === ''
		);
	}

	/**
	 * Sort by title or price asc or desc
	 */
	function sortBy(value: string) {
		setOrderList(value);
		if (value == 'product-asc') {
			setProducts(products.sort((a, b) => (a.title > b.title ? 1 : -1)));
		}
		if (value == 'product-desc') {
			setProducts(products.sort((a, b) => (a.title < b.title ? 1 : -1)));
		}
		if (value == 'price-asc') {
			setProducts(products.sort((a, b) => (a.price < b.price ? 1 : -1)));
		}
		if (value == 'price-desc') {
			setProducts(products.sort((a, b) => (a.price > b.price ? 1 : -1)));
		}
	}

	/**
	 * Delete product array
	 */
	function deleteProduct(position: number) {
		setProducts(products.filter((item, index) => index !== position));
	}

	return (
		<>
			<Header />
			<div className="container">
				<div className="row">
					<div className="col-10 col-lg-2 mb-4">
						<MenuCategories menus={menus} />
					</div>

					<div className="col-10">
						<div className="mb-2 d-flex justify-content-between">
							<h2>{category}</h2>
							<div className="d-flex mb-3">
								<input
									type="input"
									name="search-form"
									className="form-control"
									placeholder={`Pesquisar por ${category}`}
									value={inputSearch}
									onChange={(e) => setInputSearch(e.target.value)}
								/>
								<select
									className="form-control"
									onChange={(e) => sortBy(e.target.value)}
									value={orderList}
								>
									<option value="">Ordenar por</option>
									<option value="product-asc">Produto A a Z</option>
									<option value="product-desc">Produto Z a A</option>
									<option value="price-asc">Maior preço</option>
									<option value="price-desc">Menor preço</option>
								</select>
							</div>
						</div>
						<div className="row">
							{filterSearch().map((product, i) => (
								<div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3  mb-5">
									<ProductCard actionDelete={deleteProduct} product={product} position={i} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
