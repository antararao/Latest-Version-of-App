import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Header, Icon, AirBnBRating} from 'react-native-elements'
import {axios} from 'axios'
import { RFValue } from 'react-native-responsive-fontsize'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            movieDetails: {}
        }
    }

    timeConvert(minutes)
    {
        var hours = Math.floor(minutes/60) 
        var minute = minutes%60   
        return `${hours}hrs ${minute}min`
    }   
    componentDidMount(){
        this.getMovie()
    }

    getMovie = () => {
        const url = "http://localhost:5000/get-movie"
        axios.get(url).then(responds => {
            var details = responds.data.data
            details["duration"] = this.timeConvert(details.duration)
            this.setState({movieDetails: details})
        }).catch(error=>{console.log(error.message)})
    }
    likedMovie = () => {
        const url = "http://localhost:5000/liked-movie"
        axios.post(url).then(responds => {
            this.getMovie()
        }).catch(error=>{console.log(error.message)})
    }

    dislikedMovie = () => {
        const url = "http://localhost:5000/disliked-movie"
        axios.post(url).then(responds => {
            this.getMovie()
        }).catch(error=>{console.log(error.message)})
    }
    notWatchedMovie = () => {
        const url = "http://localhost:5000/did-not-watch-movie"
        axios.post(url).then(responds => {
            this.getMovie()
        }).catch(error=>{console.log(error.message)})
    }

    render(){
        const {movieDetails}= this.state
        if (movieDetails.poster_link){
            const{poster_link,title,release_date_duration,overview,rating}= movieDetails
            return(
                <View style = {styles.container}>
                    <View style = {styles.headerContainer}>
                        <Header centerComponent = {{text:"Movies",style:styles.headerTitle}}
                        rightComponent = {{icon:"movie-open",color:"white",type:"material-community",
                        onPress:()=>this.props.navigation.navigate("Recommendations")}}
                        backgroundColor = {"#pink"} containerStyle = {{flex:1}}></Header>
                    </View>
                    <View style = {styles.subContainer}>
                        <View style = {styles.subTopContainer}>
                            <Image style = {styles.posterImage}
                            source = {{uri:poster_link}}></Image>
                        </View>
                        <View style = {styles.subBottomContainer}>
                            <View style = {styles.upperBottomContainer}>
                                <Text style = {styles.title}>{title}</Text>
                                <Text style = {styles.subtitle}>{`${release_date.split("-")[0]}|${duration}`}</Text>
                            </View>
                            <View style = {styles.middleBottomContainer}>
                                <View style = {{flex: 0.3}}>
                                    <AirBnBRating count = {10} defaultRating = {rating} size = {RFValue(25)} starContainerStyle = {{marginTop:-30}} isDisabled = {true}></AirBnBRating>
                                </View>
                                <View style = {{flex: 0.7, padding:15}}>
                                    <Text style = {styles.overview}>{overview}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return null 
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    headerContainer: {
      flex: 0.1
    },
    headerTitle: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: RFValue(18)
    },
    subContainer: {
      flex: 0.9
    },
    subTopContainer: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center"
    },
    posterImage: {
      width: "60%",
      height: "90%",
      resizeMode: "stretch",
      borderRadius: RFValue(30),
      marginHorizontal: RFValue(10)
    },
    subBottomContainer: {
      flex: 0.6
    },
    upperBottomContainer: {
      flex: 0.2,
      alignItems: "center"
    },
    title: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      textAlign: "center"
    },
    subtitle: {
      fontSize: RFValue(14),
      fontWeight: "300"
    },
    middleBottomContainer: {
      flex: 0.35
    },
    overview: {
      fontSize: RFValue(13),
      textAlign: "center",
      fontWeight: "300",
      color: "gray"
    },
    lowerBottomContainer: {
      flex: 0.45
    },
    iconButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    buttonCotainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      width: RFValue(160),
      height: RFValue(50),
      borderRadius: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      marginTop: RFValue(15)
    },
    buttonText: {
      fontSize: RFValue(15),
      fontWeight: "bold"
    }
  });