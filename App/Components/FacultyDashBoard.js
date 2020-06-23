import React, {Component} from 'react';
import auth from '@react-native-firebase/auth'
import {
    Button,
    StyleSheet,
    View,
    Alert, ScrollView, SafeAreaView,
} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import CourseAdd from './CourseAdd';
import Faculty from '../Databases/Faculty';
import database from '@react-native-firebase/database';
import * as config from '../config';
import Courses from '../Databases/Courses';
import CourseCard from './CourseCard';

export default class FacultyDashBoard extends Component {
    constructor() {
        super();
        this.state = {
            currentUser : null,
            courseList: []
        };
    }

    getCurrentUser = async () => {
        const currentUser = await auth().currentUser;
        const faculty = new Faculty()
        await faculty.setID(currentUser.uid)
        await faculty.setName(currentUser.displayName)
        await faculty.setEmail(currentUser.email)
        await faculty.setUrl().then(()=>{console.log()})

        await this.setState({
            currentUser : faculty
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
            .ref(config['internalDb']+'/Faculty/'+this.state.currentUser.url)
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
            if(this.state.currentUser.url==""){
                this.componentDidMount()

            }
            this.getAllCourses()
        })
    }

    render(){
        return(
            <SafeAreaView style={styles.safeContainer}>
                <ScrollView>

                    <CourseAdd instructor = {this.state.currentUser} type = {"faculty"} />


                    {/*<Icon name='plus' type='font-awesome' style={{borderRadius:1}} />*/}
                    <View style={styles.grid}>
                        {this.state.courseList.map((item,i)=> (
                            <CourseCard course = {item} type = {"faculty"}  user = {this.state.currentUser} navigation ={this.props.navigation}  key={i}/>
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
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    },
    buttonMessage: {
        paddingTop : 10,
        marginTop: 15
    }
});

