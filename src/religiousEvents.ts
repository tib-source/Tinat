import { ReligiousEvent } from "./types";

const religiousEvents: ReligiousEvent[] = [
    // Fasts with their associated feasts
    {
        id: 'hudade',
        name: { am: 'ሁዳዴ', en: 'Lent (Great Fast)' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -55,
        duration: 55,
        color: 'rgba(139, 69, 19, 0.15)', // Light brown
    },
    {
        id: 'tsom_nehase',
        name: { am: 'ጾመ ነሐሴ', en: 'Fast of Assumption' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 8,
        day: 1,
        duration: 15,
        color: 'rgba(70, 130, 180, 0.15)', // Light steel blue
    },
    {
        id: 'tsom_advent',
        name: { am: 'ጾመ ልደት', en: 'Advent Fast' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 11,
        day: 25,
        duration: 43,
        color: 'rgba(128, 0, 128, 0.15)', // Light purple
    },
    {
        id: 'tsom_apostles',
        name: { am: 'ጾመ ሐዋርያት', en: 'Fast of the Apostles' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: 36,
        duration: 10,
        color: 'rgba(255, 140, 0, 0.15)', // Light orange
    },
    {
        id: 'tsom_nineveh',
        name: { am: 'ጾመ ኒኒዌ', en: 'Fast of Nineveh' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -70,
        duration: 3,
        color: 'rgba(220, 20, 60, 0.15)', // Light crimson
    },
    {
        id: 'weekly_fast',
        name: { am: 'ሳምንታዊ ጾም', en: 'Weekly Fast' },
        eventType: 'fast',
        dateType: 'weekly',
        weekDays: [3, 5], // Wednesday and Friday
        color: 'rgba(105, 105, 105, 0.15)', // Light gray
    },

    // Standalone feasts (not preceded by fasts)
    {
        id: 'easter',
        name: { am: 'ፋሲካ', en: 'Easter (Fasika)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 0,
        color: 'rgba(255, 215, 0, 0.20)', // Light gold
        
    },
    {
            id: 'assumption',
            name: { am: 'ፍልሰታ', en: 'Assumption of Mary' },
            eventType: 'feast',
            dateType: 'fixed',
            month: 8,
            day: 22,
            color: 'rgba(135, 206, 235, 0.20)', // Light sky blue
        },
    {
            id: 'apostles_feast',
            name: { am: 'በዓለ ሐዋርያት', en: 'Feast of the Apostles' },
            eventType: 'feast',
            dateType: 'fixed',
            month: 7,
            day: 12,
            color: 'rgba(255, 182, 193, 0.20)', // Light pink
        },
    {
        id: 'epiphany',
        name: { am: 'ጥምቀት', en: 'Epiphany (Timkat)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 19,
        color: 'rgba(0, 191, 255, 0.20)', // Light deep sky blue
    },
    {
        id: 'finding_cross',
        name: { am: 'መስቀል', en: 'Finding of the True Cross (Meskel)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 9,
        day: 27,
        color: 'rgba(255, 165, 0, 0.20)', // Light orange
    },
    {
        id: 'palm_sunday',
        name: { am: 'ሆሣና', en: 'Palm Sunday (Hosanna)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: -7,
        color: 'rgba(34, 139, 34, 0.20)', // Light forest green
    },
    {
        id: 'ascension',
        name: { am: 'ዕርገት', en: 'Ascension' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 39,
        color: 'rgba(147, 112, 219, 0.20)', // Light medium purple
    },
    {
        id: 'pentecost',
        name: { am: 'ጵንጤቆስጤ', en: 'Pentecost' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 49,
        color: 'rgba(255, 69, 0, 0.20)', // Light red orange
    },
    {
        id: 'transfiguration',
        name: { am: 'ቡሄ', en: 'Transfiguration' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 8,
        day: 13,
        color: 'rgba(255, 255, 0, 0.20)', // Light yellow
    },
    {
        id: 'nativity_mary',
        name: { am: 'ልደተ ማርያም', en: 'Nativity of Mary' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 5,
        day: 9,
        color: 'rgba(176, 196, 222, 0.20)', // Light steel blue
    },
    {
        id: 'covenant_mercy',
        name: { am: 'ኪዳነ ምሕረት', en: 'Covenant of Mercy' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 2,
        day: 16,
        color: 'rgba(221, 160, 221, 0.20)', // Light plum
    },
    {
        id: 'annunciation',
        name: { am: 'ብስራተ ገብርኤል', en: 'Annunciation' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 4,
        day: 7,
        color: 'rgba(173, 216, 230, 0.20)', // Light blue
    },
    {
        id: 'christmas',
        name: { am: 'ልደት - ገና', en: 'Christmas (Genna)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 7,
        color: 'rgba(220, 20, 60, 0.20)', // Light crimson
    }
];

export default religiousEvents;