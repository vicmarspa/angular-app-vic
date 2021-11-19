export interface DetalleCompraGeneral{
    id_detalle_cg?:number;
    id_cg?:number;
    cantidad?:number;
    calibre?:number;
    precio?:number;
    formato?:string;
    cantidad_formato?:number;
    fecha_ingreso?:Date;
    tipo_producto?:number;
}