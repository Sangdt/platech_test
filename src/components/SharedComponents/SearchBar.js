/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import { useList } from 'react-use';
import dynamic from "next/dynamic"
import CircularProgress from '@mui/material/CircularProgress';
import { SingleProductGrid } from 'blocks/categoryShowcases/ShowcaseGrid/ShowcaseGrid';
import Grid from '@mui/material/Grid';
import Container from 'components/Container';

const ProductSearchResultModal = dynamic(() => import(
    /* webpackChunkName: "ContactForm" */
    /* webpackMode: "lazy" */
    'components/SharedComponents/Modal/SearchResultModal').then(m => m.SearchResultModal),
    {
        ssr: false,
        loading: () => <div className="max-w-2xl mx-auto"><CircularProgress className='mx-auto' /></div>,
    });
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
</Box>)


const SearchBar = ({ inputPlaceholder = 'Search an article', searchData }) => {
    // console.log("searchData", searchData)
    const [filteredSearchResult, { set, clear }] = useList([]);
    const [openSearchResultModal, setOpenSearchResultModal] = useState(false);
    const [resultCount, setResultCount] = useState(0);
    const [searchVal, setSearchVal] = useState('');
    const filterProduct = (searchValue) => {
        setSearchVal(searchValue);
        if (searchValue === "") {
            setResultCount(0)
            clear()
        }
        if (searchValue !== "") {
            let searchResults = searchData.filter(item => item.searchValue.toLowerCase().includes(searchValue.toLowerCase()));
            // console.log("searchResults,searchValue ", searchResults, searchValue)
            setResultCount(searchResults.length);
            if (searchResults.length > 0) {
                set(searchResults);
            } else {
                clear()
            }
        }

    }
    // useEffect(() => {


    // }, [searchVal]);
    const handleClickOpen = () => {
        if (resultCount > 0) setOpenSearchResultModal(true);
        console.log("filteredSearchResult", filteredSearchResult)
    };

    const handleClose = () => {
        setOpenSearchResultModal(false);
    };
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
                    onChange={e => filterProduct(e.target.value)}
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
                        onClick={e => handleClickOpen()}
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
        {openSearchResultModal && <ProductSearchResultModal
            openModal={openSearchResultModal}
            handleModalClose={handleClose}
            modalTitle={"Có " + resultCount + " sản phẩm trùng với từ khóa của bạn"}
        >
            <Container>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    {filteredSearchResult.map((item, i) => (<SingleProductGrid searchResultDisplay key={`${i}_${item.id}`}  {...item} i={i} />))}
                </Grid>
            </Container>
        </ProductSearchResultModal>}
    </Box>

    );
};
export default SearchBar;
