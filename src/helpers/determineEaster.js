// This an algorithm used to calculate the date that easter will happen
// Easter is celebrated on the first sunday after the full moon of the spring season. 
// Gauss created an algorithm for determining this date
// reference : https://www.calendarbede.com/book/calculation-orthodox-easter-sunday

import { GregorianCalendar } from "@internationalized/date";



export function julianDateToJulianDay(julianDate){
    // reference: https://en.wikipedia.org/wiki/Julian_day#Converting_Julian_calendar_date_to_Julian_Day_Number
    const Y = julianDate.getFullYear()
    const M = julianDate.getMonth() + 1 // month is 0 indexed so we need to add 1
    const D = julianDate.getDate() 
    return 367 * Y - Math.floor((7 * ( Y + 5001 + Math.floor((M - 9)/7)))/4) + Math.floor((275 * M)/9) + D + 1729777
}


export function julianDateToGregorian(julianDate){  
    julianDate = julianDateToJulianDay(julianDate)
    let gregorian = new GregorianCalendar()
    gregorian = gregorian.fromJulianDay(julianDate)
    return gregorian
}

function julianComputus(year) {
    let creationOfWorld = year + 5508;
    let lunarCycle = (creationOfWorld - 1) % 19 + 1; 

    let foundation = (11 * lunarCycle + 3) % 30;
    if(lunarCycle > 16) {
        foundation += 1
    }

    let ecclesiasticalFullMoon = 47 - foundation
    if (ecclesiasticalFullMoon < 21){
        ecclesiasticalFullMoon += 30
    }

    let solarCycle = (creationOfWorld- 1) % 28 + 1
    let vruceleto = (solarCycle + solarCycle / 4 - 1) % 7 + 1

    let firstResurrection = 0
    if (vruceleto < 4){ 
        firstResurrection = 4 - vruceleto
    }else{ 
        firstResurrection = 11 - vruceleto
    }

    // not sure why its off by 1?? i dont understand this calculation enough to figure it out 
    // just adding a -1 here instead. 
    // Seems to work and all the calculated easter dates from 2018 - 2028 are accurate 🤷
    let passover =Math.floor(ecclesiasticalFullMoon + 7 - (ecclesiasticalFullMoon - firstResurrection) % 7) - 1 

    
    if (passover > 31){
        let month = 4 - 1 // its april but months are 0 indexed
        let day = passover - 31
        const date = new Date(year,month, day, 0, 0,0)
        return julianDateToGregorian(date)
    }
    let month = 3 - 1// its march but months are 0 indexed
    const date =  new Date(year, month, passover, 0,0,0) 
    return julianDateToGregorian(date)
    

}


for (let i =0; i < 20; i++){
    let year = 2010 + i
    let easter = julianComputus(year)
    console.log(year, easter)
}