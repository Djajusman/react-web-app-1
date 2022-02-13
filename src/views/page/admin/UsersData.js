var usersData = [];
var totalPage = 0;
fetch(`https://auth.aktiv.co.id/api/auth/v1/user/me`, {
  method: "GET",
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    this.setState({
      usersData: data.data,
      // curr_page:page,
      totalPage: data.data.totalPage,
    });
  })
  .catch((error) => console.log(error));
//   console.log(data);
// })
// // .catch((error) => {
// //   console.log(error);
// // });

export default usersData;
export var totalPage;
