import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomerDelete from "./CustomerDelete";
function Customer({ name, birthday, gender, job, id, image, stateRefresh }) {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <img src={image} style={{ width: 64, height: 64 }} alt="profile" />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{birthday}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{job}</TableCell>
      <TableCell>
        <CustomerDelete id={id} stateRefresh={stateRefresh} />
      </TableCell>
    </TableRow>
  );
}

export default Customer;
