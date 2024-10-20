import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [columnDefs] = useState([
    {field:'firstname'},
    {field: 'lastname'},
    {field: 'streetaddress'},
    {field: 'postcode'},
    {field: 'city'},
    {field: 'email'},
    {field: 'phone'},
  ]);

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data._embedded.customers)) {
            setCustomers(data._embedded.customers);
}})
        
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="ag-theme-material" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default CustomerList;
