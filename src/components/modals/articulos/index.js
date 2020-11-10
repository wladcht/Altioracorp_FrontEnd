import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { registrarArticulo } from '../../../comunication';

const PopupArticulo = (
    { open,
        onClose,
        flagEdit,
        handleResultado,
        title,
        size,
    }) => {

    const [codArticulo, setCodArticulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState();

    const handleSubmit = async () => {
        var articulo = {};
        articulo['codArticulo'] = codArticulo;
        articulo['descripcion'] = descripcion;
        articulo['precioUnitario'] = parseFloat(precio);
        const respuesta = await registrarArticulo(articulo)
        handleResultado();
        onClose();
    }

    const handleChange = (event) => {
        setCodArticulo(event.target.value);
    };

    const handleChange2 = (event) => {
        setDescripcion(event.target.value);
    };

    const handleChange3 = (event) => {
        setPrecio(event.target.value);
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
                    <TextField required id="standard-required" label="Código Artículo" onChange={handleChange} />
                    <br /><br />
                    <TextField required id="standard-required" label="Descripción" onChange={handleChange2} />
                    <br /><br />
                    <TextField required id="standard-required" label="Precio Unitario" onChange={handleChange3} />
                    <br /><br />
                    <Button size="small" variant="contained" onClick={() => handleSubmit()}>REGISTRAR ARTÍCULO</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default PopupArticulo