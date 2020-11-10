import React, { useState, useEffect } from 'react'
import { listarOrdenes } from '../../comunication';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import PopupOrden from '../modals/ordenes'
import PopupCliente from '../modals/clientes'
import PopupArticulo from '../modals/articulos'
import PopupOrdenEliminar from '../modals/eliminarOrdenes'
import PopupOrdenModificar from '../modals/modificarOrdenes'

const Ordenes = ({ }) => {
    const [cargando, setCargando] = useState(true)
    const [ordenes, setOrdenes] = useState('')
    const [articulos, setArticulos] = useState([])
    const [verClientes, setVerClientes] = useState(false)
    const [verArticulos, setVerArticulos] = useState(false)
    const [verOrdenes, setVerOrdenes] = useState(false)
    const [resultado, setResultado] = useState(false)
    const [eliminarOrdenes, setEliminarOrdenes] = useState(false)
    const [modificarOrdenes, setModificarOrdenes] = useState(false)

    const openOrden = () => {
        setVerOrdenes(true)
    }

    const closeOrden = () => {
        setVerOrdenes(false)
    }

    const openOrdenEliminar = () => {
        setEliminarOrdenes(true)
    }

    const closeOrdenEliminar = () => {
        setEliminarOrdenes(false)
    }

    const openOrdenModificar = () => {
        setModificarOrdenes(true)
    }

    const closeOrdenModificar = () => {
        setModificarOrdenes(false)
    }

    const openCliente = () => {
        setVerClientes(true)
    }

    const closeCliente = () => {
        setVerClientes(false)
    }

    const openArticulo = () => {
        setVerArticulos(true)
    }

    const closeArticulo = () => {
        setVerArticulos(false)
    }

    const filtrarDetalle = value => {
        var listaDetalle = value.data
        var articuloArray = []
        listaDetalle.ordenDetalle.forEach(art =>
            articuloArray.push(art.articulo))
        let i = 0
        var auxiliar = articuloArray.map(function (data) {
            return { ...data, id: i++ }

        })
        setArticulos(auxiliar)
    }


    useEffect(() => {
        const fechData = async () => {
            const response = await listarOrdenes()
            let i = 0
            var auxiliar = response.map(function (data) {
                var nombreCliente = data.cliente.apellido + " " + data.cliente.nombre
                var formatoFecha = new Date(data.fecha).toISOString().slice(0, 10)
                console.log(formatoFecha)
                return { ...data, fechaFormat: formatoFecha, cliente: nombreCliente, id: i++ }
            })
            setOrdenes(auxiliar)
            setCargando(false)
        }
        fechData();
    }, [resultado])

    const rows: RowsProp = ordenes

    const columns: ColDef[] = [
        { field: 'idOrden', headerName: 'NÚMERO DE ORDEN', width: 250 },
        { field: 'fechaFormat', headerName: 'FECHA', width: 250 },
        { field: 'cliente', headerName: 'CLIENTE', width: 250 },

    ];

    const rows2: RowsProp = articulos

    const columns2: ColDef[] = [
        { field: 'codArticulo', headerName: 'CODIGO ARTICULO', width: 250 },
        { field: 'descripcion', headerName: 'NOMBRE ARTICULO', width: 250 },
        { field: 'precioUnitario', headerName: 'PRECIO UNITARIO', width: 250 },

    ];

    if (cargando === true) {
        return <div>CARGANDO ...</div>
    }
    const handleResultado = () => {
        setResultado(true)
        setResultado(false)
        alert("Operación Correcta")
    }

    return (
        <div>
            <div style={{
                display: 'table',
                width: '100%',
                tableLayout: 'fixed',
                borderSpacing: 10,
            }}>
                <div style={{ display: 'table-cell' }}>
                    <Button variant="contained" color="primary" onClick={() => openOrden()}>CREAR ORDEN</Button>
                </div>
                <div style={{ display: 'table-cell' }}>
                    <Button variant="contained" color="primary" onClick={() => openOrdenModificar()}>MODIFICAR ORDEN</Button>
                </div>
                <div style={{ display: 'table-cell' }}>
                    <Button variant="contained" color="primary" onClick={() => openOrdenEliminar()}>ELIMINAR ORDEN</Button>
                </div>
                <div style={{ display: 'table-cell' }}>
                    <Button variant="contained" color="primary" onClick={() => openCliente()}>CREAR CLIENTE</Button>
                </div>
                <div style={{ display: 'table-cell' }}>
                    <Button variant="contained" color="primary" onClick={() => openArticulo()}>CREAR ARTICULO</Button>
                </div>
            </div>
            <br />
            <p>ORDEN</p>
            <div style={{ height: 250, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} onRowClick={filtrarDetalle} />
            </div>
            <br />
            <p>DETALLE ORDEN</p>
            <div style={{ height: 250, width: '100%' }}>
                <DataGrid rows={rows2} columns={columns2} />
            </div>

            <PopupOrden
                open={verOrdenes}
                onClose={closeOrden}
                flagEdit={false}
                handleResultado={handleResultado}
                title={"REGISTRAR ORDEN"}
                size={'xl'}
            />

            <PopupCliente
                open={verClientes}
                onClose={closeCliente}
                flagEdit={false}
                handleResultado={handleResultado}
                title={"REGISTRAR CLIENTE"}
                size={'xl'}
            />

            <PopupArticulo
                open={verArticulos}
                onClose={closeArticulo}
                flagEdit={false}
                handleResultado={handleResultado}
                title={"REGISTRAR ARTICULO"}
                size={'xl'}
            />

            <PopupOrdenEliminar
                open={eliminarOrdenes}
                onClose={closeOrdenEliminar}
                flagEdit={false}
                handleResultado={handleResultado}
                title={"ELIMINAR ORDEN"}
                size={'xl'}
            />


            <PopupOrdenModificar
                open={modificarOrdenes}
                onClose={closeOrdenModificar}
                flagEdit={false}
                handleResultado={handleResultado}
                title={"MODIFICAR ORDEN"}
                size={'xl'}
            />
        </div >
    )
}

export default Ordenes
