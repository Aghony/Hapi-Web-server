server.route({
  method:'GET',
  path:'/users/{username}',
  handler: (request, h) => {
    const { username = 'stranger'} = request.params;
    return `Hello, ${Username}!`;
  },
});