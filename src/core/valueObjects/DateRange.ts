export class DateRange {
    start: Date;
    end: Date;

    constructor(start: Date, end: Date) {
        if (start >= end) throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
        this.start = start;
        this.end = end;
    }

    getDurationDays(): number {
        const msInDay = 1000 * 60 * 60 * 24;
        return Math.ceil((this.start.getTime() - this.end.getTime()) / msInDay);
    }

    getDurationHours(): number {
        const diff = this.end.getTime() - this.start.getTime();
        return diff / (1000 * 60 * 60); // horas exactas
    }
}
