import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from "../utils/styles.js";

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action}>
      <StyledLabel htmlFor="year">
        {props.formLabel}
      </StyledLabel>
      <StyledSelect id="year" name="year">
        {props.children}
      </StyledSelect>
      <StyledButton type="submit" value={props.buttonText} />
    </DropdownWrapper>
  );
}

export function Option(props) {
  return (
    <StyledOption selected={props.selected}>
      {props.value}
    </StyledOption>
  );
}


