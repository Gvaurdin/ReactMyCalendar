import { useState } from "react";

const Calendar = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    }

    const getStartDayInMonth = (year, month) => {
        const day = new Date(year, month - 1, 1).getDay();
        return day === 0 ? 6 : day - 1;
    }

    const getDayByClick = (day) => {
        const maxDays = getDaysInMonth(year, month);
        if (day >= 0 && day <= maxDays) {
            const dayOfWeek = new Date(year, month - 1, day).toLocaleString('ru-RU', { weekday: 'long' });
            setSelectedDay(day);
            setSelectedDayOfWeek(dayOfWeek);
        } else {
            console.warn('Выбранный день вне диапазона.', day);
        }
    }

    const handleBackgroundClick = (e) => {
        if (!e.target.closest('.day-cell')) {
            setSelectedDay(null);
            setSelectedDayOfWeek(null);
        }
    };
    const renderCalendar = (year, month) => {
        const daysInMonth = getDaysInMonth(year, month);
        const startDay = getStartDayInMonth(year, month);
        const weeks = [];
        let day = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startDay) {
                    week.push(<td key={`${i}-${j}-${day}`}></td>);
                } else if (day > daysInMonth) {
                    week.push(<td key={`${i}-${j}-${day}`}></td>);
                } else {
                    const currentDay = day;
                    week.push(
                        <td key={`${i}-${j}-${day}`}
                            onClick={() => {
                                getDayByClick(currentDay)
                            }}
                            className={`day-cell ${selectedDay === day ? 'selected-day' : ''}`}
                        >
                            {day}
                        </td>
                    );
                    day++;
                }
            }
            weeks.push(<tr key={i}>{week}</tr>);
        }
        return weeks;
    };

    const handleYearChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1900 && value <= 2100) {
            setYear(value);
        }
    };

    const handleMonthChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 12) {
            setMonth(value);
        }
    };

    return <>
        <div className="todo-container" onClick={handleBackgroundClick}>
            <h2>Календарь</h2>
            <input
                type="number"
                value={year}
                onChange={handleYearChange}
                min="1900"
                max="2100"
            />

            <input
                type="number"
                value={month}
                onChange={handleMonthChange}
                min="1"
                max="12"
            />
            {selectedDay && selectedDayOfWeek && (
                <h3>Вы выбрали {selectedDayOfWeek}: {selectedDay}</h3>
            )}
            <table>
                <thead>
                    <tr>
                        <th>Пн</th>
                        <th>Вт</th>
                        <th>Ср</th>
                        <th>Чт</th>
                        <th>Пт</th>
                        <th>Сб</th>
                        <th>Вс</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCalendar(year, month)}
                </tbody>
            </table>
        </div>
    </>
}

export default Calendar;