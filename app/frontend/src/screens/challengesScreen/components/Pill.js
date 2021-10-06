import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";

export default ({ options, callback, recent }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [sliderXValue, setSliderXValue] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderX] = useState(new Animated.Value(sliderXValue));

  React.useEffect(() => {
    Animated.timing(sliderX, {
      toValue: sliderXValue,
      easing: Easing.back(),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sliderXValue]);

  const handleOptionSwitch = (index) => {
    if (index === activeOption) return;
    setActiveOption(index);
    setSliderXValue((index / options.length) * containerWidth);
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View style={style.container} onLayout={onLayout}>
      <Animated.View
        style={{
          ...style.pill,
          left: sliderX,
          width: (1 / options.length) * 100 + "%",
        }}
      />
      {options.map((option, index) => (
        <TouchableOpacity
          style={style.option}
          key={index}
          onPress={() => {
            handleOptionSwitch(index);
            callback(!recent);
          }}
        >
          <Text
            style={{
              fontSize: index === activeOption ? 18 : 15,
              fontWeight: index === activeOption ? "600" : "400",
            }}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderRadius: 40,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 60,
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  pill: {
    position: "absolute",
    backgroundColor: "#fff",
    top: 0,
    bottom: 0,
    borderRadius: 40,
  },
  option: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 40,
    zIndex: 20,
  },
});
