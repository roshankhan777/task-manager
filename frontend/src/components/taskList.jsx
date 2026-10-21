import { CircularProgress, List, Paper, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import TaskItem from "./taskItem";

export default function TaskList({ onEdit }) {
  const { items, filter, loading } = useSelector((state) => state.tasks);

  const visibleTasks = items.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Done") return task.completed;
    return true;
  });

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (visibleTasks.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
        No products here yet.
      </Typography>
    );
  }

  return (
    <Paper>
      <List disablePadding>
        {visibleTasks.map((task) => (
          <TaskItem key={task._id} task={task} onEdit={onEdit} />
        ))}
      </List>
    </Paper>
  );
}