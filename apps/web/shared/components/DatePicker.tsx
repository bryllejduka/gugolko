"use client"

import { useState, useId } from "react"
import { format } from "date-fns"
import { Field, FieldLabel } from "./ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"


type DatePickerProps = {
    value?: Date
    defaultValue?: Date
    onChange?: (date?: Date) => void
    label?: string
    placeholder?: string
}


export function DatePicker(props: DatePickerProps) {
    const {
        value,
        defaultValue,
        onChange,
        label = "Date",
        placeholder = "Pick a date",
    } = props
    const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue)
    const id = useId();


    const isControlled = "value" in props
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
