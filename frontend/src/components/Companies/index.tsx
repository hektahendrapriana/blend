import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Brand } from "../../types/models";

interface CompanyProsp {
  brandsList: Brand[];
  selectedBrand: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

function Companies(props: CompanyProsp) {
  const { brandsList, selectedBrand, onChange } = props;
  return (
    <FormControl sx={{ minWidth: 180 }}>
      <Select
        displayEmpty
        id='demo-controlled-open-select'
        label='Company'
        value={selectedBrand}
        onChange={onChange}
        className='select'
      >
        <MenuItem key={0} value="" >
          All
        </MenuItem>
        {brandsList?.map((brand) => {
          return (
            <MenuItem key={brand.id} value={brand.value}>
              {brand.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default Companies;
