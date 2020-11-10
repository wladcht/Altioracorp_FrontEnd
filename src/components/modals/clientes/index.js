import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { registrarCliente } from '../../../comunication';

const PopupCliente = (
    { open,
        onClose,
        flagEdit,
        handleResultado,
        title,
        size,
    }) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleSubmit = async () => {
        var cliente = {};
        cliente['nombre'] = nombre;
        cliente['apellido'] = apellido;
        const respuesta = await registrarCliente(cliente)
        handleResultado();
        onClose();
    }

    const handleChange = (event) => {
        setNombre(event.target.value);
    };

    const handleChange2 = (event) => {
        setApellido(event.target.value);
    };


    return (
        <Dialog
            onClose={onClose}
            open={open}
            maxWidth={size}
            fullScreen={false}
        >
            <DialogTitle color={'primary'}>{title}</DialogTitle>
            <DialogContent>
                <div>
                    <TextField required id="standard-required" label="Nombre" onChange={handleChange} />
                    <br /><br />
                    <TextField required id="standard-required" label="Apellido" onChange={handleChange2} />
                    <br /><br />
                    <Button size="small" variant="contained" onClick={() => handleSubmit()}>REGISTRAR CLIENTE </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PopupCliente