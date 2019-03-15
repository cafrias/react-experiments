import React from "react";

import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";

import Typography from "@material-ui/core/Typography";

import { withStyles, createStyles } from "@material-ui/core/styles";

const Task = ({ task, classes, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classNames(classes.container, {
            [classes.isDragging]: snapshot.isDragging
          })}
        >
          <Typography variant="body1">{task.content}</Typography>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(
  withStyles(({ spacing, palette, shadows }) =>
    createStyles({
      container: {
        backgroundColor: "#fff",
        padding: `${spacing.unit * 2}px`,
        marginBottom: `${spacing.unit}px`,
        border: `1px solid ${palette.grey[300]}`,
        transition: "box-shadow 150ms ease",
        boxShadow: shadows[0]
      },
      isDragging: {
        boxShadow: shadows[2]
      }
    })
  )(Task)
);
