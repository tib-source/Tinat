import { ReligiousEvent } from './types';

const religiousEvents: ReligiousEvent[] = [
    // Fasts with their associated feasts
    {
        id: 'hudade',
        name: { am: 'ሁዳዴ', en: 'Lent (Great Fast)' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -55,
        duration: 54,
        color: 'rgba(186, 104, 200, 0.65)' // Pastel purple (medium opacity)
    },
    {
        id: 'tsom_nehase',
        name: { am: 'ጾመ ነሐሴ', en: 'Fast of Assumption' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 8,
        day: 1,
        duration: 15,
        color: 'rgba(129, 212, 250, 0.65)' // Pastel blue (medium opacity)
    },
    {
        id: 'tsom_advent',
        name: { am: 'ጾመ ልደት', en: 'Advent Fast' },
        eventType: 'fast',
        dateType: 'fixed',
        month: 11,
        day: 25,
        duration: 43,
        color: 'rgba(244, 143, 177, 0.65)' // Pastel pink (medium opacity)
    },
    {
        id: 'tsom_apostles',
        name: { am: 'ጾመ ሐዋርያት', en: 'Fast of the Apostles' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: 36,
        duration: 10,
        color: 'rgba(255, 183, 77, 0.65)' // Pastel orange (medium opacity)
    },
    {
        id: 'tsom_nineveh',
        name: { am: 'ጾመ ኒኒዌ', en: 'Fast of Nineveh' },
        eventType: 'fast',
        dateType: 'variable',
        fromEaster: -69,
        duration: 2,
        color: 'rgba(239, 154, 154, 0.65)' // Pastel red (medium opacity)
    },
    {
        id: 'weekly_fast',
        name: { am: 'ሳምንታዊ ጾም', en: 'Weekly Fast' },
        eventType: 'fast',
        dateType: 'weekly',
        weekDays: [3, 5], // Wednesday and Friday
        color: 'rgba(128, 222, 234, 0.65)' // Pastel cyan (medium opacity)
    },

    // Standalone feasts (not preceded by fasts)
    {
        id: 'easter',
        name: { am: 'ፋሲካ', en: 'Easter (Fasika)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 0,
        color: 'rgba(255, 241, 118, 0.65)' // Pastel yellow (medium opacity)
    },
    {
        id: 'assumption',
        name: { am: 'ፍልሰታ', en: 'Assumption of Mary' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 8,
        day: 22,
        color: 'rgba(179, 157, 219, 0.65)' // Pastel deep purple (medium opacity)
    },
    {
        id: 'apostles_feast',
        name: { am: 'በዓለ ሐዋርያት', en: 'Feast of the Apostles' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 7,
        day: 12,
        color: 'rgba(248, 187, 208, 0.65)' // Pastel rose (medium opacity)
    },
    {
        id: 'epiphany',
        name: { am: 'ጥምቀት', en: 'Epiphany (Timkat)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 19,
        color: 'rgba(128, 203, 196, 0.65)' // Pastel teal (medium opacity)
    },
    {
        id: 'finding_cross',
        name: { am: 'መስቀል', en: 'Finding of the True Cross (Meskel)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 9,
        day: 27,
        color: 'rgba(255, 204, 128, 0.65)' // Pastel deep orange (medium opacity)
    },
    {
        id: 'palm_sunday',
        name: { am: 'ሆሣና', en: 'Palm Sunday (Hosanna)' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: -7,
        color: 'rgba(165, 214, 167, 0.65)' // Pastel green (medium opacity)
    },
    {
        id: 'ascension',
        name: { am: 'ዕርገት', en: 'Ascension' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 39,
        color: 'rgba(206, 147, 216, 0.65)' // Pastel lavender (medium opacity)
    },
    {
        id: 'pentecost',
        name: { am: 'ጵንጤቆስጤ', en: 'Pentecost' },
        eventType: 'feast',
        dateType: 'variable',
        fromEaster: 49,
        color: 'rgba(255, 171, 145, 0.65)' // Pastel red-orange (medium opacity)
    },
    {
        id: 'transfiguration',
        name: { am: 'ቡሄ', en: 'Transfiguration' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 8,
        day: 13,
        color: 'rgba(255, 224, 130, 0.65)' // Pastel amber (medium opacity)
    },
    {
        id: 'nativity_mary',
        name: { am: 'ልደተ ማርያም', en: 'Nativity of Mary' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 5,
        day: 9,
        color: 'rgba(197, 202, 233, 0.65)' // Pastel indigo (medium opacity)
    },
    {
        id: 'covenant_mercy',
        name: { am: 'ኪዳነ ምሕረት', en: 'Covenant of Mercy' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 2,
        day: 16,
        color: 'rgba(244, 143, 177, 0.65)' // Pastel hot pink (medium opacity)
    },
    {
        id: 'annunciation',
        name: { am: 'ብስራተ ገብርኤል', en: 'Annunciation' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 4,
        day: 7,
        color: 'rgba(144, 202, 249, 0.65)' // Pastel light blue (medium opacity)
    },
    {
        id: 'christmas',
        name: { am: 'ልደት - ገና', en: 'Christmas (Genna)' },
        eventType: 'feast',
        dateType: 'fixed',
        month: 1,
        day: 7,
        color: 'rgba(200, 230, 201, 0.65)' // Pastel light green (medium opacity)
    }
];

export default religiousEvents;
