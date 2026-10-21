import { useEffect, useState } from "react";
import { Box, Button, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/taskSlice";

export default function TaskForm({ editingTask, onFinish }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  // edit dabane par task ka data form mein aa jaye
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setPriority("Medium");
    }
    setError("");
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a product title");
      return;
    }

    if (editingTask) {
      dispatch(updateTask({ id: editingTask._id, changes: { title, priority } }));
    } else {
      dispatch(addTask({ title, priority }));
    }

    setTitle("");
    setPriority("Medium");
    setError("");
    onFinish();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {editingTask ? "Edit Product" : "Add New Product"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}
      >
        <TextField
          label="Product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          size="small"
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          size="small"
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <Button type="submit" variant="contained">
          {editingTask ? "Update" : "Add"}
        </Button>
        {editingTask && (
          <Button variant="outlined" onClick={onFinish}>
            Cancel
          </Button>
        )}
      </Box>
    </Paper>
  );
}