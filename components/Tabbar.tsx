import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import { Svg } from 'expo';

// import StaticTabbar from './StaticTabbar';
const tabs = [
  { name: 'grid' },
  { name: 'list' },
  { name: 'refresh-cw' },
  { name: 'box' },
  { name: 'grid' },
  { name: 'user' },
];

const { width } = Dimensions.get('window');
const tabWidth = width / tabs.length;
const height = 64;
const { Path } = Svg;
// const backgroundColor = 'white';

const getPath = (): string => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([{ x: 0, y: 0 }, { x: width, y: 0 }]);

  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    { x: width, y: 0 },
    { x: width + 5, y: 0 },
    { x: width + 10, y: 10 },
    { x: width + 15, y: height },
    { x: width + tabWidth - 15, y: height },
    { x: width + tabWidth - 10, y: 10 },
    { x: width + tabWidth - 5, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);

  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};
// const d = getPath();
const d = `${left} ${tab} ${right}`;

interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  value = new Animated.Value(0);

  render() {
    const { value } = this;
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });
    return (
      <>
        <Svg>
          <Path {...{ d }} fill="white" />
        </Svg>
        <SafeAreaView style={StyleSheet.safeArea} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
