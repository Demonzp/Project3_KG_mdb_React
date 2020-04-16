import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from "react-router-dom";

import { 
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';

import Pagination from "react-js-pagination";

import './paginator.css';

const UsePaginator = (pages) =>{

    const location = useLocation();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(2);
    const [total_items, setTotalItems] = useState(0);
    const [el_paginate, setElPaginate] = useState(null);
    const [el_limite, setElLimite] = useState(null);
    const arr_limits = [1,2,3,5,10];

    useEffect(() => {
        let t_url_page = Number(new URLSearchParams(location.search).get('page'));
        if(t_url_page<=0){
            t_url_page = 1;
        }else if(pages>0 && t_url_page>pages){
            onHistory(pages);
            return;
        }
        setPage(t_url_page);
    }, [location]);

    useEffect(()=>{
        let t_url_page = Number(new URLSearchParams(location.search).get('page'));
        if(pages>0 && t_url_page>pages){
            onHistory(pages);
        }
        setTotalItems(pages*limit);
        setElLimite(renderElLimiter());
    },[pages, limit]);

    useEffect(() => {
        setElPaginate(renderElPaginate());
    }, [total_items, page]);

    const handlerPageChange = (p)=>{
        onHistory(p);
    }
    
    const onHistory = (p)=>{
        history.push(`?page=${p}`);
    }

    const selectLimit = (e)=>{
        setLimit(Number(e.target.value));
    }

    const renderElPaginate = ()=>{
        if(pages<=1){
            return null;
        }else{
            return (
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={total_items}
                    pageRangeDisplayed={5}
                    onChange={handlerPageChange}
                />
            );
        }
    }

    const renderElLimiter = ()=>{
        return(
            <FormGroup row>
                <Label for="exampleSelect" sm={2}>Items show on page:</Label>
                <Col className="select-limit">
                <Input type="select" name="limit" id="limit" value={limit} onChange={selectLimit}>
                    {arr_limits.map((el)=>{
                        return <option key={el}>{el}</option>
                    })}
                </Input>
                </Col>
            </FormGroup>
        );
    }

    return{
        el_paginate,
        el_limite,
        page,
        limit
    }
};

export default UsePaginator;