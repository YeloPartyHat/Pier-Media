import { Link } from "react-router-dom";
import styled from "styled-components";
import style from '../../../settings/style.json';

export const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  
  position: relative;
  border-bottom: 1px dotted ${style.color["dark-5"]};
  margin: 0;
  padding: 0.5em 2.5em 0.5em 1.5em;
  color: ${style.color["light-2"]};
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    background-color: ${style.color["dark-5"]};
    padding: 0.5em 2.4em 0.5em 1.6em;
  }

  &::before {
    display: inline-block;
    content: "";
    background: url(images/ion-icons/${props => props.icon}.svg) no-repeat;
    background-size: contain;
    height: 1em;
    width: 1em;
    padding: 0;
    margin: 0 0.5em 0 0;
    filter: invert(80%);
  }

  @media (max-width: 820px) {
    padding: 0.5em 1.5em 0.5em 1.5em;

    &:hover {
      padding: 0.5em 1.4em 0.5em 1.6em;
    }

    &::before {
      margin: 0;
    }
  }
  @media (max-width: 420px) {
    &::before {
      margin: 0 0.5em 0 0;
    }
  }
`;
