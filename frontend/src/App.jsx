import { useEffect, useState } from "react";
import { Alert, AppBar, Container, Snackbar, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchTasks } from "./redux/taskSlice";
import TaskForm from "./components/taskForm";
import TaskFilter from "./components/taskFilter";
import TaskList from "./components/taskList";

export default function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.tasks.error);
  const [editingTask, setEditingTask] = useState(null);

  // page khulte hi saare tasks laao
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Footwear Product Task Manager</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 3, mb: 5 }}>
        <TaskForm editingTask={editingTask} onFinish={() => setEditingTask(null)} />
        <TaskFilter />
        <TaskList onEdit={setEditingTask} />
      </Container>

      <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={() => dispatch(clearError())}>
        <Alert severity="error" onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}