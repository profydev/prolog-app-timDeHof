import styled from "styled-components";
import { color, space, textFont, breakpoint } from "@styles/theme";

export const Container = styled.div`
  background: white;
  box-sizing: border-box;
  @media (max-width: ${breakpoint("mobile")}) {
    border: 1px solid ${color("gray", 200)};
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
      0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    border-radius: ${space(2)};
  }
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  * {
    box-sizing: border-box;
  }
  @media (max-width: ${breakpoint("desktop")}){
    display: block;
    max-width: 100%;
    gap: 10px;
    tbody {
      display: block;
      max-width: 100%;
    }
    tr {
      display: flex;
      max-width: 100%;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid ${color("gray", 200)};
      box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
    }
    td {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 8px;
      padding: 16px 0;
      flex-basis: 100px;
    }
    td:first-child {
      flex: 1;
      flex-direction: row;
      justify-content: flex-start;
    }
    & td:not(:first-child):before {
      content: attr(data-label);
      color: ${color("gray", 500)};
      ${textFont("sm", "medium")};
    }
    & thead {
      display: none;
    }
  }
  @media (max-width: 700px) {
    td {
      flex: 1;
    }
    td:first-child {
      flex: 0 0 100%;
      justify-content: flex-start;
      word-break: break-word;
    }
  }
  @media (max-width: ${breakpoint("mobile")}) {
    td {
      max-width: 100%;
      overflow: hidden;
    }
    td > div > div {
      text-overflow: clip;
      white-space: nowrap;

  }
`;

export const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

export const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

export const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

export const PageInfo = styled.div.attrs({
  "data-cy": "page-info",
})`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

export const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;
