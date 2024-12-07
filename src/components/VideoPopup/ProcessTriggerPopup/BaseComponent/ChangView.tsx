import React, { useState } from "react";
import { Box, Button } from "@mui/material";

interface Views {
  text: string
  viewState: string
}

interface ChangeViewBoxProps {
  Views: Views[]
  setViewState: (method: string) => void
}

const ChangeViewBox: React.FC<ChangeViewBoxProps> = ({ Views, setViewState }) => {
  const [activeTab, setActiveTab] = useState<string>(Views[0]?.text || "");

  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
        outline: 2,
        borderRadius: 1.5,
        padding: 0.5,
        outlineColor: "#CCCCCC",
        backgroundColor: "white",
      }}
    >
        {Views.map((subView, index) => (
            <Button
            key={index}
            variant={activeTab === subView.text ? "contained" : "text"}
            sx={{
                backgroundColor: activeTab === subView.text ? "#a60195" : "white",
                color: activeTab === subView.text ? "white" : "#000",
                fontFamily: "Inter, Araboto, Roboto, Arial, sans-serif",
                fontWeight: "bold",
                flex: 1,
                borderRadius: 1.5,
                "&:hover": {
                backgroundColor:
                    activeTab === subView.text ? "#F075AA" : "white",
                boxShadow: "none",
                },
            }}
            onClick={() => {
                setActiveTab(subView.text)
                setViewState(subView.viewState)
            }} 
            >
                {subView.text}
            </Button>
        ))}
    </Box>
  );
};

export default ChangeViewBox;
