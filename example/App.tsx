import { MeshGradientView } from "expo-mesh-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const SCREEN_SIZE = Dimensions.get('screen');

const AnimatedMeshGradientView = Animated.createAnimatedComponent(MeshGradientView);

Animated.addWhitelistedNativeProps({
  points: true,
});

export default function App() {
  const point = useSharedValue({ x: 0.5, y: 0.5 });

  const panGesture = Gesture
    .Pan()
    .onUpdate(event => {
      point.value = {
        x: event.absoluteX / SCREEN_SIZE.width,
        y: event.absoluteY / SCREEN_SIZE.height,
      }
    })
    .onEnd(() => {
      point.value = withSpring({ x: 0.5, y: 0.5 });
    });

  const animatedProps = useAnimatedProps(() => {
    return {
      points: [
        [0.0, 0.0],
        [0.5, 0.0],
        [1.0, 0.0],
        [0.0, 0.5],
        [point.value.x, point.value.y],
        [1.0, 0.5],
        [0.0, 1.0],
        [0.5, 1.0],
        [1.0, 1.0],
      ]
    }
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: (point.value.x - 0.5) * SCREEN_SIZE.width },
        { translateY: (point.value.y - 0.5) * SCREEN_SIZE.height },
      ],
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimatedMeshGradientView
        style={{ flex: 1 }}
        columns={3}
        rows={3}
        colors={[
          'red', 'purple', 'indigo',
          'orange', 'white', 'blue',
          'yellow', 'green', 'cyan'
        ]}
        smoothsColors={true}
        ignoresSafeArea={true}
        animatedProps={animatedProps}
      />

      <GestureDetector gesture={panGesture}>
        <View style={styles.container}>
          <Animated.View style={[styles.button, buttonStyle]} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 20,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 0 },
    opacity: 0.5,
  }
});
