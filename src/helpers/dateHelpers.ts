export function getAllDaysInCurrentWeek() : Date[] {
    const today = getToday();
    const thisWeek: Date[] = [];
    const numberDays = [1,2,3,4,5,6,7]

    for (let count of numberDays) {
        const diff = count - today.getDay();
        let day = new Date(today);
        day.setHours(1,0,0,0)
        day.setDate(today.getDate() + diff);
        thisWeek.push(day);
    }

    return thisWeek
}



export function getToday(): Date {
    const today = new Date(); 
    today.setHours(1,0,0,0)

    return today
}