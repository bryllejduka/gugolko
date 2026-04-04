"use client";

import { useEffect, useState, useId } from "react";
import { transactionRepo } from "../transactions.repo";

import type {
    CreateTransactionInput,
} from "@gugolko/shared/src/dto";

import { useUIStore } from "@/store/ui";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react"
import { TRANSACTION_TYPES, TransactionType } from "@gugolko/shared/src/types";
import { cn } from "@/shared/utils/cn";
import { DatePicker } from "@/shared/components/DatePicker";
import { Textarea } from "@/shared/components/ui/textarea";

export function AddTransactionForm() {
    const budgetId = useUIStore((s) => s.selectedBudgetId);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState<TransactionType>("expense");
    const [note, setNote] = useState("");
    const [date, setDate] = useState<Date | undefined>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const titleId = useId();
    const amountId = useId();
    const noteId = useId();

    const setBudget = useUIStore((s) => s.setSelectedBudgetId);

    useEffect(() => {
        setBudget("budget-123");
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!budgetId) {
            alert("No budget selected");
            return;
        }

        if (!amount || isNaN(Number(amount))) {
            alert("Invalid amount");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: CreateTransactionInput = {
                title,
                amount: Number(amount),
                type,
                note: note || undefined,
                date: date?.getTime() ?? Date.now(),
                budgetId,
            };

            await transactionRepo.create(payload);

            // Reset form
            setTitle("");
            setAmount("");
            setNote("");
            setType("expense");
            setDate(new Date());
        } catch (err) {
            console.error(err);
            alert("Failed to add transaction");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (

        <Dialog>
            <form>
                <DialogTrigger render={<Button variant="outline">Add Transaction</Button>} />
                <DialogContent className={cn("sm:max-w-sm", type === TRANSACTION_TYPES.income ? "bg-accent" : "bg-muted")}>
                    <DialogHeader>
                        <DialogTitle>Add Transaction</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the new transaction.
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="expense" className="w-full" onValueChange={(value) => setType(value as TransactionType)}>
                        <TabsList variant="line" className="w-full justify-start border-b">
                            <TabsTrigger value="income">
                                <BanknoteArrowUp />
                                Income
                            </TabsTrigger>
                            <TabsTrigger value="expense">
                                <BanknoteArrowDown />
                                Expense
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <FieldGroup>

                        <Field>
                            <Label htmlFor={amountId}>Amount</Label>
                            <Input id={amountId} name="amount" type="number" placeholder="100.00" value={amount} className="no-spinner" onChange={(e) => setAmount(e.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor={titleId}>Name</Label>
                            <Input id={titleId} name="name" placeholder={type === "income" ? "Salary..." : "Groceries..."} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Field>
                        <DatePicker defaultValue={date} value={date} onChange={setDate} />
                        <Field>
                            <Label htmlFor={noteId}>Note</Label>
                            <Textarea id={noteId} name="note" rows={4} placeholder="Additional details (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
                            <FieldDescription>
                                Add any extra details about this transaction.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit" variant={"default"} disabled={isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? "Adding..." : "Add Transaction"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>


        // <form onSubmit={handleSubmit} className="space-y-3">

        //     {/* Title */}
        //     <input
        //         type="text"
        //         placeholder="Title"
        //         value={title}
        //         onChange={(e) => setTitle(e.target.value)}
        //         className="w-full border p-2 rounded"
        //         required
        //     />
        //     {/* Amount */}
        //     <input
        //         type="number"
        //         placeholder="Amount"
        //         value={amount}
        //         onChange={(e) => setAmount(e.target.value)}
        //         className="w-full border p-2 rounded"
        //         required
        //     />
        //     {/* Amount */}
        //     <input
        //         type="number"
        //         placeholder="Amount"
        //         value={amount}
        //         onChange={(e) => setAmount(e.target.value)}
        //         className="w-full border p-2 rounded"
        //         required
        //     />

        //     {/* Type */}
        //     <select
        //         value={type}
        //         onChange={(e) =>
        //             setType(e.target.value as "expense" | "income")
        //         }
        //         className="w-full border p-2 rounded"
        //     >
        //         <option value="expense">Expense</option>
        //         <option value="income">Income</option>
        //     </select>

        //     {/* Note */}
        //     <input
        //         type="text"
        //         placeholder="Note (optional)"
        //         value={note}
        //         onChange={(e) => setNote(e.target.value)}
        //         className="w-full border p-2 rounded"
        //     />

        //     {/* Date */}
        //     <input
        //         type="date"
        //         value={date}
        //         onChange={(e) => setDate(e.target.value)}
        //         className="w-full border p-2 rounded"
        //     />

        //     {/* Submit */}
        //     <button
        //         type="submit"
        //         disabled={isSubmitting}
        //         className="w-full bg-black text-white p-2 rounded"
        //     >
        //         {isSubmitting ? "Adding..." : "Add Transaction"}
        //     </button>
        // </form>
    );
}