import React, {useEffect} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Image,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';

const images = [
  require('../../assets/images/cloth1.png'),
  require('../../assets/images/cloth2.png'),
  require('../../assets/images/cloth3.png'),
];

const Wardrobe = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const width = Dimensions.get('window').width;

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={['#FFA2A2', 'rgba(255, 66, 123, 0.99)', '#EE2700']}
        style={styles.linearGradient}>
        <View style={styles.container}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={false}
            data={images}
            scrollAnimationDuration={1000}
            onSnapToItem={index => console.log('current index:', index)}
            style={styles.carouselStyles}
            renderItem={({index}) => (
              <View style={styles.card}>
                <Image
                  source={images[index]}
                  style={{
                    width: 280,
                    height: 370,
                    borderRadius: 20,
                  }}
                />
              </View>
            )}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  linearGradient: {
    flex: 3,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 3,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  carouselStyles: {
    width: 400,
    height: 'auto',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wardrobe;
