export interface CompraGeneralPrincipal{
    id_cg?: number;
    fecha_factura?: Date;
    fecha_ingreso?: Date;
    cliente_id?: number;
    tipo_pago?: number;
    numero_factura?: number;
    estado?: number;
    impuestos?: number;
}