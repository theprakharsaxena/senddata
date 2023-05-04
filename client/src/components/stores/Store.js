import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import { Button } from "@mui/material";
import EditStaffForm from "../forms/EditStaffForm";
import axios from "axios";
// import sgMail from "@sendgrid/mail";

// console.log();
// sgMail.setApiKey(
//   "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"
// );

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Full Name",
    width: 150,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    width: 300,
    editable: true,
  },
  {
    field: "hobbies",
    headerName: "Hobbies",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      const id = params.row._id;
      const name = params.row.name;
      const phoneNumber = params.row.phoneNumber;
      const email = params.row.email;
      const hobbies = params.row.hobbies;
      return (
        <EditStaffForm
          id={id}
          name={name}
          phoneNumber={phoneNumber}
          email={email}
          hobbies={hobbies}
        />
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      const handleDelete = () => {
        // Implement the delete functionality here, using params.row._id to get the ID of the row to delete
        // console.log(`Deleting row ${params.row._id}`);
        axios
          .delete(`http://localhost:5000/api/user/delete/${params.row._id}`)
          .then((response) => {
            console.warn(response.data);
            // getData();
          })
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      );
    },
  },
];

export default function Store() {
  const [data, setData] = React.useState([]);
  const [selectedIds, setSelectedIds] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/api/user");
    const dataWithIds = response.data.map((row) => ({
      ...row,
      id: row._id,
    }));
    setData(dataWithIds);
  };

  const handleClick = () => {
    selectedIds.map((id) => {
      axios
        .get(`http://localhost:5000/api/user/${id}`)
        .then((response) => {
          // sgMail
          //   .send({
          //     to: "info@redpositive.in@example.com",
          //     from: "prakharsaxena5125@example.com",
          //     subject: "My Data",
          //     text: JSON.stringify(response.data),
          //   })
          //   .then(() => console.log("Email sent"))
          //   .catch((error) => console.error(error));
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        onClick={handleClick}
        variant="contained"
        color="secondary"
        sx={{ display: "flex", width: "10rem", mb: "1rem" }}
      >
        Send
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedIds(ids)}
      />
    </Box>
  );
}
