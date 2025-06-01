import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SingleSelectProps {
  choices: string[];
  handleChangeOption: (value: string) => void;
  customSx?: object;
  initChoice?: string;
}

export const SingleOptionBox: React.FC<SingleSelectProps> = ({
  choices,
  handleChangeOption,
  customSx = {},
  initChoice = "",
}) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = React.useState<string>(
    choices.includes(initChoice) ? initChoice : ""
  );

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleChangeOption(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300, marginLeft: "0px", ...customSx }}>
      <Select
        labelId="single-select-label"
        id="single-select"
        size="small"
        value={selectedOption}
        onChange={handleChange}
        MenuProps={{
          disablePortal: true,
          sx: { zIndex: (theme) => theme.zIndex.modal + 1 },
        }}
        sx={{
          "& .MuiSelect-select": {
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.9rem", 
          },
        }}
      >
        {choices.map((choice) => (
          <MenuItem
            key={choice}
            value={choice}
            style={{
              fontWeight:
                selectedOption === choice
                  ? theme.typography.fontWeightMedium
                  : theme.typography.fontWeightRegular,

              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
            }}
          >
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
