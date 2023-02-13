import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Category } from "../../types/models";

interface CategoryProsp {
  categoriesList: Category[];
  selectedCategory: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

function Categories(props: CategoryProsp) {
  const { categoriesList, selectedCategory, onChange } = props;
  return (
    <FormControl sx={{ minWidth: 180 }}>
      <Select
        displayEmpty
        id='demo-controlled-open-select'
        label='Category'
        value={selectedCategory}
        onChange={onChange}
        className='select'
      >
        <MenuItem key={0} value="" >
          All
        </MenuItem>
        {categoriesList?.map((category) => {
          return (
            <MenuItem key={category.id} value={category.value}>
              {category.value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default Categories;
