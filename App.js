import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Linking,TouchableOpacity,  Image,TextInput,Open } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RNCamera } from 'react-native-camera';
import {AdMobInterstitial,AdMobBanner} from 'expo-ads-admob';

async function ads() {
  await AdMobInterstitial.setAdUnitID('ca-app-pub-6816554982628024/3669817931');
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  await AdMobInterstitial.showAdAsync();
}
class app{
bannerError(e){
  alert(e);
  
}}

export default function Sat() {
  
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [side,setSide]=useState(RNCamera.Constants.Type.front)
  const [text, setTxt] = useState('Tap to Scan');
  const [state,setState]=useState();



  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({data }) => {
    setScanned('openUrl');
    setState (data)
  };
  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  if (scanned=='openUrl'){
    return(
      <View>

<TouchableOpacity Button onPress={() => {setScanned(true)}} >
    
    <Image 
            style={{height:90,width:90,alignSelf:'center',backgroundColor: 'rgba(255, 255, 255, 0.5)',borderRadius:10,marginTop:40}}
            source={require("./home.png")}/>

            <Text style={{alignSelf:'center'}}>Go To Home Screen</Text>
    
    </TouchableOpacity>

          <TextInput
          style={styles.inputBox}
          placeholder="URL"
          value={state}/>
    



    <TouchableOpacity Button onPress={() => {Linking.openURL(state)} } >
  
  
                  
      <Image 
            style={{height:60,width:60,alignSelf:'center',backgroundColor: 'rgba(255, 255, 255, 0.5)',borderRadius:10,marginTop:30}}
            source={{
              uri:
                'https://static.thenounproject.com/png/3565416-200.png',
            }}
          />
  </TouchableOpacity>



  </View>
    )}


  if (scanned==false) {
    
    return (
      <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        focusDepth={10}
        style={StyleSheet.absoluteFillObject}
        defaultOnFocusComponent={true}
        type={side}
      />
      

          

    <Image 
style={{height:230,width:220,marginTop:200,alignSelf:'center',position: 'absolute',alignSelf:'center',borderRadius:70}}
source={require("./clipart2414277.png")}>
  </Image>

    
      <View style={{position: 'absolute', top: 100, right: 350}}>

        <TouchableOpacity Button onPress={() => {setScanned(true),setTxt('Tap To Scan'),ads();} } >
  
  
                  
      <Image
            style={{height:40,width:80,alignSelf:'center',backgroundColor: 'rgba(255, 255, 255, 0.5)',borderRadius:50}}
            source={require("./back.png")}
          />
  </TouchableOpacity>

  </View>
  
      </View>
  )}  


  if (scanned==true) {
    ads();
    return ( 
      
      <View style={styles.container} >
          
<View style={styles.adBanner}>


  </View>

  

  
  <TouchableOpacity Button onPress={() => {setScanned(false),setTxt('Tap To Scan Again')} } >
  
  
                  
      <Image
            style={{height:60,width:60,alignSelf:'center',backgroundColor: 'rgba(255, 255, 255, 0.5)',borderRadius:10}}
            source={{
              uri:
                'https://assets.stickpng.com/thumbs/585e4adacb11b227491c3392.png',
            }}
          />
  </TouchableOpacity>
  <Text> {text}  </Text>

  

  
  <View style={styles.adBanner}>
  <AdMobBanner
  bannerSize="banner"
  adUnitID="ca-app-pub-6816554982628024/3506166404"
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={app.bannerError} />
  </View>
  <View style={styles.adBannerBottom}>
  <AdMobBanner
  bannerSize="banner"
  adUnitID="ca-app-pub-6816554982628024/6487552969"
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={app.bannerError} />
  </View>
  
      </View>
    );
  }
  console.log(scanned)
  



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:-100,
    marginVertical:- 50
  },
  adBanner:{
    top:-320
  },
  adBannerBottom:{
   bottom:-250,
  },
  inputBox:{
    width: '90%',
    height: 60,
    borderWidth: 1.5,
    borderColor:'black',
    fontSize: 20,
    alignSelf:'center',
    marginTop:'50%'
  },

});