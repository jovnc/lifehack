import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { format, parseISO } from "date-fns";
import { Transaction } from "@/app/protected/_components/GraphTabs";

export function groupTotalPriceByMonth(data: Transaction[]) {
  const groupedData: { [key: string]: number } = {};

  data.forEach((item: Transaction) => {
    const date = parseISO(item.date.toISOString());
    const month = format(date, "yyyy-MM");

    if (!groupedData[month]) {
      groupedData[month] = 0;
    }
    groupedData[month] += item.totalPrice;
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dat = Object.keys(groupedData).map((key) => {
    const [year, month] = key.split("-");
    const monthIndex = parseInt(month, 10) - 1; // Convert month to 0-indexed
    return {
      name: `${monthNames[monthIndex]} ${year}`,
      totalSales: groupedData[key],
      predicted: false,
    };
  });

  dat.sort((a, b) => {
    const [aMonth, aYear] = a.name.split(" ");
    const [bMonth, bYear] = b.name.split(" ");

    const aMonthIndex = monthNames.indexOf(aMonth);
    const bMonthIndex = monthNames.indexOf(bMonth);

    if (aYear !== bYear) {
      return parseInt(aYear) - parseInt(bYear); // Sort by year first
    } else {
      return aMonthIndex - bMonthIndex; // Sort by month if years are equal
    }
  });

  return dat;
}
