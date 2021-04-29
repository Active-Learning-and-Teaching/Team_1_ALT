/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable eol-last */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable indent */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// const url = 'https://testdb-cloudfn.firebaseio.com/'
const url = 'https://testfortls.firebaseio.com/';
// const url = 'https://tls-op-default-rtdb.firebaseio.com/'
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// async function getURLFromPasscode(passCode){
//     const db_ref = admin.app().database(url).ref('InternalDb/Courses/');
//     let courseURL;
//     await db_ref.orderByChild("passCode").equalTo(passCode).once("value",
//           function(snapshot) {
//             courseURL = Object.keys(snapshot.val())[0].replace(' ', '');
//           },
//           function (errorObject) {
//             console.log("The read failed: " + errorObject.code);
//           }
//     );
//     return courseURL
// }

// async function deleteAllMatchingKey(table,key, childKey) {
//     const db_ref = admin.app().database(url).ref('InternalDb/'+table+'/');
//     db_ref.orderByChild(childKey).equalTo(key).once("value", function(snapshot) {
//       console.log('starting to remove from table '+table)
//       snapshot.forEach(function(child){
//         console.log(child.key);
//         child.ref.remove().then(()=>{
//           console.log()
//         });
//       });
//     }, function (errorObject) {
//       console.log("The read failed: " + errorObject.code);

//     }).then(()=>{
//       console.log("Done");
//     }).catch((error)=>{
//       console.log(error);
//     });

// }

// async function deleteCourseHelper(passCode, courseURL){
//     await deleteAllMatchingKey('Courses',passCode, "passCode")
//     await deleteAllMatchingKey('Announcements',passCode, "passCode")
//     await deleteAllMatchingKey('KBC',passCode, "passCode")
//     await deleteAllMatchingKey('KBCResponse',passCode, "passCode")
//     await deleteAllMatchingKey('Feedback',passCode, "passCode")
//     await deleteAllMatchingKey('FeedbackResponse',passCode, "passCode")
//     console.log("Starting remove from student list");
//     removeFromStudentList(courseURL);
//     console.log("Starting remove from faculty list");
//     removeCourseFromFacultyList(courseURL);
// }

// exports.deleteCourse = functions.https.onCall(async (data,context) => {

//   //  flow : 1. del announcements
//   // 2. del student registerations ,faculty registrations
//   // getting all announcements and deleting them
//   const passCode = data.passCode;
//   console.log("Got passCode to delete "+ passCode)
//   let courseURL = await getURLFromPasscode(passCode);
//   await deleteCourseHelper(passCode, courseURL);
//   return 'done';
// });

// function removeFromStudentList(courseKey){
//   const student = admin.app().database(url).ref('InternalDb/Student/');
//   student.once("value", function(snapshot){
//     snapshot.forEach(el=>{
//       let studentKey = el.ref.path.pieces_.reverse()[0];
//       const thisStudent = admin.app().database(url).ref('InternalDb/Student/'+studentKey+'/courses');
//       thisStudent.once("value", function(snapshot){
//         snapshot.forEach((el)=>{
//           if(el.val() === courseKey){
//             el.ref.remove().then(()=>{
//               console.log();
//             });
//           }
//         })
//       }).then(()=>{
//         console.log();
//       })
//     })
//   }).then(()=>{
//     console.log();
//   })
// }

// function removeCourseFromFacultyList(courseKey){
//   const student = admin.app().database(url).ref('InternalDb/Faculty/');
//   student.once("value", function(snapshot){
//     snapshot.forEach(el=>{
//       let facultyKey = el.ref.path.pieces_.reverse()[0];
//       const thisStudent = admin.app().database(url).ref('InternalDb/Faculty/'+facultyKey+'/courses');
//       thisStudent.once("value", function(snapshot){
//         snapshot.forEach((el)=>{
//           if(el.val() === courseKey){
//             el.ref.remove().then(()=>{
//               console.log();
//             });
//           }
//         })
//       }).then(()=>{
//         console.log();
//       })
//     })
//   }).then(()=>{
//     console.log();
//   })
// }

// function removeFromFacultyList(key){
//   const faculty = admin.app().database(url).ref('InternalDb/Faculty/'+key+'/courses');
//   faculty.once("value", function(snapshot){
//     snapshot.forEach((el)=>{
//       removeFromStudentList(el.val())
//       el.ref.remove().then(()=>{
//         console.log();
//       });
//     })
//   }).then(()=>{
//     console.log();
//   })
// }

// function delCoursesOfFaculty(facultyKey){
//   console.log("Called");
//   removeFromFacultyList(facultyKey);
// }

// function deleteStudentHelper(studentID){
//   deleteAllMatchingKey("KBCResponse", studentID, "userID");
//   deleteAllMatchingKey("FeedbackResponse", studentID, "userID");
// }

// exports.deleteStudent = functions.https.onCall((data, context) =>{
//   studentID = data.key;
//   userUID = data.userUID;
//   console.log("Student ID: " + studentID);
//   console.log("Recieved data");
//   console.log(data);
//   console.log(context);
//   dbRef = admin.app().database(url).ref('InternalDb/Student/' + studentID);
//   dbRef.once("value", function(snapshot){
//     if (snapshot.val()){
//       deleteStudentHelper(studentID);
//       snapshot.ref.remove().then(()=>{
//         console.log();
//       });
//       return "removed";
//     }
//     else{
//       return "error while removing";
//     }
//   }, function (errorObject) {
//     console.log("The student read failed: " + errorObject.code);
//     return "Error";
//   }).then(()=>{
//     console.log();
//   });
//   admin
//   .auth()
//   .deleteUser(userUID)
//   .then(() => {
//     console.log('Successfully deleted user from firebase auth');
//   })
//   .catch((error) => {
//     console.log('Error deleting user from firebase auth:', error);
//   });
// });

