import React from "react";
import { useInputStore, useToggleStore } from "../../config/stores";

export const emailRgex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRgex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

type RequiredTextInput = {
    label: string;
    name: string;
    error?: string | null;
    type?: string | null;
};
export const RequiredTextInput = ({ label, name, error, type }: RequiredTextInput) => {
    const { inputs, setInput } = useInputStore();
    return (
        <div className=" flex flex-col gap-1 w-full">
            <label htmlFor={name}>
                {label} <b className="text-red-600">*</b>
            </label>
            <input
                required
                id={name}
                name={name}
                onChange={(e) => setInput(name, e.target.value)}
                value={inputs[name] ?? ""}
                type={type || "text"}
                className="focus:ring-0 text-sm bg-dark-3 px-3 focus:outline-0 h-10"
            />
            {error && <span className="text-red-600 text-xs">{error}</span>}
        </div>
    );
};

interface DateParam {
    label: string;
    name: string;
}

export const CustomDateSelector = ({ label, name }: DateParam) => {
    const { inputs, setInput } = useInputStore();
    const { toggles, setToggles } = useToggleStore();

    const [date, setDate] = React.useState({
        day: "D",
        month: "M",
        year: "Year",
    });
    React.useEffect(() => {
        setToggles("showYear", false);
        setToggles("showMonth", false);
        setToggles("showDay", false);
    }, []);
    React.useEffect(() => {
        setInput(name, `${date.day}-${date.month}-${date.year}`);
    }, [date]);

    const selectDate = (name: string, val: number) => {
        const showName = `show${name.charAt(0).toUpperCase() + name.slice(1)}`;
        setDate({ ...date, [name]: val });
        setToggles(showName, false);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>
                {label} <b className="text-red-600">*</b>
            </label>
            <div className="flex w-full gap-1 h-10">
                <div
                    onClick={() => setToggles("showYear", !toggles.showYear)}
                    className="w-16 h-8 bg-dark-3 px-3 py-2 cursor-pointer relative">
                    <span>{date.year}</span>
                    <div
                        className={`${
                            inputs.showYear ? "block" : "hidden"
                        } absolute w-16 left-0 mb-9 -bottom-0 max-h-64 bg-dark-input overflow-y-auto`}>
                        {Array.from({ length: 124 }, (_, i) => i + 1900).map((year) => (
                            <div
                                key={year}
                                className={`text-sm px-3 py-2 hover:bg-grey-hover ${inputs[name] === year ? "bg-grey-hover" : ""}`}
                                onClick={() => selectDate("year", year)}>
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
                <span className="text-3xl">/</span>
                <div
                    onClick={() => {
                        setToggles("showMonth", !toggles.showMonth);
                    }}
                    className="w-10 h-8 bg-dark-3 px-3 py-2 cursor-pointer relative">
                    <span>{date.month}</span>
                    <div
                        className={`
                        ${
                            inputs.showMonth ? "block" : "hidden"
                        } absolute w-10 left-0 mb-9 -bottom-0 max-h-64 bg-dark-input overflow-y-auto overflow-x-hidden`}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <div
                                key={month}
                                className={`text-sm px-3 py-2 hover:bg-grey-hover ${inputs[name] === month ? "bg-grey-hover" : ""}`}
                                onClick={() => selectDate("month", month)}>
                                {month}
                            </div>
                        ))}
                    </div>
                </div>
                <span className="text-3xl">/</span>
                <div
                    onClick={() => setToggles("showDay", !toggles.showDay)}
                    className="w-10 h-8 bg-dark-3 px-3 py-2 cursor-pointer relative">
                    <span>{date.day}</span>
                    <div
                        className={`${
                            inputs.showDay ? "block" : "hidden"
                        } absolute w-10 left-0 mb-9 -bottom-0 max-h-64 bg-dark-input overflow-y-auto`}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <div
                                key={day}
                                className={`text-sm px-3 py-2 hover:bg-grey-hover ${inputs[name] === day ? "bg-grey-hover" : ""}`}
                                onClick={() => selectDate("day", day)}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
