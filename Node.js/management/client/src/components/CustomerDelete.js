import styled from "styled-components";

const DeleteBtn = styled.button`
  background-color: rgb(256, 40, 100);
  border: none;
  border-radius: 3px;
  color: whitesmoke;
  width: 50px;
  padding: 5px;
  cursor: pointer;
`;

function CustomerDelete({ id, stateRefresh }) {
  const deleteCustomer = () => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    }).then((response) => {
      stateRefresh();
    });
  };

  return <DeleteBtn onClick={deleteCustomer}>삭제</DeleteBtn>;
}

export default CustomerDelete;
