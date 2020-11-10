import axios from "../apiServices"

export async function listarOrdenes() {
    let body = {};
    var aux = await axios.get('ordenes', body)
    return aux.data
}

export async function listarClientes() {
    let body = {};
    var aux = await axios.get('clientes', body)
    return aux.data
}


export async function listarArticulos() {
    let body = {};
    var aux = await axios.get('articulos', body)
    return aux.data
}

export async function registrarOrden(orden) {
    //let body = Object.assign({orden});
    let body = orden;
    var aux = await axios.post('ordenes', body)
    return aux.data
}

export async function registrarCliente(cliente) {
    let body = cliente;
    var aux = await axios.post('clientes', body)
    return aux.data
}

export async function registrarArticulo(articulo) {
    let body = articulo;
    console.log("BODY", JSON.stringify(body));
    var aux = await axios.post('articulos', body)
    return aux.data
}

export async function modificarOrden(orden) {
    let body = orden;
    var aux = await axios.put('ordenes', body)
    return aux.data
}

export async function eliminarOrden(id) {
    let header = id;
    var aux = await axios.delete('ordenes/' + header)
    return aux.data
}