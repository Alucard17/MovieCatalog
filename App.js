import React from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Button, SearchBar, Card  } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import Details from "./detail";
const GetCard = ({movie, navigation}) => {
    var {id, title, img, desc} = movie;
    return(
        <Card  title={ title } image={{ uri: img }} imageStyle={{height:400}}>
            <Text style={{marginBottom: 10}}> { desc } </Text>
            <Button
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Read More' 
                onPress={() => navigation.navigate('Details',{ Id: id}) }/>
        </Card>
    );
}


class Home extends React.Component {
    static navigationOptions = {
        title: 'Movie Catalog',
    };    
    constructor(props){
        super(props);
        this.state = { IsLoading: true,txtquery: '',movielist: [] };
    }

    render() {
        return ( 
        <View style={{ paddingBottom: 60}}>
          <SearchBar 
                    lightTheme 
                    clearIcon
                    placeholder='Search Movies...' 
                    value={ this.state.txtquery }
                    onChangeText={(txtquery) => this.setState({txtquery})}
                    onBlur={() => this.loadMovies() }
                    onClearText={() => this.setState({txtquery: ''},() => this.loadMovies())} react-navigation/>
          <ScrollView>
            { this.state.IsLoading ? 
                        <ActivityIndicator size="large" color="#0000ff" />
                    :  this.state.movielist.map(m => <GetCard key={ m.id } {...{movie:m, navigation:this.props.navigation}} />)
            }
          </ScrollView>
        </View>
        );
    }
   async componentDidMount(){
       this.loadMovies();
    }

   async loadMovies(){
        try {
            this.setState({ IsLoading: true });
            let queryterm = this.state.txtquery ? "query_term=" +this.state.txtquery : '';
            console.log(queryterm);
            let response = await fetch('https://yts.am/api/v2/list_movies.json?' +  queryterm);
            let responseJson = await response.json();
            let movielist = responseJson.data.movies.map(r => { 
                                return { id: r.id, title: r.title_long, img: r.medium_cover_image,desc: r.summary };
                            });
            this.setState({ movielist});
            this.setState({ IsLoading: false });
          } catch (error) {
            console.error(error);
          }
    }
}

export default createStackNavigator({
    Home: {
      screen: Home,
    },
    Details: {
        screen: Details,
    },
  });