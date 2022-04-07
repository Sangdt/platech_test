/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
// import { useList } from 'react-use';

const ResultCount = ({ numberOfItems = 12 }) => (<Box display={{ xs: 'none', sm: 'block' }} marginRight={2}>
    <Typography
        color={'text.secondary'}
        variant={'subtitle2'}
        sx={{ whiteSpace: 'nowrap' }}
    >
        {numberOfItems} Kết quả 
    </Typography>
</Box>);

const SearchAdornment = () => (<Box
    component={'svg'}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={24}
    height={24}
    color={'primary.main'}
>
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
</Box>);


const SearchBar = ({ inputPlaceholder = 'Search an article', searchData }) => {
    console.log("searchData", searchData)
    const [resultCount, setResultCount] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    useEffect(() => {
        if (searchVal === "") setResultCount(0)
        if (searchVal !== "") {
            setResultCount(searchData.reduce((accumulator, item) => {
                if (item.searchValue && item.searchValue !== "" && item.searchValue.includes(searchVal)) {
                    return accumulator + 1;
                }

                return accumulator;
            }, 0));
        }

    }, [searchVal]);
    // useEffect(()=>{
    //     if(list)
    // },[list])
    return (<Box
        padding={2}
        width={1}
        component={Card}
        boxShadow={4}
        marginBottom={4}
    >
        <Box display="flex" alignItems={'center'}>
            <Box width={1} marginRight={1}>
                <Input
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    sx={{
                        height: 54,
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0 !important',
                        },
                    }}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    placeholder={inputPlaceholder}
                    fullWidth
                    startAdornment={<SearchAdornment />}
                />
            </Box>
            {resultCount > 0 && <><ResultCount numberOfItems={resultCount} />
                <Box>
                    <Button
                        sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
                        variant="contained"
                        color="primary"
                        size="medium"
                        fullWidth
                    >
                        Xem kết quả {">>"}
                    </Button>
                </Box>
            </>}
        </Box>
    </Box>

    );
};
export default SearchBar;
