import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const BrowseFile = () => {
    return (
      <>
        <Typography variant="body2" sx={{ marginTop: "5px", marginBottom:"10px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
          Browse your existed file on our MLVT
        </Typography>
        <Box
          sx={{
            border: "2px dashed grey",
            padding: "10px",
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "8px",
            cursor: "pointer",
            minHeight: "150px",
            maxHeight: "300px",
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FileOpenIcon sx={{ fontSize: '3rem' }} />
          <Typography variant="body2" sx={{ marginTop: "5px" }} fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}>
            {/* {selectedFile ? selectedFile?.name : "Browse your MLVT storage to find materials"} */}
            Browse your MLVT storage to find materials
          </Typography>
          <Button
            startIcon={<InfoOutlinedIcon />}
            variant="text"
            disabled
            sx={{ marginTop: "2rem", fontSize: "0.8rem", padding: 0, fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif', fontWeight: 'bold', '&.Mui-disabled': { color: 'black' } }}
          >
            Required
          </Button>
        </Box>
      </>
    )

  }