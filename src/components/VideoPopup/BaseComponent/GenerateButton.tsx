import {
  Button,
  Typography,
} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface GenerateButtonProps {
    isDisable: boolean
    handleGenerate: () => void
}
export const GenerateButton : React.FC<GenerateButtonProps> = ({isDisable, handleGenerate}) => {
    return (
        <Button
            variant="outlined"
            disabled={
                isDisable
            }
            sx={{
                marginTop: "20px",
                width: "200px",
                height: "40px",
                backgroundColor: !isDisable
                ? "#a60195"
                : "#EBEBEB",
                color: !isDisable
                ? "white"
                : "#A3A3A3",
                borderRadius: "10px",
                border: "none",
                textTransform: "none",
                boxShadow: "none",
                padding: "0px",
                '&:hover': {
                backgroundColor: !isDisable ? "#a60195" : "#EBEBEB",
                boxShadow: "none",
                border: "none",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
            }}
            startIcon={<AutoAwesomeIcon />}
            onClick={
                () => {
                    handleGenerate();
                }
            }
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: 'Inter,Araboto, Roboto, Arial, sans-serif' }}>
                GENERATE
            </Typography>
        </Button>
    )
}                
                