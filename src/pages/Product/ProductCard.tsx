import { TProduct } from '../../api';

type TProductProps = {
	product: TProduct;
	actionDelete: Function;
	position: number;
};

export function ProductCard({ product, actionDelete, position }: TProductProps) {
	return (
		<div className="card">
			<a href={product.picture} target="_blank" title="Abrir imagem (Nova aba)">
				<img src={product.thumbnail} className="card-img-top" alt={product.title} />
			</a>
			<div className="card-body">
				<h5 className="card-title">{product.title}</h5>
				<p className="card-text">{product.description}</p>
				<p>
					<i>R$ {product.price}</i>
				</p>
				<a className="text-center text-danger" href="#" onClick={() => actionDelete(position)}>
					Excluir
				</a>
			</div>
		</div>
	);
}
