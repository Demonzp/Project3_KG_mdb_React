import React, { useState, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { 
    FormGroup,
    Label,
    Col,
    Input
} from 'reactstrap';

import Pagination from 'react-js-pagination';

import './paginator.css';

const UsePaginator = (pages) =>{

    const location = useLocation();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(2);
    const [totalItems, setTotalItems] = useState(0);
    const [elPaginate, setElPaginate] = useState(null);
    const [elLimite, setElLimite] = useState(null);
    const arrLimits = [1,2,3,5,10];

    useEffect(() => {
        let tUrlPage = Number(new URLSearchParams(location.search).get('page'));
        if(tUrlPage<=0){
            tUrlPage = 1;
        }else if(pages>0 && tUrlPage>pages){
            onHistory(pages);
            return;
        }
        setPage(tUrlPage);
    }, [location]);

    useEffect(()=>{
        let tUrlPage = Number(new URLSearchParams(location.search).get('page'));
        if(pages>0 && tUrlPage>pages){
            onHistory(pages);
        }
        setTotalItems(pages*limit);
        setElLimite(renderElLimiter());
    },[pages, limit]);

    useEffect(() => {
        setElPaginate(renderElPaginate());
    }, [totalItems, page]);

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
                    totalItemsCount={totalItems}
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
                    {arrLimits.map((el)=>{
                        return <option key={el}>{el}</option>
                    })}
                </Input>
                </Col>
            </FormGroup>
        );
    }

    return{
        elPaginate,
        elLimite,
        page,
        limit
    }
};

export default UsePaginator;