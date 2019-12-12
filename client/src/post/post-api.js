export const create = (userId, token, post) => {
  console.log("USER DATA UPDATE: ", user);
  return fetch(`${process.env.REACT_APP_API}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applicaiton/json",
      Authorization: `Bearer${token}`
    },
    body: post
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
