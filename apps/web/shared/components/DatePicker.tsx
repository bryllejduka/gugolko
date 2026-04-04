"use client"

import { useState, useId } from "react"
import { format } from "date-fns"
import { Field, FieldLabel } from "./ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"


type DatePickerProps = {
    value?: Date
    onChange?: (date?: Date) => void
    label?: string
    placeholder?: string
}


export function DatePicker({
    value,
    onChange,
    label = "Date",
    placeholder = "Pick a date",
}: DatePickerProps) {
    const [internalDate, setInternalDate] = useState<Date | undefined>(value)
    const id = useId();


    const isControlled = value !== undefined
    const selectedDate = isControlled ? value : internalDate

    const handleSelect = (date?: Date) => {
        if (!isControlled) {
            setInternalDate(date)
        }
        onChange?.(date)
    }

    return (
        <Field className="mx-auto w-full">
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <Popover>
                <PopoverTrigger render={<Button variant="outline" id={id} className="justify-start font-normal">{selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}</Button>} />
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleSelect}
                        defaultMonth={selectedDate}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}
