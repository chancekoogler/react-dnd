import React, { useState } from "react";
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
  readonly isMoving?: boolean;
  readonly id: string;
  readonly isSelected: boolean;
} & React.HTMLAttributes<HTMLElement>;

const PositionItem = styled.div.attrs((props: PositionElementProps): any => ({
  id: props.id || "",
}))`
  cursor: pointer;
  background-color: ${(props) => props.background};
  left: ${(props) => (props.left ? `${props.left}px` : "0px")};
  top: ${(props) => (props.top ? `${props.top}px` : "0px")};
  height: 50px;
  width: 50px;
  visibility: ${(props) => (props.isMoving ? "hidden" : "visible")};
  border: ${(props) => (props.isSelected ? "dashed 3px white" : "none")};
  position: absolute;
`;

function App() {
  const ref: React.RefObject<HTMLInputElement> = React.createRef();

  const handleClickItem = (item: any) => {
    const copyItems = items.map((item) => ({ ...item, isSelected: false }));
    const foundItem = copyItems.find((x) => x.id === item.id)!;
    foundItem.isSelected = true;
    setItems(copyItems);
  };

  const handleDragStart = (e: any) => {
    e.stopPropagation();
    const id = parseInt(e.nativeEvent.srcElement.id.replace("id_", ""));
    const copyItems = items.map((item) => ({ ...item, isSelected: false }));
    const foundItem = copyItems.find((x) => x.id === id)!;
    foundItem.isSelected = true;
    setItems(copyItems);
  };

  const handleDrag = (e: any) => {
    e.stopPropagation();
    const id = parseInt(e.nativeEvent.srcElement.id.replace("id_", ""));
    const foundItem = { ...items.find((x) => x.id === id)! };
    foundItem.isMoving = true;
    setItems([...items.filter((x) => x.id !== id), foundItem]);
  };

  const handleDragEnd = (e: any) => {
    e.stopPropagation();
    const id = parseInt(e.target.id.replace("id_", ""));
    const foundItem = { ...items.find((x) => x.id === id)! };
    foundItem.top = e.clientY - ref.current?.offsetTop!;
    foundItem.left = e.clientX - ref.current?.offsetLeft!;
    foundItem.isMoving = false;
    setItems([...items.filter((x) => x.id !== id), foundItem]);
  };

  const [items, setItems] = useState([
    {
      id: 1,
      left: 10,
      top: 10,
      color: "red",
      isMoving: false,
      isSelected: false,
    },
    {
      id: 2,
      left: 80,
      top: 250,
      color: "blue",
      isMoving: false,
      isSelected: false,
    },
    {
      id: 3,
      left: 160,
      top: 350,
      color: "green",
      isMoving: false,
      isSelected: false,
    },
  ]);

  return (
    <AppContainer>
      <Stage>
        <OuterContainer
          ref={ref}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
        >
          <PositioningContainer>
            {items.map((item) => (
              <PositionItem
                key={item.id}
                left={item.left}
                top={item.top}
                background={item.color}
                isMoving={item.isMoving}
                isSelected={item.isSelected}
                draggable
                id={`id_${item.id}`}
                onClick={() => handleClickItem(item)}
              />
            ))}
          </PositioningContainer>
        </OuterContainer>
      </Stage>
    </AppContainer>
  );
}

export default App;
