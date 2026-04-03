"use client";

import { useState } from "react";
import { useAddExpense } from "../hooks/use-add-expense";
import { TransactionSource, TRANSACTION_SOURCES } from "@gugolko/shared";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/shared/components/ui/field";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";

export default function AddExpenseForm() {
    const { submit, loading } = useAddExpense();

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [source, setSource] = useState<TransactionSource | string>("");



    const handleChange = (value: string | null) => {
        if (!value) return
        setSource(value as TransactionSource)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!amount || !source) return;

        console.log("handleSubmit: Source", {
            amount: Number(amount),
            note,
            source: source?.toLowerCase() as TransactionSource,
            date: Date.now(),
        })

        await submit({
            amount: Number(amount),
            note,
            source: source?.toLowerCase() as TransactionSource ?? TRANSACTION_SOURCES.cash, // "default to cash"
            date: Date.now(),
        });

        // reset
        setAmount("");
        setNote("");
    };

    return (
        <Card className="w-2xl">
            <CardHeader>
                <CardTitle>Add Expense</CardTitle>
                <CardDescription>
                    Add a new expense to your transaction history.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                    <FieldGroup>


                        <FieldSet>

                            <FieldLegend>Add Expense</FieldLegend>
                            <FieldDescription>
                                All transactions are secure and encrypted
                            </FieldDescription>

                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Amount</FieldLabel>
                                    <Input
                                        type="string"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <FieldDescription className="text-xs">
                                        Enter the amount for this expense.
                                    </FieldDescription>
                                </Field>


                                <Field className="w-full max-w-xs">
                                    <FieldLabel>Source</FieldLabel>
                                    <Select value={source} onValueChange={handleChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose source" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(TRANSACTION_SOURCES).map((source) => (
                                                    <SelectItem key={source} value={source.charAt(0).toUpperCase() + source.slice(1)}>
                                                        {source.charAt(0).toUpperCase() + source.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription className="text-xs">
                                        Select the source of this expense.
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel>Note</FieldLabel>
                                    <Textarea
                                        placeholder="Note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        rows={3}
                                        cols={4}
                                    />
                                    <FieldDescription className="text-xs">
                                        Additional details for this transaction (Optional)
                                    </FieldDescription>
                                </Field>

                            </FieldGroup>


                        </FieldSet>

                        <Field orientation="horizontal">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Add Expense"}
                            </Button>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>



            </CardContent>
        </Card>

    );
}