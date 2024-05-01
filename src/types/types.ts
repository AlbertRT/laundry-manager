export type LaundryService = {
	id: string;
	name: string;
	price: number;
	unit?: string | null;
};

export type PaymentMethod = {
	id: string;
	name: string;
	provider: string;
};

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	children?: React.ReactNode;
	loading?: boolean;
	loadingPlaceholder?: string;
	isIcon?: boolean;
}

export type KbdProps = {
	children: React.ReactNode;
};
