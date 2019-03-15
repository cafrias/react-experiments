import React from "react";

import classNames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Task from "./task";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import RootRef from "@material-ui/core/RootRef";

import { withStyles, createStyles } from "@material-ui/core/styles";

function Column({ column, tasks, classes, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <RootRef rootRef={provided.innerRef}>
          <Card {...provided.draggableProps} className={classes.column}>
            <CardHeader {...provided.dragHandleProps} title={column.title} />
            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <RootRef rootRef={provided.innerRef}>
                  <CardContent
                    className={classNames(classes.draggable, {
                      [classes.isDraggingOver]: snapshot.isDraggingOver
                    })}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, idx) => (
                      <Task key={task.id} task={task} index={idx} />
                    ))}
                    {provided.placeholder}
                  </CardContent>
                </RootRef>
              )}
            </Droppable>
          </Card>
        </RootRef>
      )}
    </Draggable>
  );
}

export default withStyles(({ palette, spacing }) =>
  createStyles({
    column: {
      width: `${spacing.unit * 100}px`,
      minHeight: `${spacing.unit * 100}px`,
      margin: `0 ${spacing.unit * 2}px`,
      display: "flex",
      flexDirection: "column"
    },
    draggable: {
      flexGrow: 1,
      backgroundColor: "#fff",
      transition: "background-color 200ms ease"
    },
    isDraggingOver: {
      backgroundColor: palette.grey[100]
    }
  })
)(Column);
