const registro = [];
const PRESUPUESTO = 5000000;


//CARGO DATOS INICIALES
document.getElementById('totalPresupuesto').innerHTML = convertirAPesos(PRESUPUESTO);
document.getElementById('presupuestoDisponible').innerHTML = convertirAPesos(PRESUPUESTO);

//AGREGO LOS ITEMS
function agregarItems(formulario){
    let nuevosProductos = document.forms[formulario];
    let nuevoProducto = [];
    for (const producto of nuevosProductos.elements) {
        if(producto.id === 'nombreItem'){
            //Reviso que este lleno
            if((producto.value.trim().length) > 0){
                nuevoProducto.push(producto.value);// ingreso en un array los elementos que me paso el formulario 
            }else{
                throw new Error('El producto debe estar lleno');
                return;
            }
        }else if(producto.id === 'valorItem'){
            //Verifico que sea un numero
            let valor = parseInt(producto.value.replace(/[^\d]/g, ''));
           
            if(valor > 0){
                //Aqui valido cuanto presupuesto he gastado:
                let totalGastado =document.getElementById('totalGastadoPresupuesto').innerText;
                TotalGastado = parseInt(totalGastado.replace(/[^\d]/g, ''));
                let control = parseInt((PRESUPUESTO - TotalGastado), 10);
                console.log(control);
                if(control >= valor ){
                    nuevoProducto.push(valor);
                    document.getElementById('nombreItem').value = ''
                    document.getElementById('nombreItem').focus();
                    document.getElementById('valorItem').value = 0


                }else{
                    let valorAGastar = convertirAPesos(control);
                    document.getElementById('valorItem').focus();
                    document.getElementById('valorItem').value = valorAGastar;
                    throw new Error(`No puedes gastarte mas de ${valorAGastar}`);
                }
            }else{
                throw new Error('El valor del producto debe ser mayor a cero')
            }
        }

        
    }

    //Pongo el producto o servicio en el objeto registro de la clase Gastos
    registro.push(new Gastos(nuevoProducto[0], nuevoProducto[1]));
    let gastosRealizados= gastoTotal(registro);
    //ACTUALIZO EL VALOR GASTADO
    document.getElementById('totalGastadoPresupuesto').innerHTML =  convertirAPesos(gastosRealizados);
    //actualizo presupuesto disponible
    document.getElementById('presupuestoDisponible').innerHTML = convertirAPesos(presupuestoDisponible(gastosRealizados));
    listaProductos(registro);
}







//Funcion Calcular lo Gastado
function gastoTotal(parametro){
    let costoTotal = 0;
    for (let index = 0; index < parametro.length; index++) {
        const element = parametro[index];
        costoTotal = parseInt(element['_costoProducto'])+costoTotal;
    }
    return costoTotal;
}

//Calculo los gastos realizados
function presupuestoDisponible(parametro){
    let totalDisponible = PRESUPUESTO - parametro;
    return totalDisponible;
}



//Aqui listo  la tabla de los productos

function listaProductos(datosProductos){
    let producto = [];

    let tbl = `<table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Producto</th>
                    <th scope="col">Cuanto Costo?</th>
                    <th scope="col">Presupuesto Restante</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>`;
    for (let index = 0; index < datosProductos.length; index++) {

        tbl += `<tr class="${styleRow(index)}">
                    <th scope="row">1</th>
                    <td>${datosProductos[index]['_nombreProducto']}</td>
                    <td>${convertirAPesos(datosProductos[index]['_costoProducto'])}</td>
                    <td>@mdo</td>
                    <td><i class="bi bi-trash" id='${datosProductos[index]['_idProducto']}' onclick = 'borrarElemento(this.id)' style='cursor: pointer' ></i></td>
                  </tr>`;
        
    }

    tbl += `</tbody>
              </table>`;

    document.getElementById('tablaDeGastos').innerHTML = tbl;
        
}



function borrarElemento(parametro){
let idItem = parseInt(parametro);
let idProductoEliminar = registro.find(registros => registro._idProducto === idItem);
let itemEliminar = registro.findIndex(registros => registros._idProducto === idItem);
registro.splice(itemEliminar, 1);
//console.log(itemEliminar);

let gastosRealizados= gastoTotal(registro);
    //ACTUALIZO EL VALOR GASTADO
document.getElementById('totalGastadoPresupuesto').innerHTML =  convertirAPesos(gastosRealizados);
//actualizo presupuesto disponible
document.getElementById('presupuestoDisponible').innerHTML = convertirAPesos(presupuestoDisponible(gastosRealizados));
    listaProductos(registro);
}







//Esta funcion me convierte a pesos colombianos
function convertirAPesos(parametro){
    let valor = parseInt(parametro);
    let precio = valor.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return precio;
}

function styleRow(idRow){
    let row = parseInt(idRow) % 2;
    return row === 1 ?  'table-secondary' :  'table-ligth';     
}



document.getElementById('valorItem').addEventListener('input', (e)=>{
    let valorSucio = e.target.value.replace(/[^\d]/g, ''); // Elimina caracteres no numéricos
    if (valorSucio === '') {
        e.target.value = ''; // Si está vacío, no mostrar nada
        return;
    }

    let valorNumerico = parseInt(valorSucio, 10); // Aseguramos que sea un número entero
    let valorFormateado = convertirAPesos(valorNumerico);

    e.target.value = valorFormateado; // Actualizamos el campo con el valor formateado
});


const inputItems = document.getElementById('nombreItem');
['burn', 'focus', 'change'].forEach( evento =>{
    inputItems.addEventListener(evento, (e)=>{
        let valor = e.target.value.trim()
        desactivarBtn(valor);
    })
});

const inputValor = document.getElementById('valorItem');
['burn', 'focus', 'change'].forEach( evento =>{
    inputItems.addEventListener(evento, (e)=>{
        let valor = e.target.value.trim();
        desactivarBtn(valor);
    })
});


function desactivarBtn(e){
    if(e.trim().length > 0){
        document.getElementById('registrarGasto').disabled = false;
    }else{
        document.getElementById('registrarGasto').disabled = true;
    }
}