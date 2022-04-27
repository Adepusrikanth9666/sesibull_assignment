// import './App.css';
import React, { useState, useEffect } from 'react';
import urls from '../../urls';
import Papa from 'papaparse';
import { useNavigate, useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

function Stocks(props) {

    let navigate = useNavigate();

    const [csvData, setCsvData] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [clickedValue, setClickedValue] = useState();
    const [payloadData, setPayloadData] = useState([]);
    const [searchValue, setSearchedValue] = useState();


    const fetchCsvData = () => {

        fetch(urls.instrumentsAPI, {
            method: "GET"
        }).then((response) => response.text()).
            then((data) => Papa.parse(data, {
                complete: results => {
                    setCsvData(results.data);
                    setFilterData(results.data.slice(1))
                }
            })).catch((error) => console.log("error"))
    }

    let [headers, ...content] = csvData;

    const handleSearch = (searchValue) => {
        setSearchedValue(searchValue)
        if (!searchValue) {
            setFilterData(csvData.slice(1));
            return;
        }
        searchValue = searchValue.toLowerCase();

        const finalResult = [];
        {
            csvData.length && csvData.slice(1).forEach((item) => {
                item.map((val) => {
                    if ((val.toLowerCase()).includes(searchValue)) {
                        finalResult.push(item)
                    }
                }
                )
            });
        }
        // const data = new Set()
        setFilterData([...new Set(finalResult)]);
    };

    useEffect(() => {
        fetchCsvData()
    }, [])
    useEffect(() => {
        if (clickedValue) {
            fetch(`${urls.quotesAPI}${clickedValue}`, {
                method: "GET"
            }).then((response) => response.json())
                .then((data) => {
                    if (data.success === true) {
                        let parseValue = JSON.parse(JSON.stringify(clickedValue));
                        setPayloadData(data.payload[clickedValue])
                        navigate(`/quotes/${clickedValue}`, { state: { payloadData: data.payload[clickedValue] } })

                    }
                }).catch((error) => console.log(error))
        }
    }, [clickedValue])

    return (
        <div className="App">
            <Typography variant="h4" padding={2}>
                <strong>Stocks Details</strong>
            </Typography>
            <TextField
                id="outlined-required"
                label="Search"
                size='small'
                value={searchValue || ''}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div>
                {filterdata.length === 0 && (
                    <>
                        <h2>NO Data Present </h2>
                    </>
                )}


                {csvData.length && (

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    {csvData.length > 0 && filterdata.length > 0 && headers.map((data) => (
                                        <TableCell align="center"><strong>{data}</strong></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {csvData && filterdata &&
                                    filterdata.map((parsedData, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {/* <TableCell align="center">{index + 1}</TableCell> */}
                                            <TableCell align="center" className="tablebtn" onClick={(e) => setClickedValue((e.target.innerHTML).trim())}> {parsedData[0]}</TableCell>
                                            <TableCell align="center">{parsedData[1]}</TableCell>
                                            <TableCell align="center">{parsedData[2]}</TableCell>
                                            <TableCell align="center">{parsedData[3]}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>)}
            </div>
        </div>
    );
}

export default Stocks;
