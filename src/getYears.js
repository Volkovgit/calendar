const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021,2022,2023];

export const yearsWithMounth = years.map((year) => {
  return {
    year,
    monthInYear: months.map((month) => ({
      month,
      days:
        month === "Январь"
          ?  Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Февраль"
          ? new Array(28).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Март"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Апрель"
          ? new Array(30).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Май"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Июнь"
          ? new Array(30).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Июль"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Август"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Сентябрь"
          ? new Array(30).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Октябрь"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Ноябрь"
          ? new Array(30).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : month === "Декабрь"
          ? new Array(31).fill(1).map((v,i)=>({day:i+1, note:[]}))
          : "Error",
    })),
  };
});