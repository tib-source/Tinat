export function getAllDaysInCurrentWeek() : Date[] {
    const today = new Date();
    const thisWeek = [];
    const numberDays = [1, 2, 3, 4, 5, 6, 7];
    for (let count of numberDays) {
        const diff = count - today.getDay();
        const date = today.getDate() + diff;
        let day = new Date(
            Date.UTC(today.getFullYear(), today.getMonth(), date)
        );
        thisWeek.push(day);
    }

    return thisWeek
}
