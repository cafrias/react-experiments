export const initialData = {
  tasks: {
    t1: { id: "t1", content: "Clean microwave oven" },
    t2: { id: "t2", content: "Feed cats" },
    t3: { id: "t3", content: "Work on world's destruction" }
  },
  columns: {
    c1: { id: "c1", title: "Pending", tasks: ["t1", "t2", "t3"] },
    c2: { id: "c2", title: "Doing", tasks: [] },
    c3: { id: "c3", title: "Done", tasks: [] }
  },
  columnsOrder: ["c1", "c2", "c3"]
};
