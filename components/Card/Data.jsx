import React from "react";
import styled from "styled-components";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const strade = [
  "Strada",
  "Strada Statale",
  "Autostrada",
  "Autostrada",
  "Strada Comunale",
  "Strada Statale",
  "Strada Provinciale",
];
  
export function Data({reliability, roadType }) {
  return (
    <Container>
      <RectRow>
        <RectA>
        <CircularProgressbar value={reliability*10} 
          text={`${reliability*10}`} 
          strokeWidth={5} 
          styles={buildStyles({
          pathColor: "#d6d6d6",
          textColor: "#d6d6d6",
          trailColor:  "#45528f"
        })} />
        </RectA>
        <RectB>
          <Street>{strade[roadType-1]}</Street>
        </RectB>
      </RectRow>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  border-radius: 20px;
  padding: 10px;
`;

const RectA = styled.div`
  width: 49%;
  height: 100%;
  background-color: #45528f;
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  padding: 20px;
  
`;

const RectB = styled.div`
  width: 49%;
  height: 100%;
  background-color: rgba(216, 144, 144, 1);
  border-radius: 20px;
  flex-direction: column;
  display: flex;
  padding: 30px;
  
`;

const RectRow = styled.div`
  height: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
`;

const Street = styled.p`
  color: white;
`;


