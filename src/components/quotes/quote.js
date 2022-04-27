import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const Quotes = (props) => {
    const location = useLocation();
    const [quoteData, setQuoteData] = useState([]);

    useEffect(() => {
        if (location.state.payloadData) {
            let data = (location.state.payloadData).sort((a, b) => {
                let da = new Date(a.time),
                    db = new Date(b.time);
                return da - db;
            });
            setQuoteData(data);
        }

    })


    return (

        <>
            <div className="App">
                <Typography variant="h4" padding={2}>
                    <strong>Quotes</strong>
                </Typography>
                <div>
                    {quoteData.length === 0 && (
                        <>
                            <strong>No Data Found</strong>
                        </>
                    )}

                    {quoteData.length && (

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><strong>S.No</strong></TableCell>
                                        <TableCell align="center"><strong>Price</strong></TableCell>
                                        <TableCell align="center"><strong>Time</strong></TableCell>
                                        <TableCell align="center"><strong>Valid Till</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {quoteData && quoteData.length > 0 &&
                                        quoteData.map((parsedData, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{(parsedData.price).toFixed(2)}</TableCell>
                                                <TableCell align="center">{parsedData.time}</TableCell>
                                                <TableCell align="center">{parsedData.valid_till}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>)}
                </div>
            </div>
        </>
    )
}

export default Quotes;