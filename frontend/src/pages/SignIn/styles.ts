import { Form } from '@unform/web';
import styled from 'styled-components';

export const FormLogin = styled(Form)`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 10%;
  border-radius: 10px;
  padding: 10px;

  h1 {
    color: var(--text-secondary-color);
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 5px;
  }

  -webkit-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);

  input + input {
    margin-top: 10px;
  }

  button {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    margin-top: 12px;
    background-color: #ff4a2b;
    color: #fff;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  #forgot {
    padding: 0;
    display: flex;
    justify-content: start;
    background-color: #0000;
    font-size: 14px;

    &:hover {
      opacity: 0.6;
    }
  }

  a {
    width: 100%;
    display: block;
    padding: 12px;
    margin-top: 12px;
    border-radius: 5px;
    border-width: 0;
    text-align: center;
    text-decoration: none;
    background-color: var(--button-color);
    color: var(--text-secondary-color);
    transition: opacity 0.2s;

    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }
`;
