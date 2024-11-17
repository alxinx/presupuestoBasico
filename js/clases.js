class Gastos{
    static idItem = 1;
    constructor(nombreProducto, costoProducto){
        this._nombreProducto = nombreProducto;
        this._costoProducto = costoProducto;
        this._idProducto = Gastos.idItem ++;
    }

    //GETTER
    get nombreProducto(){
        return  this._nombreProducto;
    }

    get costoProducto(){
        return this._costoProducto;
    }
    //SETTER

    set nombreProducto(nombreItem){
        this._nombreProducto = nombreItem;
    }

    set costoProducto(precioProducto){
        this._costoProducto = precioProducto;
    }
}   
