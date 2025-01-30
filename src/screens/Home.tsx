import React, {useEffect, useState} from 'react';
import icons from '../../constants/icons';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native';

const Home = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const clearImage = (index: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  const handleUpload = async () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 0,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
    } else {
      const newImages: any =
        response.assets?.map((asset: Asset) => asset.uri) || [];
      setSelectedImages([...selectedImages, ...newImages]);
      for (let i = 0; i < newImages.length; i++) {
        const uri = newImages[i];
        const imageName = uri.split('/').pop();
        const localPath = `${RNFS.DocumentDirectoryPath}/${imageName}`;
        try {
          await RNFS.copyFile(uri, localPath);
          console.log(`Image saved to ${localPath}`);
        } catch (error) {
          console.log('Error saving image:', error);
        }
      }
    }
  };

  const handleExtractClothingItems = () => {
    if (selectedImages.length === 0) {
      Toast.showWithGravity(
        'Please upload images before extracting clothing items!',
        Toast.SHORT,
        Toast.CENTER,
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.showWithGravity(
        'Extraction successful!',
        Toast.SHORT,
        Toast.CENTER,
      );
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={['#FFA2A2', 'rgba(255, 66, 123, 0.99)', '#EE2700']}
        style={styles.linearGradient}>
        <View style={styles.imageContainer}>
          {selectedImages.map((imageUri, index) => (
            <View
              key={index}
              style={[
                styles.card,
                {
                  position: 'absolute',
                  zIndex: index,
                },
                index % 2 === 0
                  ? {transform: [{rotate: '10deg'}]}
                  : {transform: [{rotate: '-10deg'}]},
              ]}>
              <Image source={{uri: imageUri}} style={styles.cardImage} />
              <CustomButton
                icon={icons.cross}
                handlePress={() => clearImage(index)}
                containerStyles={[styles.crossButtonStyles]}
                iconStyle={styles.crossIconStyle}
              />
            </View>
          ))}
          <CustomButton
            icon={icons.cloth}
            handlePress={handleExtractClothingItems}
            containerStyles={styles.extractButtonStyles}
            iconStyle={styles.extractIconStyle}
          />
          {loading ? (
            <ActivityIndicator size="large" color="black" style={{zIndex: 6}} />
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Upload Images"
            handlePress={handleUpload}
            containerStyles={styles.uploadButtonStyles}
            textStyles={styles.buttonText}
            isLoading={false}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 4,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossButtonStyles: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 0,
    width: 0,
    height: 0,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  uploadButtonStyles: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 25,
    width: '200',
  },
  extractButtonStyles: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extractIconStyle: {
    height: 40,
    width: 40,
  },
  crossIconStyle: {
    height: 20,
    width: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
  },
  imageContainer: {
    flex: 3,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  imageShadow: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 12,
    width: 200,
    borderRadius: 20,
  },
});

export default Home;
