import React from "react";
import styled from "styled-components";
import GoogleLogo from "../GoogleLogo";

function Accedi() {
  return (
      <Rect>
        <Placeholder placeholder="Email"></Placeholder>
        <Placeholder1 placeholder="Password"></Placeholder1>
        <IconRow>
          <GoogleLogo/>
          <Rect4>
            <Vai>VAI</Vai>
          </Rect4>
        </IconRow>
        <LoremIpsum>Ho dimenticato la password</LoremIpsum>
        <Accedis>ACCEDI</Accedis>
        <Rect2></Rect2>
      </Rect>
    
  );
}

const Rect = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  border-style: solid;
`;

const Placeholder = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 50px;
  width: 237px;
  border-width: 2px;
  border-color: #000000;
  border-radius: 5px;
  margin-top: 127px;
  margin-left: 69px;
  border-style: solid;
  background: transparent;
`;

const Placeholder1 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 50px;
  width: 237px;
  border-width: 2px;
  border-color: #000000;
  border-radius: 5px;
  margin-top: 26px;
  margin-left: 69px;
  border-style: solid;
  background: transparent;
`;

const Rect4 = styled.div`
  width: 157px;
  height: 40px;
  background-color: #E6E6E6;
  border-width: 2px;
  border-color: #000000;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  margin-left: 37px;
  border-style: solid;
`;

const Vai = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 20px;
  width: 37px;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 60px;
`;

const IconRow = styled.div`
  height: 40px;
  flex-direction: row;
  display: flex;
  margin-top: 31px;
  margin-left: 78px;
  margin-right: 69px;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(18,18,18,1);
  height: 24px;
  width: 187px;
  margin-top: 39px;
  margin-left: 94px;
`;

const Accedis = styled.span`
  font-style: normal;
  font-weight: 400;
  color: #121212;
  height: 25px;
  width: 77px;
  font-size: 20px;
  bottom: 20px;
  margin-left: 149px;
  position: absolute;
  bottom: 30px;
`;

const Rect2 = styled.div`
  width: 110px;
  height: 7px;
  background-color: rgba(135,133,133,0.61);
  border-width: 1px;
  border-color: rgba(255,254,254,1);
  border-radius: 20px;
  margin-top: 9px;
  margin-left: 132px;
  border-style: solid;
  position: absolute;
  bottom: 20px;
`;

export default Accedi;
