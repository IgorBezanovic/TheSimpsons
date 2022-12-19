import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { languages } from "../../languages/i18n";
import i18n from "i18next";

const LanguageSelect = () => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("i18nextLng") ?? ""
  );

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl size="small">
      <Select value={language} onChange={handleLanguageChange}>
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
