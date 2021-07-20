import React, { DragEventHandler, useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

const Stage = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const OuterContainer = styled.div`
  display: flex;
  height: 600px;
  width: 800px;
  border: solid 1px red;
`;

const PositioningContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const AppContainer = styled.div`
  background: #333;
  height: 100vh;
  width: 100vw;
`;

type PositionElementProps = {
  readonly background?: string;
  readonly left?: number;
  readonly top?: number;
} & React.HTMLAttributes<HTMLElement>;

const PositionItem = styled.div<PositionElementProps>`
  background-color: ${(props) => props.background};
  left: ${(props) => (props.left ? `${props.left}px` : "0px")};
  top: ${(props) => (props.top ? `${props.top}px` : "0px")};
  height: 50px;
  width: 50px;
  position: absolute;
`;

function App() {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();
  const handleDragEnd = (e: any, item: any) => {
    const foundItem = items.find((x) => x.id === item.id)!;
    foundItem.top = e.clientY - ref.current?.offsetTop!;
    foundItem.left = e.clientX - ref.current?.offsetLeft!;
    setItems([...items.filter((x) => x.id !== item.id), foundItem]);
  };

  const [items, setItems] = useState([
    {
      id: 1,
      left: 10,
      top: 10,
      color: "red",
    },
    {
      id: 2,
      left: 80,
      top: 250,
      color: "blue",
    },
    {
      id: 3,
      left: 160,
      top: 350,
      color: "green",
    },
  ]);

  return (
    <AppContainer>
      <Stage>
        <OuterContainer ref={ref}>
          <PositioningContainer>
            {items.map((item) => (
              <PositionItem
                key={item.id}
                left={item.left}
                top={item.top}
                background={item.color}
                draggable
                onDragEnd={(event: any) => {
                  handleDragEnd(event, item);
                }}
              />
            ))}
          </PositioningContainer>
        </OuterContainer>
      </Stage>
    </AppContainer>
  );
}

export default App;
