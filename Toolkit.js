// server.route({
//   method: 'GET',
//   path: '/',
//   handler: function (request, h) {
//     return 'HomePage';
//   },
// },
// {
//   method: 'GET',
//   path: '/user',
//   handler: function (request, h) {
//     return h.response('create').code(201);
//   },
// });


// Detailed notation
const handler = (request, h) => {
  const response = h.response('success');
  response.type('text/plain');
  response.header('Custom-Header', 'some-value');
  return response;
};

// Chained notation
// const handler = (request, h) => {
//   return h.response('success')
//       .type('text/plain')
//       .header('Custom-Header', 'some-value');
// };