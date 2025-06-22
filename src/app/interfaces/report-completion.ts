import { Completion } from "../enums/completion";

export interface ReportCompletion {
    completion: Completion;
    in_time: number;
    not_in_time: number;
    active_overdue: number;
    dead_line_soon: number;
}
