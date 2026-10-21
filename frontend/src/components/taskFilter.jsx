import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";

export default function TaskFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <ToggleButtonGroup
        color="primary"
        size="small"
        exclusive
        value={filter}
        onChange={(e, value) => value && dispatch(setFilter(value))}
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Pending">Pending</ToggleButton>
        <ToggleButton value="Done">Done</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}