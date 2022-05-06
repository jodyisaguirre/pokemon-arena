import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButton(props) {
    const { name, onClick, color, disabled } = props

    return (
        <Stack spacing={2} direction="row">
            {
                (color)?
                    <Button   disabled={disabled} onClick={onClick} variant="contained" color={color}>{name}</Button>
                    :
                    <Button   disabled={disabled} onClick={onClick} variant="contained">{name}</Button>
            }
        </Stack>
    );
}