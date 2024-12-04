import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    {
        field: 'date',
        valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
        filter: true,
        floatingFilter: true,
    },
    { field: 'duration',
      filter: true,
      floatingFilter: true,
    },
    { field: 'activity',
      filter: true,
      floatingFilter: true,
    },
    { field: 'customerName',
      headerName: 'Customer',
      filter: true,
      floatingFilter: true,
    },
  ]);



  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
        const data = await response.json()
        const trainings = data._embedded.trainings;
        const trainingsCust = await Promise.all(trainings.map(async(training) => {
            const custUrl = training._links.customer.href;
            const custResp = await fetch(custUrl);
            const custData = await custResp.json();
        return {
            ...training,
            customerName: `${custData.firstname} ${custData.lastname}`,
            };
        })
    );
        setRowData(trainingsCust);
        } catch (err) {
            console.error(err);
        }
    };
    fetchData();
}, []);

  return (
    <div className="ag-theme-material" 
    style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        rowSelection="single"
        floatingFilter = {true}
        animateRows = {true}
      />
    </div>
  );
};

export default TrainingList;