// exports.deleteFaculty = functions.https.onCall((data,context) => {
//   // key = data.body['key'];
//   let key = data.key;
//   let userUID = data.uid;
//   console.log("Faculty KEY "+ key )
//   console.log("recieved data")
//   console.log(data)
//   console.log(context)
//   db_ref = admin.app().database(url).ref('InternalDb/Faculty/'+key)
//   db_ref.once("value", function(snapshot)
//   {
//     console.log(snapshot.val());
//     if(snapshot.val()['courses']){
//     snapshot.val()['courses'].forEach(function(child)
//     {
//       console.log("Removing course of key " + child);
//       course_ref = admin.app().database(url).ref('InternalDb/Courses/'+child)
//       course_ref.once("value",
//         function(courseSnapshot){
//             if(courseSnapshot.val()){
//               var passcode  = courseSnapshot.val()['passCode'];
//               deleteCourseHelper(passcode, child);
//             }
//           }
//         ,
//         function (errorObject) {
//           console.log("The Course read failed: " + errorObject.code);
//           // res.send("ERROR");
//           return "Error";
//         }
//       ).then(()=>{
//         console.log();
//       });
//     });
//     delCoursesOfFaculty(key);
//     snapshot.ref.remove().then(()=>{
//       console.log();
//     });
//     context.send("removed");
//     return "removed"
//     }
//     else{
//       // res.send("error while removing");
//       return "error while removing"
//     }
//   }, function (errorObject) {
//     console.log("The faculty read failed: " + errorObject.code);
//     // res.send("ERROR")
//     return "Error";
//   }).then(()=>{
//     console.log();
//   });
//   admin
//   .auth()
//   .deleteUser(userUID)
//   .then(() => {
//     console.log('Successfully deleted user from firebase auth');
//   })
//   .catch((error) => {
//     console.log('Error deleting user from firebase auth:', error);
//   });
// });

// exports.sendNotificationToTopic_New = functions.firestore
//   .document('Course/{uid}')
//   .onWrite(async (event) => {
//     // let docID = event.after.id;
//     const title = event.after.get('title');
//     const content = event.after.get('content');
//     var message = {
//       notification: {
//         title: title,
//         body: content,
//       },
//       topic: 'Course',
//     };

//     console.log(message);
//     const response = await admin.messaging().send(message);
//     console.log(response);
//   });

exports.sendPushNotificationQuiz = functions.database
  .ref('InternalDb/KBC/{qid}') // Put your path here with the params.
  .onWrite(async (change, context) => {
    try {
      const {after} = change;
      const {_data} = after;
      const {_path} = after;
      console.log('------------------');
      console.log('function Quiz Notification executing');
      //console.log(_path);
      //console.log(after);
      console.log('------------------');

      //console.log(_data.passCode);
      //console.log(context);
      //console.log(after);

      if (!_data.emailResponse && _data.quizType != '') {
        const payload = {
          notification: {
            title: 'Quiz Notification',
            body: `A New Quiz 📋has been started By instructor ${
              _data.instructor
            } !`,
          },
          topic: _data.passCode, // Passing the path params along with the notification to the device. [optional]
        };
        return await admin.messaging().send(payload);
      }
    } catch (ex) {
      return console.error('Error:', ex.toString());
    }
  });

exports.sendPushNotificationFeedback = functions.database
  .ref('InternalDb/Feedback/{id}') // Put your path here with the params.
  .onWrite(async (change, context) => {
    try {
      const {after} = change;
      const {_data} = after;
      const {_path} = after;
      console.log('------------------');
      console.log('function Feedback Notification executing');
      //console.log(_path);
      //console.log(after);
      console.log(context);
      console.log(_data.startTime);
      console.log(context.timestamp);
      console.log('------------------');
      var str1 = _data.startTime;

      str1 = str1.replace('/', '-');
      str1 = str1.replace('/', '-');

      var newdate = str1
        .split('-')
        .reverse()
        .join('-');
      console.log(newdate);
      var t = new Date(newdate);
      console.log(t);

      console.log(new Date().toString().split('GMT')[0] + ' UTC');

      //console.log(_data.passCode);
      //console.log(context);
      //console.log(after);

      if (!_data.emailResponse && _data.startTime != '') {
        const Noitfier = {
          notification: {
            title: 'FeedBack Notification',
            body: `A New FeedBack has been started By instructor ${
              _data.instructor
            } !`,
          },
          topic: _data.passCode, // Passing the path params along with the notification to the device. [optional]
        };
        return await admin.messaging().send(Noitfier);
      }
    } catch (ex) {
      return console.error('Error:', ex.toString());
    }
  });

exports.Annoucements = functions.database
  .ref('InternalDb/Announcements/{a_id}') // Put your path here with the params.
  .onWrite(async (change, context) => {
    try {
      const {after} = change;
      const {_data} = after;
      const {_path} = after;
      console.log('------------------');
      console.log('function Annoucement Notification executing');
      //console.log(_path);
      //console.log(after);
      console.log('------------------');

      //console.log(_data.passCode);
      //console.log(context);
      //console.log(after);

      const Announce = {
        notification: {
          title: `New Annoucement -> ${_data.heading}`,
          body: `${_data.description}`,
        },
        topic: _data.passCode, // Passing the path params along with the notification to the device. [optional]
      };
      return await admin.messaging().send(Announce);
    } catch (ex) {
      return console.error('Error:', ex.toString());
    }
  });
