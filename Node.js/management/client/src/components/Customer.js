import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
function Customer({ name, birthday, gender, job, id, image }) {
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
    </TableRow>
  );
}

export default Customer;
