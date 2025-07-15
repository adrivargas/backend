export class CreateOrderDto {
  items: string[];
  userId: number;
  tableId: number;
  statusId: number;
  paymentId: number;
}
