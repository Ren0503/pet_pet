export interface Cart {
	product: string;
	name: string;
	image: string;
	price: number;
	countInStock: number;
	quantity: number;
}

export interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

export interface Order {
	orderItems: Cart[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
}