import Image from "next/image";
import { BookUser, MoreHorizontal } from "lucide-react";
import { getCustomersDetail } from "@/actions/customers/customers.action";

export default async function page() {
	const customers = await getCustomersDetail();

	return (
		<div className="px-8">
			{/* <Card>
				<CardHeader>
					<CardTitle>Customers</CardTitle>
					<CardDescription>
						Manage your customers and view their sales performance.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead className="hidden md:table-cell">
									Phone
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Total Order
								</TableHead>
								<TableHead className="hidden md:table-cell">
									Address
								</TableHead>
								<TableHead>
									<span className="sr-only">Actions</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{customers.map((customer) => (
								<TableRow key={customer.id}>
									<TableCell className="font-medium">
										{customer.fullname}
									</TableCell>
									<TableCell>{customer.email}</TableCell>
									<TableCell className="hidden md:table-cell">
										{customer.phone}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										{customer._count.orders}
									</TableCell>
									<TableCell className="hidden md:table-cell">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													<BookUser
														className={"w-4 h-4"}
													/>
												</TooltipTrigger>
												<TooltipContent>
													<span className="text-sm">
														{customer.address}
													</span>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">
														Toggle menu
													</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>
													Actions
												</DropdownMenuLabel>
												<DropdownMenuItem>
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter></CardFooter>
			</Card> */}
		</div>
	);
}
