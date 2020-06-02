import database from '@react-native-firebase/database';
import * as config from '../config';

class Student {

    id :string
    name :string
    email : string
    url : string

    constructor() {
    }

    setID(id){
        this.id = id;
    }

    setName(name){
        this.name = name;
    }
    setEmail(email){
        this.email = email;
    }

    getID(){
        return this.id
    }

    getName(){
        return this.name
    }

    getEmail(){
        return this.email
    }

    setUrl(){
        this.getStudent(this.email)
            .then( val => {
                    this.url = val
                }
            )
    }

    getUrl(){
        return this.url
    }

    reference = database().ref(config['internalDb']+'/Student/')

    //Login
     getUser  = async (email)=> {
        let ans = false
        await this.reference
            .orderByChild("email")
            .equalTo(email)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()){
                    ans = true
                }
            })
         return ans
    }

    getStudent  = async (email)=> {
        let ans = ""
        await this.reference
            .orderByChild("email")
            .equalTo(email)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()){
                    const keys = Object.keys(snapshot.val());
                    ans = keys[0]
                }
            })
        return ans
    }

    createUser =  (id, name, email)=>{
        console.log(id)
        this.reference
            .push()
            .set({
                name : name,
                email : email,
                photo : "0",
                id : id
            })
            .then(()=>{
                console.log('Data added')
            })
    }

    getCourseStudent = async () =>{
        let ans = []
        await database()
            .ref(config['internalDb']+'/Student/'+this.url)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()){
                    const keys = Object(snapshot.val());
                    if ("courses" in keys)
                        ans = keys["courses"].map(x=>x)
                }
            })
        return ans
    }

    setCourseStudent = async (courses) =>{
        await database()
            .ref(config['internalDb']+'/Student/'+this.url)
            .set({
                name : this.getName(),
                email : this.getEmail(),
                photo : 0,
                id : this.getID(),
                courses : courses
            })
            .then(()=>{
                console.log("Courses added")
            })
    }

    addCourseStudent = async (courseUrl) => {
        await this.getCourseStudent().then(
            value => {
                value.push(courseUrl)
                this.setCourseStudent(value)
            }
        )
    }

}


export default Student;
