import { format, subDays, startOfDay, endOfDay, startOfWeek, startOfMonth, startOfQuarter } from 'date-fns';
import { DatePreset } from '@models/index';

export const getDateRange = (preset: DatePreset): { startDate?: Date; endDate?: Date } => {
  const now = new Date();
  const end = endOfDay(now);

  switch (preset) {
    case 'today':
      return {
        startDate: startOfDay(now),
        endDate: end,
      };
    case 'week':
      return {
        startDate: startOfWeek(now),
        endDate: end,
      };
    case 'month':
      return {
        startDate: startOfMonth(now),
        endDate: end,
      };
    case 'quarter':
      return {
        startDate: startOfQuarter(now),
        endDate: end,
      };
    default:
      return {};
  }
};

export const formatDate = (date: Date | string, formatStr: string = 'yyyy-MM-dd'): string => {
  return format(new Date(date), formatStr);
};

export const formatDateTime = (date: Date | string): string => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};