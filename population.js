const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://dbNaveen:nksniper007@cluster0.twfi3.mongodb.net/exercise?retryWrites=true&w=majority';
(async() => {
    try {
        const result = await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false })
        console.log('connect.....')
    } catch (error) {
        console.log(error)
    }
})();

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course1', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author','name -_id')
    .select('name');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '60f8603ee158eb0204173bc2')

 listCourses();