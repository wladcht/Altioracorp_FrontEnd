import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { listarClientes, listarArticulos, registrarOrden } from '../../../comunication';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DataGrid, RowsProp, ColDef, ROW_SELECTED } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const PopupOrden = (
    { open,
        onClose,
        flagEdit,
        handleResultado,
        title,
        size,
    }) => {

    const [clientes, setClientes] = useState([])
    const [articulos, setArticulos] = useState([])
    const [articulosDetalle, setArticulosDetalle] = useState([])

    const [cargando1, setCargando1] = useState(true)
    const [cargando2, setCargando2] = useState(true)

    const [selectedCliente, setSelectedCliente] = useState()
    const [selectedArticulo, setSelectedArticulo] = useState("Articulo")


    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async () => {
        var guardar = {};
        var cliente = {};
        var listaArticulo = [];


        cliente['idCliente'] = selectedCliente.idCliente;
        guardar['cliente'] = cliente;

        guardar['fecha'] = selectedDate;

        var ordenDetalle = articulosDetalle;
        listaArticulo = ordenDetalle.map(function (data) {
            var articulo = {};
            articulo['idArticulo'] = data.value.idArticulo;
            return { articulo };
        });
        guardar['ordenDetalle'] = listaArticulo;

        const respuesta = await registrarOrden(guardar);
        handleResultado();
        onClose();
    }



    const handleChangeArticulo = (event) => {
        setSelectedArticulo(event.target.value);
        var temporal = [];
        var temporalobj = {};
        if (articulosDetalle.length === 0) {
            temporalobj['id'] = temporal.length;
            temporalobj['value'] = event.target.value;
            temporalobj['codArticulo'] = event.target.value.codArticulo;
            temporalobj['descripcion'] = event.target.value.descripcion;
            temporalobj['precio'] = event.target.value.precioUnitario;
            temporal.push(temporalobj);
            setArticulosDetalle(temporal);
        } else {
            temporalobj['id'] = articulosDetalle.length + 1;
            temporalobj['value'] = event.target.value
            temporalobj['codArticulo'] = event.target.value.codArticulo;
            temporalobj['descripcion'] = event.target.value.descripcion;
            temporalobj['precio'] = event.target.value.precioUnitario;
            temporal.push(temporalobj);
            var temporalArticulo = [...articulosDetalle];
            temporalArticulo.push(temporalobj);
            setArticulosDetalle(temporalArticulo);
        }
    };

    const handleChangeCliente = (event) => {
        setSelectedCliente(event.target.value);
    };

    useEffect(() => {
        const fechData = async () => {
            const response = await listarClientes()
            let i = 0
            var auxiliarClientes = response.map(function (data) {
                return { ...data, id: i++ }
            })


            const response2 = await listarArticulos()
            let j = 0
            var auxiliarArticulos = response2.map(function (data) {
                return { ...data, id: j++ }
            })
            setArticulos(auxiliarArticulos)
            setCargando2(false)
            setClientes(auxiliarClientes)
            setCargando1(false)
        }
        fechData();
    }, [])

    const rows: RowsProp = articulosDetalle

    const columns: ColDef[] = [
        { field: 'codArticulo', headerName: 'CÓDIGO ARTICULO', width: 200 },
        { field: 'descripcion', headerName: 'DESCRIPCIÓN', width: 300 },
        { field: 'precio', headerName: 'PRECIO UNITARIO', width: 200 },

    ];



    if (cargando1 === true || cargando2 === true) {
        return <div>CARGANDO ...</div>
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            maxWidth={size}
            fullScreen={false}
        >
            <DialogTitle color={'primary'}>{title}</DialogTitle>
            <DialogContent style={{ width: 700, height: 700 }}>
                <div style={{
                    display: 'table',
                    width: '25%',
                    tableLayout: 'fixed',
                    borderSpacing: 10,
                }}>
                    <div style={{ display: 'table-cell' }}>Cliente: </div>
                    <div style={{ display: 'table-cell' }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCliente}
                            onChange={handleChangeCliente}
                        >
                            {
                                clientes.map(item => (
                                    <MenuItem key={item.id} value={item}>{item.nombre} {' '}{item.apellido}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <br /><br />
                <div style={{
                    display: 'table',
                    width: '25%',
                    tableLayout: 'fixed',
                    borderSpacing: 10,
                }}>
                    <div style={{ display: 'table-cell' }}>Artículo: </div>
                    <div style={{ display: 'table-cell' }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedArticulo}
                            onChange={handleChangeArticulo}
                        >
                            {
                                articulos.map(item => (
                                    <MenuItem key={item.id} value={item}>{item.codArticulo} {' '}{item.descripcion}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Fecha: "
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}

                    />
                </MuiPickersUtilsProvider>

                <div style={{ height: 350, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
                <br /><br />
                <Button size="small" variant="contained" onClick={() => handleSubmit()}>REGISTRAR</Button>

            </DialogContent>
        </Dialog>
    )
}


export default PopupOrden

