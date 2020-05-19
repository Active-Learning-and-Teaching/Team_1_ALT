import database from '@react-native-firebase/database';
import * as config from '../config';
import student from './Student';

class Faculty {

    id :string
    name :string
    email : string

    constructor() {
    }

    reference = database().ref(config['internalDb']+'/Faculty/')

    checkFaculty = (email)=> {
        database()
            .ref(config['sheetFaculty'])
            .orderByChild("Email")
            .equalTo(email)
            .once("value")
            .then(snapshot => {

                if (snapshot.val()) {
                    // faculty.getUser(userInfo.user.id, userInfo.user.name, userInfo.user.email)
                    // this.props.navigation.navigate('Faculty DashBoard')
                    return true
                }
                else{
                    // student.getUser(userInfo.user.id, userInfo.user.name, userInfo.user.email);
                    // this.props.navigation.navigate('Student DashBoard')
                    return false
                }
            })
    }

    getUser = async (id, name, email) => {
        await this.reference
            .orderByChild("email")
            .equalTo(email)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()){
                    console.log("true")
                }
                else{
                    console.log("false")
                    this.createUser(id, name, email)
                }
            })
    }

    createUser =  (id, name, email)=>{
        console.log(id)
        this.reference
            .push()
            .set({
                name : name,
                email : email,
                photo : null,
                id : id
            })
            .then(()=>{
                console.log('Data added')
            })
    }
}

const faculty = new Faculty()
export default faculty;
