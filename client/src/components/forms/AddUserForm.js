import * as React from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Typography,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";

export default function AddUserForm() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: [],
  });
  function handleChange(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  function handleSubmit(e) {
    Axios.post("http://localhost:5000/api/user/add", {
      name: data.name,
      phoneNumber: data.phoneNumber,
      email: data.email,
      hobbies: data.hobbies,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Some Error Occured!"));
    setOpen(!open)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth="sm">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pl: 3, pt: 1, pr: 1 }}
        >
          <Typography>Edit Staff</Typography>
          <Button variant="text" onClick={handleClose} sx={{ color: "black" }}>
            <CloseIcon />
          </Button>
        </Grid>
        <Box sx={{ bgcolor: "#F5F5F5", p: 2.5 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ color: "black" }}>User Name*</Typography>
                <TextField
                  required
                  fullWidth
                  placeholder="Enter here"
                  name="name"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6} container spacing={1}>
                <Typography sx={{ color: "black" }}>Phone Number*</Typography>
                <TextField
                  required
                  fullWidth
                  placeholder="Enter here"
                  name="phoneNumber"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: "black" }}>Email*</Typography>
                <TextField
                  required
                  fullWidth
                  placeholder="Select"
                  name="email"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: "black" }}>Hobbies*</Typography>
                <TextField
                  required
                  fullWidth
                  placeholder="Select"
                  name="hobbies"
                  variant="outlined"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6} container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="reset"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{ color: "#1602FF", borderColor: "#1602FF" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    text="Submit"
                    variant="contained"
                    size="large"
                    sx={{ color: "#FFFFFF", bgcolor: "#1602FF" }}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
