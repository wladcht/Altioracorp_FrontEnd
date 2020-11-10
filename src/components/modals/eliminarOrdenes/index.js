import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { listarOrdenes, eliminarOrden } from '../../../comunication';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const PopupOrdenEliminar = (
    { open,
        onClose,
        flagEdit,
        handleResultado,
        title,
        size,
    }) => {

    const [ordenes, setOrdenes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [selectedOrden, setSelectedOrden] = useState()


    const handleSubmit = async () => {
        var id = {};
        id = selectedOrden.idOrden;
        const respuesta = await eliminarOrden(id);
        handleResultado();
        onClose();
    }

    const handleChangeOrden = (event) => {
        setSelectedOrden(event.target.value);
    };

    useEffect(() => {
        const fechData = async () => {
            const response = await listarOrdenes()
            let i = 0
            var auxiliarOrdenes = response.map(function (data) {
                return { ...data, id: i++ }
            })
            setOrdenes(auxiliarOrdenes)
            setCargando(false)
        }
        fechData();
    }, [])

    if (cargando === true) {
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
            <DialogContent style={{ width: 250, height: 250 }}>
                <div style={{
                    display: 'table',
                    width: '50%',
                    tableLayout: 'fixed',
                    borderSpacing: 10,
                }}>
                    <div style={{ display: 'table-cell' }}>Orden: </div>
                    <div style={{ display: 'table-cell' }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedOrden}
                            onChange={handleChangeOrden}
                        >
                            {
                                ordenes.map(item => (
                                    <MenuItem key={item.id} value={item}>{item.idOrden}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <br /><br />
                <Button size="small" variant="contained" onClick={() => handleSubmit()}>ELIMINAR ORDEN </Button>
            </DialogContent>
        </Dialog>
    )
}


export default PopupOrdenEliminar