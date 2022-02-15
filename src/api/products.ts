import axios, { AxiosResponse } from 'axios';

export type TProduct = {
	id: number;
	title: string;
	description: string;
	price: number;
	picture: string;
	thumbnail: string;
};

export type TCategory = {
	category_title: string;
};

export type TGetMenuProductsAPI = {
	category_title: string;
	products: TProduct[];
};

export const getMenuProducts = async (): Promise<TGetMenuProductsAPI[]> => {
	const res = await axios.get<{}, AxiosResponse<TGetMenuProductsAPI[]>>(
		'https://front-end-test-app.s3.amazonaws.com/menu.json'
	);
	return res.data;
};
