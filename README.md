![Story View - Simform](./assets/banner.png)

# react-native-story-view

[![react-native-story-view on npm](https://img.shields.io/npm/v/react-native-story-view.svg?style=flat)](https://www.npmjs.com/package/react-native-story-view) [![react-native-story-view downloads](https://img.shields.io/npm/dm/react-native-story-view)](https://www.npmtrends.com/react-native-story-view) [![react-native-story-view install size](https://packagephobia.com/badge?p=react-native-story-view)](https://packagephobia.com/result?p=react-native-story-view) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

This library provides status/stories features like Instagram/WhatsApp or other social media, It is simple to use and fully customizable.
It works on both android and iOS platforms.

## Quick Access

[Installation](#installation) | [StoryView](#storyview) | [Usage](#usage) | [Props](#props) | [Example](#example) | [License](#license)

## Installation

##### 1. Install Story View

```bash
$ npm install react-native-story-view
# --- or ---
$ yarn add react-native-story-view
```

##### 2. Install peer dependencies

```bash
$ npm install react-native-video react-native-reanimated react-native-gesture-handler react-native-video-cache-control
# --- or ---
$ yarn add react-native-video react-native-reanimated react-native-gesture-handler react-native-video-cache-control
```

> Note: If you already have these libraries installed and at the latest version, you are done here!

##### 3. Install cocoapods in the ios project

```bash
cd ios && pod install
```

> Note: Make sure to add Reanimated's babel plugin to your `babel.config.js`

```
module.exports = {
      ...
      plugins: [
          ...
          'react-native-reanimated/plugin',
      ],
  };
```

<br />

#### Extra Step

<b>Android:</b><br />
If you're facing issue related to 'android-scalablevideoview' or 'videocache' module not found.
Add this code in android's build.gradle

```
jcenter() {
    content {
        includeModule("com.yqritc", "android-scalablevideoview")
        includeModule("com.danikula", "videocache")
    }
}
```

##### Know more about [react-native-video](https://www.npmjs.com/package/react-native-video), [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated), [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler) and [react-native-video-cache-control](https://www.npmjs.com/package/react-native-video-cache-control)

---

## StoryView

#### 🎬 Preview

---

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/StoryView.gif"></a></td>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/SingleStory.gif"></a>
     </td>
    </tr>
  </table>

---

## Usage

StoryView is divided into several components, `StoryView` is the root component. ProfileHeader and Footer are individual components for header and footer. StoryContainer internally used for rendering Story. We'll look usage and customization of all these.

<br />
Checkout Multi Story Example
<a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/StoryView/StoryViewScreen.tsx'><b>here</b></a>
<br />
Checkout Stories Data Format <a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/constants/stories.ts'><b> here</b></a>
<br />
Checkout Single Story Example <a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/Story/StoryScreen.tsx'><b> here</b></a>

<br />

### Story Data Format

Define the users' **stories** array in the below format. There will be multiple users and multiple stories inside.

```js
const userStories = [
    {
      id: 1, //unique id (required)
      username: 'Alan', //user name on header
      title: 'Albums', //title below username
      profile: 'https://sosugary.com/wp-content/uploads/2022/01/TheWeeknd_001.jpg', //user profile picture
      stories: [
        {
          id: 0, //unique id (required)
          url: 'https://i1.sndcdn.com/artworks-IrhmhgPltsdrwMu8-thZohQ-t500x500.jpg', // story url
          type: 'image', //image or video type of story
          duration: 5, //default duration
          storyId: 1,
          isSeen: false,
        },
        {
          id: 1,
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          type: 'video',
          duration: 15,
          storyId: 1,
          isSeen: false,
        },
      ],
    },
    {
      id:2,
      username: 'Weekend',
      ...
    }
]
```

---

### StoryView

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/stories_list.gif"></a></td>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="200" alt="SimformSolutions" src="./assets/StoryView.gif"></a>
     </td>
    </tr>
  </table>

This is the root component of StoryView package. It displays horizontal list of users with pre-defined ui from `StoryAvatar` component and uses animated flatlist under the hood to display stories. `StoryContainer` is used under the hood for story so all customization can be done from `storyContainerProps`.

#### Basic Usage

```tsx
const StoryViewRef = useRef<StoryViewRef>(null);

<StoryView
  stories={stories}
  ref={StoryViewRef}
  avatarProps={{
    userNameStyle: { fontSize: 16 },
  }}
  // all StoryContainer props applies here
  storyContainerProps={{
    renderHeaderComponent: ({ userStories, progressIndex, userStoryIndex }) => (
      <Header {...{ userStories, progressIndex, StoryViewRef }} />
    ),
    renderFooterComponent: ({ userStories, progressIndex, userStoryIndex }) => (
      <Footer {...{ userStories }} />
    ),
    barStyle: {
      barActiveColor: Colors.red,
    },
  }}
/>;
```

<br />
Checkout Multi Story Example
<a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/StoryView/StoryViewScreen.tsx'><b>here</b></a>
<br />
<br />

### ProfileHeader

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/header.png"></a></td>
    </tr>
  </table>

This is an individual component, To display user details on header like instagram/whatsapp. In `renderHeaderComponent` of StoryContainer, Custom component can be assigned.
For StoryView, renderHeaderComponent receives `progressIndex`, `userStories`, `story` and `userStoryIndex` for getting current user data.

```js
const StoryViewRef = useRef(null);

<StoryView
  ref={StoryViewRef}
  storyContainerProps={{
    renderHeaderComponent: ({
      userStories,
      story,
      progressIndex,
      userStoryIndex,
    }) => (
      <ProfileHeader
        userImage={{ uri: userStories?.profile ?? '' }}
        userName={userStories?.username}
        userMessage={userStories?.title}
        onClosePress={() => {
          StoryViewRef?.current?.close?.();
        }}
      />
    ),
  }}
/>;
```

### Footer

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/footer.png"></a></td>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="200" alt="SimformSolutions" src="./assets/footer.gif"></a>
     </td>
    </tr>
  </table>

This is an individual component, To display footer like instagram. Any TextInput props can be directly passed to `Footer`. In `renderFooterComponent` of StoryContainer, Custom component can be assigned.

```js
<StoryView
  storyContainerProps={{
    renderFooterComponent: ({
      userStories,
      story,
      progressIndex,
      userStoryIndex,
    }) => (
      <Footer
        onIconPress={() => {
          console.log('Share icon clicked');
        }}
        onSendTextPress={() => {
          console.log('Message sent');
        }}
        shouldShowSendImage={true}
        shouldShowTextInputSend={true}
        placeholder="Enter Message"
      />
    ),
  }}
/>
```

---

## Additional Reference

### StoryContainer

This is the core component of StoryView, which provides all functionality of story view and customization. It is used to render all stories in `StoryView`. This component is just for _reference_ how `storyContainerProps` in `StoryView` being passed in this component internally.

```js
const [isStoryViewVisible, setIsStoryViewShow] = useState(false);

<StoryContainer
  visible={isStoryViewVisible}
  maxVideoDuration={10}
  stories={userStories[0].stories}
  renderFooterComponent={({ story, progressIndex }) => (
    <Footer
      onSendTextPress={() => {
        Alert.alert(`Current Story id ${story?.[progressIndex].id} `);
        Keyboard.dismiss();
      }}
      onIconPress={() => {
        Alert.alert('Current Story progress index' + progressIndex);
      }}
    />
  )}
  renderHeaderComponent={({ story, progressIndex }) => (
    <ProfileHeader
      userImage={{ uri: userStories[0]?.profile ?? '' }}
      userName={userStories[0]?.username}
      userMessage={userStories[0]?.title}
      onImageClick={() => {}}
      onClosePress={() => setIsStoryViewShow(false)}
    />
  )}
  //Callback when all stories completes
  onComplete={() => setIsStoryViewShow(false)}
/>;
```

### StoryViewContainer

`StoryView` is wrapper on this component with extra horizontal user list UI of `StoryAvatar`. If StoryView's horizontal list customisation is not sufficient for any use-case, use this base component and add your own customised horizontal user list UI.

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="140" alt="SimformSolutions" src="./assets/StoryViewContainer.gif"></a>
     </td>
    </tr>
  </table>

#### Basic Usage

```js
const [isStoryViewVisible, setIsStoryViewShow] = useState(false);
const [pressedIndex, setPressedIndex] = useState<number>(0);

const openStories = (index: number) => {
  setIsStoryViewShow(true);
  setPressedIndex(index);
};

  <View style={styles.container}>
    <FlatList
      horizontal
      data={userStories}
      keyExtractor={item => item?.id?.toString()}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => openStories(index)}>
          <CustomStoryAvatar {...{ item, index }} />
        </Pressable>
      )}
    />
    {isStoryViewVisible && (
      // add other StoryContainer Props
      <StoryViewContainer
        visible={isStoryViewVisible}
        onComplete={() => setIsStoryViewShow(false)}
        stories={userStories}
        renderHeaderComponent={...}
        renderFooterComponent={...}
        userStoryIndex={pressedIndex}
      />
    )}
  </View>
```

### ProgressBar

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/progressbar.gif"></a></td>
    </tr>
  </table>

ProgressBar customisation can be controlled through StoryContainer itself. `enableProgress` to make visible the progressbar.`progressIndex` to start story from any index. `barStyle` to customize look feel of progressbar.`onChangePosition` trigger when progressbar index will change returns current index.

```js
<StoryView
  storyContainerProps={{
    enableProgress: true,
    //Callback when progressbar index changes
    onChangePosition: position => {},
    barStyle: {
      barHeight: 2,
      barInActiveColor: 'green',
      barActiveColor: 'grey',
    },
    maxVideoDuration: 25,
    progressIndex: 0,
  }}
/>
```

### Custom View

  <table>
    <tr>
      <td><a href="https://github.com/SimformSolutionsPvtLtd/react-native-story-view"><img width="300" alt="SimformSolutions" src="./assets/custom_view.png"></a></td>
    </tr>
  </table>

Pass any custom view in story view. It will be rendered on top of story view as it has an absolute position. In `renderCustomView` of StoryContainer, Any custom component can be assigned.

```js
<StoryView
  storyContainerProps={{
    renderCustomView: () => (
      <View
        style={{
          position: 'absolute',
          top: 40,
          right: 50,
        }}>
        <Image
          source={Images.star}
          style={{
            height: 25,
            width: 25,
            tintColor: 'green',
          }}
        />
      </View>
    ),
  }}
/>
```

---

## Story Data

```javascript
[{
  id: number;
  username: string;
  title: string;
  profile: string;
  stories:Array<Story>[
    {
      id: number;
      url: string;
      type: 'image' | 'video';
      duration: number
      isReadMore: boolean
      storyId: number,
      isSeen?: boolean,
    }
  ]
}]
```

---

### Transitions

| Cube                                         | Scale                                         | Default                                         |
| -------------------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| <img src="./assets/cube.gif"  width="200" /> | <img src="./assets/scale.gif"  width="200" /> | <img src="./assets/default.gif"  width="200" /> |

---

## Props

### StoryView

<br />

> | Name                |       Default       | Type                                            | <div style="width:290px">Description</div>                                                                                                                           |
> | :------------------ | :-----------------: | :---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | **stories\***       |      undefined      | StoriesType[]                                   | Array of multiple user stories                                                                                                                                       |
> | ref                 |        null         | StoryViewRef                                    | To access `close` story method                                                                                                                                       |
> | storyContainerProps |         {}          | StoryContainerProps                             | Customize all story props, detailed props in below `StoryContainer` section                                                                                          |
> | avatarProps         |         {}          | [StoryAvatarStyleProps](#storyavatarstyleprops) | Customize avatar component styles                                                                                                                                    |
> | onChangePosition    |        null         | (progressIndex, storyIndex) => {}               | Callback when progress index changes                                                                                                                                 |
> | transitionMode      | TransitionMode.Cube | TransitionMode: {Default, Cube, Scale}          | To customize user story transition, (TransitionMode.default : no transition, Transition.scale : zoomIn/zoomOut transition, Transition.Cube: 3D cube transition) cube |
> | onComplete          |        null         | (viewedStories?: Array<boolean[]>) => void      | Callback when stories closed or completes. `viewedStories` contains multi array of boolean whether story is seen or not                                              |
> | `props`             |          -          | FlatListProps                                   | Pass any `FlatList` props to customize horizontal user list                                                                                                          |

---

### StoryAvatarStyleProps

<br />

> | Name                      | Default | Type           | <div style="width:290px">Description</div>                |
> | :------------------------ | :-----: | :------------- | --------------------------------------------------------- |
> | userNameStyle             |    -    | TextStyle      | To change style of user name                              |
> | userImageStyle            |    -    | ImageStyle     | To change style of user avatar                            |
> | containerStyle            |    -    | ViewStyle      | To change style of image container                        |
> | userImageProps            |    -    | ImageProps     | To customize image props                                  |
> | userNameProps             |    -    | ViewStyle      | To customize text props                                   |
> | rootProps                 |    -    | PressableProps | To customize root view props                              |
> | viewedStoryContainerStyle |    -    | ViewStyle      | To customize story avatar when all stories of it are seen |

---

<br />

### StoryViewContainer

<br />

> | Name                |       Default       | Type                                   | <div style="width:290px">Description</div>                                                                                                                           |
> | :------------------ | :-----------------: | :------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | **stories\***       |      undefined      | StoriesType[]                          | Array of multiple user stories                                                                                                                                       |
> | **visible\***       |        false        | boolean                                | Hide / show story view                                                                                                                                               |
> | userStoryIndex      |          0          | number                                 | Pass clicked index of horizontal user list.                                                                                                                          |
> | storyContainerProps |         {}          | StoryContainerProps                    | Customize all story props, detailed props in below `StoryContainer` section                                                                                          |
> | onChangePosition    |        null         | (progressIndex, userIndex) => {}       | Callback when progress index changes                                                                                                                                 |
> | transitionMode      | TransitionMode.Cube | TransitionMode: {Default, Cube, Scale} | To customize user story transition, (TransitionMode.default : no transition, Transition.scale : zoomIn/zoomOut transition, Transition.Cube: 3D cube transition) cube |
> | onComplete          |        null         | () => {}                               | Callback when stories closed or complete                                                                                                                             |
> | `props`             |          -          | StoryContainerProps                    | Pass any `StoryContainerProps` props to customize story                                                                                                              |

---

<br />

### StoryContainer

<br />

> | Name                     |  Default  | Type                                                       | <div style="width:290px">Description</div>                                       |
> | :----------------------- | :-------: | :--------------------------------------------------------- | -------------------------------------------------------------------------------- |
> | **visible\***            |   false   | boolean                                                    | Hide / show story view                                                           |
> | **stories\***            | undefined | StoryType[]                                                | Array of stories                                                                 |
> | backgroundColor          |  #000000  | string                                                     | Background color of story view                                                   |
> | maxVideoDuration         |   null    | number                                                     | Override video progress duration (default is actual duration of video)           |
> | style                    |    {}     | ViewStyle                                                  | Style of story view                                                              |
> | showSourceIndicator      |   true    | boolean                                                    | Display indicator while video loading                                            |
> | sourceIndicatorProps     |    {}     | ActivityIndicatorProps                                     | To override indicator props                                                      |
> | onComplete               |   null    | () => {}                                                   | Callback when all stories completes                                              |
> | renderHeaderComponent    |   null    | (callback: [CallbackProps](#callbackprops)) => JSX.Element | Render Header component (`ProfileHeader`) or custom component                    |
> | renderFooterComponent    |   null    | (callback: [CallbackProps](#callbackprops)) => JSX.Element | Render Footer component (`Footer`) or custom component                           |
> | renderCustomView         |   null    | (callback: [CallbackProps](#callbackprops)) => JSX.Element | Render any custom view on Story                                                  |
> | renderIndicatorComponent |    {}     | () => JSX.Element                                          | Render loader when we press on Story, which represent loading state of story     |
> | storyContainerViewProps  |    {}     | ViewProps                                                  | Root story view props                                                            |
> | headerViewProps          |    {}     | ViewProps                                                  | Header view wrapper props                                                        |
> | footerViewProps          |    {}     | ViewProps                                                  | Footer view wrapper props                                                        |
> | customViewProps          |    {}     | ViewProps                                                  | Custom view wrapper props                                                        |
> | videoProps               |    {}     | VideoProperties                                            | To override video properties                                                     |
> | ref                      |    {}     | StoryRef                                                   | To access 'pause' story method and 'viewedStories' stories object (Single Story) |
> | customViewStyle          |    {}     | ViewStyle                                                  | Style of custom view container                                                   |
> | headerStyle              |    {}     | ViewStyle                                                  | Style of header container                                                        |
> | footerStyle              |    {}     | ViewStyle                                                  | Style of footer container                                                        |

---

<br />

### CallbackProps

<br />

> | Name              |  Default  | Type        | <div style="width:290px">Description</div>        |
> | :---------------- | :-------: | :---------- | ------------------------------------------------- |
> | **progressIndex** |     0     | number      | Current progress index of story                   |
> | story             | undefined | StoryType[] | Current story array                               |
> | userStories       | undefined | StoriesType | Current user story array (`Only for Multi Story`) |
> | userStoryIndex    | undefined | number      | Current user story index (`Only for Multi Story`) |

---

<br />

### StoryContainer: Progressbar

<br />

> | Name              |                                               Default                                                | Type             | <div style="width:290px">Description</div>                             |
> | :---------------- | :--------------------------------------------------------------------------------------------------: | :--------------- | ---------------------------------------------------------------------- |
> | progressIndex     |                                                  0                                                   | number           | To start story with any index                                          |
> | barStyle          | {<br />`barActiveColor`: #ffffff' <br /> `barInActiveColor`: #FFFFFF7F <br /> `barHeight` : 2<br />} | BarStyleProps    | Progressbar Style: (`barActiveColor`, `barInActiveColor`, `barHeight`) |
> | enableProgress    |                                                 true                                                 | boolean          | To display progressbar                                                 |
> | progressViewProps |                                                  {}                                                  | ViewProps        | ProgressBar view wrapper props                                         |
> | onChangePosition  |                                                 null                                                 | (position) => {} | Callback when progress index changes                                   |

---

<br />

### ProfileHeader

<br />

> | Name              | Default | Type                | <div style="width:290px">Description</div> |
> | :---------------- | :-----: | :------------------ | ------------------------------------------ |
> | userImage         |   {}    | ImageSourcePropType | Circular view image                        |
> | userName          |   ''    | string              | To display username                        |
> | userMessage       |   ''    | string              | Display text below username                |
> | customCloseButton |  null   | any                 | To render custom close button              |
> | closeIconProps    |   {}    | ViewProps           | ProgressBar view wrapper props             |
> | onImageClick      |  null   | () => {}            | Callback on user image click               |
> | rootStyle         |   {}    | ViewStyle           | root view style changes                    |
> | containerStyle    |   {}    | ViewStyle           | container view style changes               |
> | userImageStyle    |   {}    | ImageStyle          | To change profile Image view style         |
> | userNameStyle     |   {}    | TextStyle           | To change profile name style               |
> | userMessageStyle  |   {}    | TextStyle           | To change profile message/subtext style    |
> | closeIconStyle    |   {}    | ImageStyle          | To change close icon style                 |
> | userImageProps    |   {}    | ImageProps          | User Image props                           |
> | userMessageProps  |   {}    | TextProps           | User Message Props                         |
> | userNameProps     |   {}    | TextProps           | User Name Props                            |

---

<br />

### Footer

<br />

> | Name                    | Default | Type                 | <div style="width:290px">Description</div>             |
> | :---------------------- | :-----: | :------------------- | ------------------------------------------------------ |
> | customInput             |  null   | TextInput            | Render any custom text input                           |
> | shouldShowSendImage     |  true   | bool                 | Show/hide send icon image                              |
> | onIconPress             |  null   | () => {}             | Callback on send icon press                            |
> | sendIconProps           |   {}    | ImageProps           | Additional props to customize 'send' image view        |
> | sendText                | 'Send'  | string               | To change text 'send' with any other string            |
> | shouldShowTextInputSend |  true   | bool                 | Show/hide send text inside text input (like instagram) |
> | onSendTextPress         |  null   | () => {}             | Callback on send text press                            |
> | sendTextProps           |   {}    | TextProps            | Additional props to customize 'send' text view         |
> | sendTextStyle           |   {}    | TextStyle            | To change style of send text                           |
> | sendIconStyle           |   {}    | ImageStyle           | To change style of send icon                           |
> | inputStyle              |   {}    | StyleProp<TextStyle> | To change style of input                               |
> | containerStyle          |   {}    | ViewStyle            | To change style of root view                           |
> | containerViewProps      |   {}    | ViewProps            | Root view props                                        |
> | `props`                 |    -    | TextInputProps       | Pass any `TextInput` props on `Footer` component       |

---

## Example

A full working example project is here [Example](./example/src/App.tsx)

```sh
yarn
yarn example ios   // For ios
yarn example android   // For Android
```

# TODO

- [ ] Customize StoryAvatar in reference of Instagram
- [ ] Customized Story example
- [ ] Refactor Cube transition (make perfect cube in reference of Instagram)
- [ ] Landscape support
- [ ] Optimize video loading on android

<br />

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## Awesome Mobile Libraries

- Check out our other available [awesome mobile libraries](https://github.com/SimformSolutionsPvtLtd/Awesome-Mobile-Libraries)

## License

- [MIT License](./LICENSE)
