const mock = jest.requireMock('react-native-reanimated');

jest.mock('react-native-video', () => 'Video');
jest.mock('react-native-reanimated', () => {
  return {
    ...mock,
    useSharedValue: jest.fn,
    useValue: jest.fn,
    event: jest.fn(),
  };
});
