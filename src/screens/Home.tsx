import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';

const Home = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const clearImages = () => {
    setSelectedImages([]);
  };
  const handleUpload = async () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 0,
    };
    Alert.alert('Upload Images', 'Please select images to upload');
    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
    } else {
      const newImages: any =
        response.assets?.map((asset: Asset) => asset.uri) || [];
      setSelectedImages(newImages);
    }
  };

  const handleExtractClothingItems = () => {
    console.log('Extracting clothing items from selected images!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.imageScrollContainer}>
          {selectedImages.map((imageUri, index) => (
            <View key={index} style={styles.card}>
              <Image source={{uri: imageUri}} style={styles.cardImage} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <CustomButton
          title="Upload Images"
          handlePress={handleUpload}
          containerStyles={(styles.buttonContainer, styles.uploadButton)}
          textStyles={styles.buttonText}
          isLoading={false}
        />
        <CustomButton
          title="Clear Images"
          handlePress={clearImages}
          containerStyles={(styles.buttonContainer, styles.clearButton)}
          textStyles={styles.buttonText}
          isLoading={false}
        />
        {selectedImages.length > 0 && (
          <CustomButton
            title="Extract Clothing Items"
            handlePress={handleExtractClothingItems}
            containerStyles={(styles.buttonContainer, styles.extractButton)}
            textStyles={styles.buttonText}
            isLoading={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: 'green',
  },
  clearButton: {
    backgroundColor: 'red',
  },
  extractButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imageScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
});

export default Home;
