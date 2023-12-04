import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import { useGetQuery } from "state/api";

const Status = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetQuery();
  return (
    <Box m="1.5rem 2.5rem">
      {isLoading ? (<Box>Loading....</Box>): (
       <Box
          mt="20px"
          width="100%"
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridAutoRows="160px"
          gap="20px"
        >
          <Box
          
            backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
            fontSize="22px"
            fontWeight="bold"
          >
            {data?.message}
          </Box>
          <Box
            backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
            fontSize="22px"
            fontWeight="bold"
          
          >
            Status:{" "}
            {data?.databaseStatus?.status ==="Connected"?<div style={{color:"lightgreen",display:"inline"}}>Acitve</div>:"Disconnected"}{" "}
            <br/>
            Database on this port:{" "}
            <div style={{color:"lightgreen",display:"inline"}}>{ data?.databaseStatus?.port}</div>
            
          </Box>
        </Box>
      ) }
    </Box>
  );
};

export default Status;
