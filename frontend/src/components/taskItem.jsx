import { Checkbox, Chip, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/taskSlice";

const priorityColor = { High: "error", Medium: "warning", Low: "success" };

export default function TaskItem({ task, onEdit }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTask({ id: task._id, changes: { completed: !task.completed } }));
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <ListItem divider>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox checked={task.completed} onChange={handleToggle} />
      </ListItemIcon>

      <ListItemText
        primary={task.title}
        sx={{ textDecoration: task.completed ? "line-through" : "none", wordBreak: "break-word" }}
      />

      <Chip label={task.priority} size="small" color={priorityColor[task.priority]} sx={{ mr: 1 }} />

      <IconButton onClick={() => onEdit(task)} size="small" color="primary">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={handleDelete} size="small" color="error">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}