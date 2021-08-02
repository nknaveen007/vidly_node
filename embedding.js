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

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author1', authorSchema);

const Course = mongoose.model('Course2', new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required:true
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

const updateCourse = async () => {
  console.log('starts from here')
  const result = await Course.updateOne({ _id: '60f91ab46c3f570494a8ebeb' }, { $set: { 'author.name': 'mosh hamadani' } })
  console.log(result)
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateCourse()
listCourses()