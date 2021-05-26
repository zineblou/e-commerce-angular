export class Product {
   id: number;
     sku: string;

    name: string;

    desciption: string;

    unitPrice: number;

    imageUrl: string;

    active: boolean;

    unitsInStock: number;

    dateCreated: Date;

    lastUpdated: Date;
 constructor(){
    this.id = 0;
    this.sku = "";

    this.name= "";

    this.desciption= "";
    this.unitPrice= 0;

    this.imageUrl= "";

    this.active= true;

    this.unitsInStock= 0;

    this.dateCreated= new Date();

    this.lastUpdated= new Date();

 }
}
