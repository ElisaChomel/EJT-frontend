export interface IOrder {
    id:number;
    ref:string;
    email:string; 
    price: number;   
    isPay:boolean;
    items:IOrderItem[];
}

export interface IOrderItem{
    id:number;
    ref: string;
    size: string;
    quantity:number;
    price:number;
}

export interface IOrderItemFullInfo extends IOrderItem{
    orderRef:string;    
    email:string;      
    isPay:boolean;
}