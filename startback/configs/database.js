const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/movieDB');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  console.log('Connected successfully to server');
}

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => mongoose.close('mongodb://localhost:27017/test'));