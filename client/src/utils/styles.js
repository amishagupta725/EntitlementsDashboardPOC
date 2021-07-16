import styled from "styled-components";

export const DropdownWrapper = styled.form`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
`;

export const StyledSelect = styled.select`
  margin-top: 60px;
  max-width: 10%;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;

export const StyledLabel = styled.label`
  margin-bottom: 1rem;
`;

export const StyledButton = styled.input`
  margin-top: 60px;
  margin-left: 10px;
  margin-right: 30px;
  max-width: 10%;
  height: 60%;
  display: flex;
  justify-content: center;
  color: #035e7b;
  border: solid 2px #035e7b;
  background-color: white;
  padding: 0.35rem;
  border-radius: 0.25rem;
`;