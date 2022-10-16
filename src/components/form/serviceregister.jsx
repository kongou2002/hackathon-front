import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Axios from 'axios';
import React, { useState } from 'react';
const data = [
    'Chỉnh màu màn hình', 'Cài đặt phần mềm', 'Sửa lỗi phần mềm', 'Sửa lỗi phần cứng', 'Phủi bụi (80.000 VND)', 'Tra keo tản nhiệt (100.000 VND)', 'Tra keo tản nhiệt (300.000 VND)'
]
function Serviceregister(props) {
    const [combo, setCombo] = useState('')
    const [autocompleteValues, setAutocompleteValues] = useState([]);
    const [send, setSend] = useState({
        name: {},
        password: {},
        phone: {},
        description: {}

    })
    const handleChange1 = (event, value) => {
        setAutocompleteValues(value)
    }

    const handleChange = (event) => {
        setCombo(event.target.value)
        try {
            setCombo = event.target.value
        } catch (err) {
            console.log(err)
            const value = event.target.value;
            setSend({
                ...send,
                [event.target.name]: value
            });
        }

    };
    console.log(send)
    const handlesubmit = (e) => {
        try {
            Axios.post("https://pro-mech.azurewebsites.net/Ticket/CreateTicket", {
                name: send.name,
                password: send.password,
                phone: send.phone,
                description: send.description,
                service: autocompleteValues,
            })
                .then(res => {
                    console.log(res)
                    alert('Chúng tôi đã nhận được form của bạn')
                })
        } catch (err) {
            console.log(err)
        }
        e.preventDefault(e)

    }
    console.log(send)
    console.log(JSON.stringify(autocompleteValues))
    return (
        <Stack mt={5}>
            <Typography variant='h4'>
                Đăng ký dịch vụ
            </Typography>
            <Box
                component="form"
                onSubmit={handlesubmit}
                sx={{
                    '& > :not(style)': { m: 1, width: '100ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField label="TÊN" variant="outlined" onChange={handleChange} name='name' />
                <TextField label="PASSWORD MÁY TÍNH" variant="outlined" onChange={handleChange} name='password' />
                <TextField label="SỐ ĐIỆN THOẠI" variant="outlined" onChange={handleChange} name='phone' />
                <TextField label="MÔ TẢ TÌNH TRẠNG MÁY TÍNH" variant='outlined' onChange={handleChange} name='description'></TextField>
                <Autocomplete
                    multiple
                    id="tags-standard"
                    name="service"
                    value={send.service}
                    onChange={handleChange1}
                    options={data}
                    getOptionLabel={(option) => option}
                    defaultValue={[data[1]]}
                    renderInput={(params) => (
                        <TextField
                            sx={{ ml: '8.5rem' }}
                            {...params}
                            variant="standard"
                            label="Dịch vụ"

                        />
                    )}
                />

                <Button
                    type="submit"
                    variant='contained'
                >
                    Đăng ký
                </Button>
            </Box>

        </Stack>
    )
}

Serviceregister.propTypes = {}

export default Serviceregister
