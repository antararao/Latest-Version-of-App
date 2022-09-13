import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Header, Icon, AirBnBRating} from 'react-native-elements'
import {axios} from 'axios'
import { RFValue } from 'react-native-responsive-fontsize'

export default class Recommendations extends React.Component{
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
    keyExtractor = (item, index) => index.toString()
    renderItems = (item, index) => {
        return(
            <Card
            key = {`card-${index}`}
            image = {{uri:item.poster_link
            }}
            imageProps = {{resizeMode: "cover"}}
            featuredTitle = {item.title}
            containerStyle = {styles.cardContainer}
            featuredTitleStyle = {styles.title}
            >
        
            
            
            
            
            
            
            
            </Card>
        )
    }
    render()
    {
        const {movieDetails} = this.state
        return(
            <View style = {styles.container}>
                <FlatList data = {movieDetails} keyExtractor = {this.keyExtractor} renderItem = {this.renderItem}></FlatList>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    title: {
      color: "#fff",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(25),
      marginTop: RFValue(65)
    },
    subtitle: {
      fontWeight: "bold",
      alignSelf: "flex-start",
      paddingLeft: RFValue(15),
      fontSize: RFValue(15)
    },
    cardContainer: {
      flex: 1,
      borderRadius: RFValue(10),
      justifyContent: "center",
      height: RFValue(110),
      marginBottom: RFValue(20)
    }
  });
  