const mock = jest.requireMock('react-native-reanimated');
const mockGestureHandler = jest.requireMock('react-native-gesture-handler');

jest.mock('react-native-video', () => 'Video');

jest.mock('react-native-video-cache-control', () => ({
  __esModule: true,
  default: () => {},
}));

jest.mock('react-native-reanimated', () => {
  return {
    ...mock,
    useSharedValue: jest.fn,
    useAnimatedStyle: jest.fn,
    useAnimatedReaction: jest.fn,
    useValue: jest.fn,
    event: jest.fn(),
  };
});

jest.mock('react-native-gesture-handler', () => {
  return {
    ...mockGestureHandler,
    useAnimatedGestureHandler: {},
  };
});
