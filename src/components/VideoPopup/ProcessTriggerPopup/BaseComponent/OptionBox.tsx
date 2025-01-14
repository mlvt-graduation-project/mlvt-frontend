import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface SingleSelectProps {
    choices: string[];
    handleChangeOption: (selectedOption: string) => void;
    customSx?: object;
    initChoice?: string;
}

export const SingleOptionBox: React.FC<SingleSelectProps> = ({
    choices,
    handleChangeOption,
    customSx = {},
    initChoice = '',
}) => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = React.useState<string>(choices.includes(initChoice) ? initChoice : '');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setSelectedOption(value);
        handleChangeOption(value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300, marginLeft: '0px', ...customSx }}>
                <Select
                    labelId="single-select-label"
                    id="single-select"
                    name="singleOption" // Thêm thuộc tính name
                    value={selectedOption}
                    onChange={handleChange}
                    MenuProps={MenuProps}
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
                            }}
                        >
                            {choice}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
