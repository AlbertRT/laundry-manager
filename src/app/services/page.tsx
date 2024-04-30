import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import React from "react";

export default function page() {
	return (
		<div className="px-8">
			<Card>
				<CardHeader>
					<CardTitle>Services</CardTitle>
					<CardDescription>Manage your Services.</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead className="hidden md:table-cell">
									Price
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Unit
								</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody></TableBody>
					</Table>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);
}
