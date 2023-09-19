import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import supportedLanguages from "../../../utils/supportedLanguages";

function ModeSelector({ selected, onSelect, open }) {
  const [selectedMode, setSelectedMode] = useState(selected);

  useEffect(() => {
    setSelectedMode(selected);
  }, [selected]);

  return (
    <Dialog open={open} fullWidth onClose={() => onSelect(selected)}>
      <DialogTitle>Select Language</DialogTitle>
      <DialogContent>
        <Autocomplete
          fullWidth
          size="small"
          disableClearable
          value={selected}
          options={supportedLanguages}
          getOptionLabel={(e) => e.label}
          onChange={(_, value) => setSelectedMode(value)}
          renderInput={(props) => <TextField {...props} color="primary" />}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSelect(selectedMode)}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModeSelector;
