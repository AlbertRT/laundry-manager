import { Textarea } from "@/components/ui/textarea";
import { User, Mail, BookUser, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function CustomerData() {
	return (
		<div className="grid gap-2">
			<span className={"text-muted-foreground text-xs font-bold"}>
				Customer Data
			</span>
			<Separator />
			<div className={"grid grid-cols-2 gap-4"}>
				<div className={"space-y-2"}>
					<Label
						htmlFor={"customerName"}
						className={
							"flex items-center text-muted-foreground text-xs font-bold"
						}
					>
						<User className={"w-4 h-4 mr-2"} />
						Customer Name
					</Label>
					<Input
						type={"text"}
						id={"customerName"}
						autoComplete={"off"}
						name={"customerName"}
					/>
				</div>
				<div className={"space-y-2"}>
					<Label
						htmlFor={"email"}
						className={
							"flex items-center text-muted-foreground text-xs font-bold"
						}
					>
						<Mail className={"w-4 h-4 mr-2"} />
						Email
					</Label>
					<Input
						type={"email"}
						id={"email"}
						name={"email"}
						autoComplete={"off"}
					/>
				</div>
				<div className={"space-y-2 col-span-2"}>
					<Label
						htmlFor={"address"}
						className={
							"flex items-center text-muted-foreground text-xs font-bold"
						}
					>
						<BookUser className={"w-4 h-4 mr-2"} />
						Address
					</Label>
					<Textarea
						id={"address"}
						autoComplete={"off"}
						name={"address"}
						className={"resize-none h-auto"}
					/>
				</div>
				<div className={"space-y-2 col-span-2"}>
					<Label
						htmlFor={"phone"}
						className={
							"flex items-center text-muted-foreground text-xs font-bold"
						}
					>
						<Phone className={"w-4 h-4 mr-2"} />
						Phone Number
					</Label>
					<Input
						type={"text"}
						id={"phone"}
						name={"phone"}
						autoComplete={"off"}
					/>
				</div>
			</div>
		</div>
	);
}
