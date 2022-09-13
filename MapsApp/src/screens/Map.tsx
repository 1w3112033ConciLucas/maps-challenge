import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ToastAndroid} from 'react-native'
import MapView, {Callout, Marker} from 'react-native-maps'
import Geocoder from 'react-native-geocoding'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
//import {} from '@react-navigation/native-stack'
interface RouteParams {
  inputCallout: string,
}

interface Props extends NativeStackScreenProps<any,any>{};

const Map = ({navigation, route}: Props) => {

  const params = route.params as RouteParams;

  const [markers, setMarkers] = useState([{
    latitude: -31.417,
    longitude: -64.183,
    callOut: 'Cordoba'
  }]);

  useEffect(() => {
    if(markers.length > 1) {

      const newCallOut = markers.pop();
      if(newCallOut != undefined && params?.inputCallout != undefined){
        setMarkers(
          [...markers,
            {
              latitude: newCallOut.latitude,
              longitude: newCallOut.longitude,
              callOut: params.inputCallout ? params.inputCallout : newCallOut.callOut,
            }
          ]);
      }
    }
  }, [params])

  const [region, setRegion] = React.useState({
    latitude: -31.417,
    longitude: -64.183,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const [searchFlag, setSearchFlag] = useState<boolean>(true);


  const [input, setInput] = useState('');

  const getData = () => {
    Geocoder.init('AIzaSyDOmgqqwKg9s0i-OXznGf0F5A9Tc2-QjB4');

    Geocoder.from(`${input}`)
		.then(json => {
			var location = json.results[0].geometry.location;
      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMarkers([...markers, 
        {
          latitude: location.lat,
          longitude: location.lng,
          callOut: 'Falta cargar!',
      }]);
		})
		.catch(error => console.warn(error));
  };

  return (
    <View
      style={styles.container}>
        <TextInput
          placeholder='Search...'
          style={styles.input}
          onChangeText={(val) => {
            setInput(val);
            console.log(JSON.stringify(val));
          }}
          onSubmitEditing={() => {
            getData(),
            setSearchFlag(false);
          }}
        />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={region}          
        >
          {
            markers.map((marker, index) => {
              return(
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  pinColor="black"
                >
                  <Callout tooltip>
                    <View style={styles.callOut}>
                      <Text style={styles.callOutText}> `{marker.callOut}` </Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })
          }
          
        </MapView>
      </View>
      <TouchableOpacity
          style={styles.button}
          disabled={searchFlag}
          onPress={()=>{
            
            navigation.navigate('ChangeCallout')
          }}
        >
          <Text style={styles.inputText}>Continuar</Text>
        </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingTop:20,
    backgroundColor: '#AE97BA'
  },
  map: {
    flex:1,
    width: 326,
    height: 504,
  },
  mapContainer: {
    flex:1,
    borderWidth:3,  
    borderColor: '#A607F8', 
    borderRadius:5,
  },
  callOut:{
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  callOutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 5,
  },
  button: {
    flex: 0,
    zIndex: 3,
    alignItems: "center",
    backgroundColor: '#A607F8',
    padding: 15,
    marginTop: 25,
    borderRadius: 15,
    marginBottom:10,
  },
  input: {
    borderWidth:3,
    borderColor: '#A607F8',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 25,
    width:332,
    fontSize:18,
  },
  inputText: {
    color:'white', 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});


export default Map
