export class Price {
    amount: number;
    currency: string;

    constructor(amount: number, currency: string = "MXN") {
        if (amount < 0) throw new Error("El precio no puede ser negativo");
        this.amount = amount;
        this.currency = currency;
    }

    format(): string {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }
}
