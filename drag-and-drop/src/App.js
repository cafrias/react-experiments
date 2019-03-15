import React from "react";
import { initialData } from "./data";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "./components/column";

import { withStyles, createStyles } from "@material-ui/core/styles";

function App({ classes }) {
  const [data, setData] = React.useState(initialData);

  return (
    <DragDropContext
      onDragEnd={result => {
        const { destination, source, draggableId, type } = result;

        // No destination, do nothing
        if (!destination) return;

        // Started and ended in the same place, do nothing
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        // Column reordering
        if (type === "column") {
          const order = Array.from(data.columnsOrder);
          order.splice(source.index, 1);
          order.splice(destination.index, 0, draggableId);

          setData({
            ...data,
            columnsOrder: order
          });

          return;
        }

        const startColumn = data.columns[source.droppableId];
        const finishColumn = data.columns[destination.droppableId];

        // Reordering within same column
        if (startColumn === finishColumn) {
          const tasks = Array.from(startColumn.tasks);
          // Remove old index
          tasks.splice(source.index, 1);
          // Add new index
          tasks.splice(destination.index, 0, draggableId);

          setData({
            ...data,
            columns: {
              ...data.columns,
              [source.droppableId]: {
                ...startColumn,
                tasks: tasks
              }
            }
          });

          return;
        }

        // Moving from one column to another
        const startTasks = Array.from(startColumn.tasks);
        startTasks.splice(source.index, 1);
        const finishTasks = Array.from(finishColumn.tasks);
        finishTasks.splice(destination.index, 0, draggableId);

        setData({
          ...data,
          columns: {
            ...data.columns,
            [source.droppableId]: {
              ...startColumn,
              tasks: startTasks
            },
            [destination.droppableId]: {
              ...finishColumn,
              tasks: finishTasks
            }
          }
        });
      }}
    >
      <Droppable droppableId="all-columns" type="column" direction="horizontal">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes.container}
          >
            {data.columnsOrder.map((columnId, idx) => {
              const column = data.columns[columnId];
              const tasks = column.tasks.map(taskId => data.tasks[taskId]);

              return (
                <Column
                  key={columnId}
                  column={column}
                  tasks={tasks}
                  index={idx}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default withStyles(({}) =>
  createStyles({
    container: {
      display: "flex"
    }
  })
)(App);
