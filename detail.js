import React from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Divider,Tile } from 'react-native-elements';


const Detailview = ({ movie }) =>
    <ScrollView>
        <View  style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Tile imageSrc={{ uri: movie.large_cover_image }} title={ movie.title_long }>
            </Tile>
            <View style={{ padding: 10}}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between' }}>
                    <Text h2 style={{ fontWeight: "bold"}}>RUNTIME: { movie.runtime } min </Text>
                    <Text h2 style={{ fontWeight: "bold"}}>LANGUAGE: { movie.language } </Text>
                </View>
                <Divider style={{ backgroundColor: 'grey' }} />
                <Text style={{ padding: 10,paddingTop: 20}}>{ movie.description_full }</Text>
            </View>
        </View>
    </ScrollView>;

export default class MovieDetails extends React.Component{
    static navigationOptions = {
        title: 'Movie Catalog',
    };

    constructor(props){
        super(props);
        this.state = { isLoading: true,Movie: null };
    }

    render(){
        return(
            <View>
            { this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff"  />
                : <Detailview movie={this.state.Movie}/>}
            </View>
        );
    }

   async componentDidMount(){
    try {
        this.setState({ isLoading: true });
        let queryterm = 'movie_id=' + this.props.navigation.getParam('Id');
        let response = await fetch('https://yts.am/api/v2/movie_details.json?' +  queryterm);
        let responseJson = await response.json();
        this.setState({ Movie: responseJson.data.movie });
        this.setState({ isLoading: false });
      } catch (error) {
        console.error(error);
      }
    }
}