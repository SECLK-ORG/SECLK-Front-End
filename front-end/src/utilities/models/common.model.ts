export interface FormFieldDto<V> {
    value: V;
    validator: "text" | "number" | "date" | "object" | "array" | "dates" |"email"| null;
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
    IN_PROGRESS = 'In Progress',
    ON_HOLD = 'On Hold'
  }