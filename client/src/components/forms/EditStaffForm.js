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

export default function EditStaffForm({
  id,
  name,
  phoneNumber,
  email,
  hobbies,
}) {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState(name);
  const [userPhoneNumber, setUserPhoneNumber] = React.useState(phoneNumber);
  const [userEmail, setUserEmail] = React.useState(email);
  const [userHobbies, setUserHobbies] = React.useState(hobbies);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateStaff = (e) => {
    let item = {
      name: userName,
      phoneNumber: userPhoneNumber,
      email: userEmail,
      hobbies: userHobbies,
    };
    console.log(item);
    fetch(`http://localhost:5000/api/user/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
      });
    });
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Edit
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
          <form method="put" onSubmit={updateStaff}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ color: "black" }}>User Name*</Typography>
                <TextField
                  required
                  fullWidth
                  placeholder="Enter here"
                  name="name"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
                  value={userPhoneNumber}
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
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
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
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
                  value={userHobbies}
                  onChange={(e) => setUserHobbies(e.target.value)}
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
