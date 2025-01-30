import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://my.spline.design/miniroomartcopy-3648ab4420dcb67f2f729b9a7116997b/',
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      <CustomButton
        title="Begin"
        handlePress={() => {
          navigation.navigate('Main');
        }}
        containerStyles={styles.beginButtonStyles}
        textStyles={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  beginButtonStyles: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(151, 64, 245, 1)',
    padding: 12,
    borderRadius: 25,
    width: '200',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
  },
});

export default Onboarding;
