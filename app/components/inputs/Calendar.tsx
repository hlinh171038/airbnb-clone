"use client"

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
    value: Range;
    onChange: (value:RangeKeyDict) =>void;
    disabledDates?: Date[]
}

const Calendar:React.FC<CalendarProps> =({
    value,
    onChange,
    disabledDates
}) =>{
    return (
        <DateRange 
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
            rangeColors={["#262626"]}
        />
    )
}

export default Calendar