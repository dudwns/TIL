function CustomerDelete({ id, stateRefresh }) {
  const deleteCustomer = () => {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "DELETE",
    }).then((response) => {
      stateRefresh();
    });
  };

  return <button onClick={deleteCustomer}>삭제</button>;
}

export default CustomerDelete;
