import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {ImageSourcePropType} from 'react-native';

interface CustomButtonProps {
  title?: string;
  icon?: ImageSourcePropType;
  handlePress: () => void;
  containerStyles?: any;
  textStyles?: any;
  iconStyle?: any;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  iconStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, containerStyles]}
      disabled={isLoading}>
      {icon && <Image source={icon} resizeMode="contain" style={iconStyle} />}
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;
