const fetch = require('node-fetch');

async function checkHumanFace(imageUrl) {
  const response = await fetch('http://localhost:5001/check_face', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: imageUrl }),
  });
  const data = await response.json();
  return data.result;
}

module.exports = { checkHumanFace };
