import {
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import React from "react";
import { useGetCustomersQuery } from "state/api";
import { DownloadOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import * as XLSX from 'xlsx';


const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCall: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  const handleDownload = () => {
    const rows = data.map((custmer) => ({
      id: custmer._id,
      name: custmer.name,
      email: custmer.email,
      phoneNumber: custmer.phoneNumber,
      occupation: custmer.occupation,
      role: custmer.role,
    }));
    //workbook worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Customers ID", "Customers Name", "Customers email", "Customers phoneNumber", "Customers occupation", "Customers role"],
    ]);

    XLSX.writeFile(workbook, "Customers ReportFor2024.xlsx");
  };
  return (
    <Box m="1.5rem 2.5rem" >
       <FlexBetween>
      <Header title="CUSTOMERS" subtitle="list of Customer" />
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
        mt="40px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-virtualContainer": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiDataGrid-text": {
            color: `${theme.palette.secondary[200]} !important`,
            borderTop: "none",
          },
        }}
      >
       
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
