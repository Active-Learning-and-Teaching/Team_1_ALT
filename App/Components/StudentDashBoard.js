import React, {Component} from 'react';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import {
    Button,
    StyleSheet,
    View,
    Alert, ScrollView, SafeAreaView,
} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import CourseCard from './CourseCard';
import {Icon} from 'react-native-elements';
import Student from '../Databases/Student';
import CourseAdd from './CourseAdd';
import * as config from '../config';
import Courses from '../Databases/Courses';

export default class StudentDashBoard extends Component {
    constructor() {
        super();
        this.state = {
            currentUser : null,
            courseList: []
        };
    }

    getCurrentUser = async () => {
        const currentUser = await auth().currentUser;
        const student = new Student()
        student.setID(currentUser.uid)
        student.setName(currentUser.displayName)
        student.setEmail(currentUser.email)
        await student.setUrl().then(()=>{console.log()})

        await this.setState({
            currentUser : student
        })
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut()
            this.props.navigation.navigate('Login')
        }
        catch (error) {
            auth()
                .signOut()
                .then(
                    this.props.navigation.navigate('Login')
                )
                .catch(err => {
                    Alert.alert(err.message)
                })
        }
    }

    getAllCourses = ()=>{
        database()
            .ref(config['internalDb']+'/Student/'+this.state.currentUser.url)
            .on('value', snapshot => {
                if (snapshot.val()){
                    const keys = Object(snapshot.val());
                    if ("courses" in keys) {
                        const arr = snapshot.val()["courses"].filter(n=>n)
                        const course = new Courses()
                        const courses = []

                        for(var i=0; i<arr.length; i++){
                            course.getCourseByUrl(arr[i])
                                .then(r => {
                                    courses.push(r)
                                    this.setState({
                                        courseList : courses
                                    })
                                })
                        }
                    }
                }
            })
    }


    componentDidMount(){
        this.getCurrentUser().then(() =>{
            this.getAllCourses()
        })
    }

    render(){
        return(
            <SafeAreaView style={styles.safeContainer}>
                <ScrollView>

                    <CourseAdd student = {this.state.currentUser} type = {"student"} />


                    {/*<Icon name='plus' type='font-awesome' style={{borderRadius:1}} />*/}
                    <View style={styles.grid}>
                        {this.state.courseList.map(({courseName, instructor, imageURL},i)=> (
                            <CourseCard coursename = {courseName} instructor = {instructor} imageURL={imageURL} key={i}/>
                        ))}
                    </View>

                    <Button style={styles.buttonMessage} title="SignOut" onPress={this.signOut} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    grid: {
        marginTop: 10,
        marginBottom: 10,
        paddingTop : 10,
        paddingBottom : 10,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    },
    buttonMessage: {
        paddingTop : 10,
        marginTop: 15
    },
});

