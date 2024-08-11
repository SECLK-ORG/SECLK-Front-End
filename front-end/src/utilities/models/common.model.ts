import { addDays } from "date-fns";
import moment from "moment";

export interface FormFieldDto<V> {
    value: V;
    validator: "text" | "number" | "date" | "object" | "array" | "dates" |"email"|"mobile"| null;
    isRequired: boolean;
    error: string | null;
    disable: boolean;
    readonly: boolean;
    max?: number;
    min?: number;
    charLength?: number[];
  }
  export enum ProjectStatus {
    COMPLETED = 'Completed',
    IN_PROGRESS = 'In-Progress',
    ON_HOLD = 'On-Hold'
  }

  export interface StateObjectDto<T> {
    [x: string]: any;
    data: T;
    isLoading: boolean;
    error: null;
    status: "initial" | "loading" | "success" | "error" | null;
  }


 export interface loginUserData {
    name: string;
    role: string;
    userId: string;
  }

  export const predefinedRanges = [
    {
      label: 'Today',
      value: [new Date(), new Date()] as [Date, Date],
      placement: 'left' as 'left',
    },
    {
      label: 'Yesterday',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)] as [Date, Date],
      placement: 'left' as 'left',
    },
    {
      label: 'Last 7 Days',
      value: [addDays(new Date(), -7), new Date()] as [Date, Date],
      placement: 'left' as 'left',
    },
    {
      label: 'Last 30 Days',
      value: [addDays(new Date(), -30), new Date()] as [Date, Date],
      placement: 'left' as 'left',
    },
    {
      label: 'Current Month',
      value: [moment().startOf('month').toDate(), moment().endOf('month').toDate()] as [Date, Date],
      placement: 'left' as 'left',
    }
  ];