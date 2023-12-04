import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import Header from 'components/Header';
import { useTheme } from '@emotion/react';
import { Box, Button  } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar"
import FlexBetween from 'components/FlexBetween';
import { DownloadOutlined } from "@mui/icons-material";
import * as XLSX from 'xlsx';

const Transaction = () => {
    const theme= useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState(""); 
    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetTransactionsQuery({
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
    });

    const handleDownload = () => {
      const dataTransaction= data.transactions;
    
       const rows = dataTransaction.map((custmer) => ({
         id: custmer._id,
         userId: custmer.userId,
         cost: custmer.cost,
         products: custmer.products.toString(),
       }));
       
       const workbook = XLSX.utils.book_new();
       const worksheet = XLSX.utils.json_to_sheet(rows);
   
       XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
   
       // customize header names
       XLSX.utils.sheet_add_aoa(worksheet, [
         ["Customers ID", "userId", "cost", "products"],
       ]);
   
       XLSX.writeFile(workbook, "Data Transaction ReportFor2024.xlsx");
     };


    const columns = [
      {
        field: "_id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "userId",
        headerName: "User ID",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1,
      },
      {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length,
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
    ];
  

  return <Box m="1.5rem 2.5rem">
    
    <FlexBetween>
    <Header title="Transaction" subtitle="Entire list of transaction"/>
    <Button
          sx={{
            backgroundColor: theme.palette.secondary[600],
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              color: "white",
              backgroundColor: "transparent",
            },
          }}
          onClick={handleDownload}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </FlexBetween>
    <Box 
     sx={{
      "& .MuiDataGrid-root":{
          border:"none"
      },
      "& .MuiDataGrid-cell":{
          borderBottom:"none"
      },
      "& .MuiDataGrid-columnHeaders":{
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom:"none"
      },
      "& .MuiDataGrid-virtualScroller":{
          backgroundColor: theme.palette.primary.light,
      },
      "& .MuiDataGrid-virtualContainer":{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.secondary[100],
          borderTop: "none"
      },
      "& .MuiDataGrid-toolbarContainer .MuiDataGrid-text":{
          color:  `${theme.palette.secondary[200]} !important`,
          borderTop: "none"
      }
     }}
     >
<DataGrid
  loading={isLoading || !data}
  getRowId={(row) => row._id}
  rows={(data && data.transactions) || []}
  columns={columns}
  rowCount={(data && data.total) || 0}
  rowsPerPageOptions={[20, 50, 100]}
  pagination
  page={page}
  pageSize={pageSize}
  paginationMode="server"
  sortingMode="server"
  onPageChange={(newPage) => setPage(newPage)}
  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
  onSortModelChange={(newSortModel) => setSort(...newSortModel)}
  components={{ Toolbar: DataGridCustomToolbar }}
  componentsProps={{  
    toolbar: { searchInput, setSearchInput, setSearch },
  }}
/>
    </Box>
  </Box>
}

export default Transaction