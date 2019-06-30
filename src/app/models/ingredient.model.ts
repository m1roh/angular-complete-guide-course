export class Ingredient {

  constructor(public name: string, public amount: number, public id?: string) {
    this.name = name;
    this.amount = amount;
    this.id = id;
  }
}
