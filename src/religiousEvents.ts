import { ReligiousEvent } from "./types";

const religiousEvents: ReligiousEvent[] = [
    // Fasts with their associated feasts
    {
        id: 'hudade',
        name: { am: 'ሁዳዴ', en: 'Lent (Great Fast)' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -55,
        duration: 54,
        color: 'rgba(156, 39, 176, 0.35)', // Bright purple
    },
    {
        id: 'tsom_nehase',
        name: { am: 'ጾመ ነሐሴ', en: 'Fast of Assumption' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 8,
        day: 1,
        duration: 15,
        color: 'rgba(3, 169, 244, 0.35)', // Bright sky blue
    },
    {
        id: 'tsom_advent',
        name: { am: 'ጾመ ልደት', en: 'Advent Fast' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 11,
        day: 25,
        duration: 43,
        color: 'rgba(233, 30, 99, 0.35)', // Bright pink
    },
    {
        id: 'tsom_apostles',
        name: { am: 'ጾመ ሐዋርያት', en: 'Fast of the Apostles' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: 36,
        duration: 10,
        color: 'rgba(255, 152, 0, 0.35)', // Bright orange
    },
    {
        id: 'tsom_nineveh',
        name: { am: 'ጾመ ኒኒዌ', en: 'Fast of Nineveh' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -69,
        duration: 2,
        color: 'rgba(244, 67, 54, 0.35)', // Bright red
    },
    {
        id: 'weekly_fast',
        name: { am: 'ሳምንታዊ ጾም', en: 'Weekly Fast' },
        eventType: 'fast',
        dateType: 'weekly',
        weekDays: [3, 5], // Wednesday and Friday
        color: 'rgba(0, 188, 212, 0.35)', // Bright cyan
    },

    // Standalone feasts (not preceded by fasts)
    {
        id: 'easter',
        name: { am: 'ፋሲካ', en: 'Easter (Fasika)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 0,
        color: 'rgba(255, 235, 59, 0.45)', // Bright golden yellow
        
    },
    {
            id: 'assumption',
            name: { am: 'ፍልሰታ', en: 'Assumption of Mary' },
            eventType: 'feast',
            dateType: 'fixed',
            month: 8,
            day: 22,
            color: 'rgba(103, 58, 183, 0.40)', // Bright deep purple
        },
    {
            id: 'apostles_feast',
            name: { am: 'በዓለ ሐዋርያት', en: 'Feast of the Apostles' },
            eventType: 'feast',
            dateType: 'fixed',
            month: 7,
            day: 12,
            color: 'rgba(255, 64, 129, 0.40)', // Bright rose
        },
    {
        id: 'epiphany',
        name: { am: 'ጥምቀት', en: 'Epiphany (Timkat)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 19,
        color: 'rgba(0, 150, 136, 0.40)', // Bright teal
    },
    {
        id: 'finding_cross',
        name: { am: 'መስቀል', en: 'Finding of the True Cross (Meskel)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 9,
        day: 27,
        color: 'rgba(255, 87, 34, 0.40)', // Bright deep orange
    },
    {
        id: 'palm_sunday',
        name: { am: 'ሆሣና', en: 'Palm Sunday (Hosanna)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: -7,
        color: 'rgba(76, 175, 80, 0.40)', // Bright green
    },
    {
        id: 'ascension',
        name: { am: 'ዕርገት', en: 'Ascension' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 39,
        color: 'rgba(171, 71, 188, 0.40)', // Bright lavender
    },
    {
        id: 'pentecost',
        name: { am: 'ጵንጤቆስጤ', en: 'Pentecost' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 49,
        color: 'rgba(255, 61, 0, 0.40)', // Bright red-orange
    },
    {
        id: 'transfiguration',
        name: { am: 'ቡሄ', en: 'Transfiguration' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 8,
        day: 13,
        color: 'rgba(255, 193, 7, 0.40)', // Bright amber
    },
    {
        id: 'nativity_mary',
        name: { am: 'ልደተ ማርያም', en: 'Nativity of Mary' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 5,
        day: 9,
        color: 'rgba(63, 81, 181, 0.40)', // Bright indigo
    },
    {
        id: 'covenant_mercy',
        name: { am: 'ኪዳነ ምሕረት', en: 'Covenant of Mercy' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 2,
        day: 16,
        color: 'rgba(255, 105, 180, 0.40)', // Bright hot pink
    },
    {
        id: 'annunciation',
        name: { am: 'ብስራተ ገብርኤል', en: 'Annunciation' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 4,
        day: 7,
        color: 'rgba(41, 182, 246, 0.40)', // Bright light blue
    },
    {
        id: 'christmas',
        name: { am: 'ልደት - ገና', en: 'Christmas (Genna)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 7,
        color: 'rgba(139, 195, 74, 0.40)', // Bright light green
    }
];

export default religiousEvents;