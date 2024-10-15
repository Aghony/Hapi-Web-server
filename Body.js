server.rout ({
  method: 'POST',
  path: 'login',
  handler: (request, h) => {
    const { username, password } = request.payload;
    return `Welcome &{username}!`;
  }, 
});

// output {"username": "harrypotter", "password": "encryptedpassword"}