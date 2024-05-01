import type {
	TableBody,
	TableData,
	TableHead,
	TableHeader,
	TableProps,
	TableRow,
} from "@/types/types";
import clsx from "clsx";

export function Table({ children, ...props }: TableProps) {
	return (
		<div className="align-middle">
			<div className="rounded border overflow-hidden min-w-full">
				<table {...props} className="table w-full">
					{children}
				</table>
			</div>
		</div>
	);
}

export function TableHeader({ children, ...props }: TableHeader) {
	return (
		<thead {...props} className="bg-gray-100">
			{children}
		</thead>
	);
}
export function TableHead({ children, ...props }: TableHead) {
	return (
		<th
			{...props}
			className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
		>
			{children}
		</th>
	);
}

export function TableRow({ children, ...props }: TableRow) {
	return <tr {...props}>{children}</tr>;
}
export function TableBody({ children, ...props }: TableBody) {
	return (
		<tbody className="divide-y divide-gray-200" {...props}>
			{children}
		</tbody>
	);
}
export function TableData({ children, ...props }: TableData) {
	return (
		<td
			className="p-3 whitespace-nowrap text-sm font-medium text-gray-800"
			{...props}
		>
			{children}
		</td>
	);
}
