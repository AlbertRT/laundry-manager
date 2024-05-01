import React from "react";

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
	keybinds?: string;
};

export interface TableProps extends React.ComponentPropsWithRef<"table"> {
	children?: React.ReactNode;
}
export interface TableHeader extends React.ComponentPropsWithRef<"thead"> {
	children?: React.ReactNode;
}
export interface TableHead extends React.ComponentPropsWithRef<"th"> {
	children?: React.ReactNode;
}
export interface TableRow extends React.ComponentPropsWithRef<"tr"> {
	children?: React.ReactNode;
}
export interface TableBody extends React.ComponentPropsWithRef<"tbody"> {
	children?: React.ReactNode;
}
export interface TableData extends React.ComponentPropsWithRef<"td"> {
	children?: React.ReactNode;
}
