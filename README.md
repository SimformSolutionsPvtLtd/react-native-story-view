![Story View - Simform](./assets/banner.png)

# react-native-story-view

[![npm version](https://img.shields.io/badge/npm%20package-0.0.1-orange)](https://www.npmjs.org/package/react-native-story-view) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

This library for status/stories features like Instagram/WhatsApp or other social media, It is simple to use and fully customizable.
It works on both android and iOS platforms.

## Quick Access

[Installation](#installation) | [StoryView](#storyview) | [Usage](#usage) | [Props](#props) | [Example](#example) | [License](#license)

## Installation

##### 1. Install library, react-native-video and react-native-reanimated,

```bash
$ npm install react-native-video react-native-reanimated react-native-story-view
# --- or ---
$ yarn add react-native-video react-native-reanimated react-native-story-view
```

##### 2. Install cocoapods in the ios project

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

**Extra Step (Temporary)**

`react-native-reanimated` version `2.9.1` don't have ref exposed for Animated.FlatList, which is required for controlling manual transition when story completes. So here is **temporary** patch until it is available in new version.

Apply this command on root directory of project.

```
git apply node_modules/react-native-story-view/patches/react-native-reanimated+2.9.1.patch
```

> Only caveat is, This step need to be performed everytime if node_modules reinstalled.

<br />

Another way is to add this patch in your project on root directory [`patches/react-native-reanimated+2.9.1.patch`](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/patches/react-native-reanimated%2B2.9.1.patch)

Install patch-package using yarn

```
yarn add patch-package postinstall-postinstall
```

Add this script in `package.json`. Now any-time node_modules is reinstalled patch will be auto applied.

```
"scripts": {
+  "postinstall": "patch-package"
}
```

##### Know more about [react-native-video](https://www.npmjs.com/package/react-native-video), [react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated) and [patch-package](https://www.npmjs.com/package/patch-package)

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

StoryView is divided into several components, MultiStory, MultiStoryContainer and StoryContainer all for rendering Story. UserHeaderView and Footer are individual components for header and footer. We'll look usage and customization of all these.

<br />
Checkout Multi Story Example
<a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/MultiStory/MultiStoryScreen.tsx'><b>here</b></a>.
<br />
Checkout Stories Data Format <a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/constants/stories.ts'><b> here</b></a>.
<br />
Checkout Single Story Example <a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/Story/StoryScreen.tsx'><b> here</b></a>.

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
      },
      {
        id: 1,
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video',
        duration: 15,
        storyId: 1,
      },
    ],
  },
  {
    id:2,
    username: 'Weekend',
    ...
  }

```

---

### MultiStory

This is the root component of StoryView package. It displays horizontal list of users with pre-defined ui and uses animated flatlist under the hood to display stories. `StoryContainer` is used under the hood for story so all customization can be done from `storyContainerProps`.

#### Basic Usage

```tsx
const multiStoryRef = useRef<MultiStoryRef>(null);

<MultiStory
  stories={stories}
  ref={multiStoryRef}
  storyContainerProps={{
    renderHeaderComponent: (userStories, progressIndex, userStoryIndex) => (
      <Header {...{ userStories, multiStoryRef }} />
    ),
    renderFooterComponent: (userStories, progressIndex, userStoryIndex) => (
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
<a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/modules/MultiStory/MultiStoryScreen.tsx'><b>here</b></a>
<br />

---

### MultiStoryContainer

`MultiStory` is wrapper on this component with extra horizontal user list UI. Use this component to render multiple stories with any customised horizontal user list UI.

#### Basic Usage

```js
const [isStoryViewShow, setIsStoryViewShow] = useState(false);
const [pressedIndex, setPressedIndex] = useState<number>(0);

const openStories = (index: number) => {
  setIsStoryViewShow(true);
  setPressedIndex(index);
};

  <View style={styles.container}>
    <FlatList
      horizontal
      data={userStories}
      keyExtractor={item => item.id!.toString()}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => openStories(index)}>
          <CustomStoryAvatar {...{ item, index }} />
        </Pressable>
      )}
    />
    {isStoryViewShow && (
      // add other StoryContainer Props
      <MultiStoryContainer
        visible={isStoryViewShow}
        onComplete={() => setIsStoryViewShow(false)}
        stories={userStories}
        renderHeaderComponent={...}
        renderFooterComponent={...}
        userStoryIndex={pressedIndex}
      />
    )}
  </View>
```

### StoryContainer

This is the core component of StoryView, which provides all functionality of story view and customization. It is used to render all stories in `MultiStory`. Use this only when need to render single user story otherwise use `MultiStory` or `MultiStoryContainer` for all needs. Need to be wrapped with Modal additionally.

#### Basic Usage

```js
const [isStoryViewShow, setIsStoryViewShow] = useState(false);
<Modal
  visible={isStoryViewShow}
  statusBarTranslucent={true}
  onRequestClose={() => setIsStoryViewShow(false)}>
  <StoryContainer
    visible={true}
    maxVideoDuration={10}
    stories={userStories[0].stories}
    footerComponent={<Footer onIconPress={() => {}} />}
    renderHeaderComponent={(userStories, progressIndex) => (
      <UserHeaderView
        userImage={{ uri: userStories?.profile ?? '' }}
        userName={userStories?.username}
        userMessage={userStories?.title}
        onImageClick={() => {}}
        onClosePress={() => setIsStoryViewShow(false)}
      />
    )}
    //Callback when all stories completes
    onComplete={() => setIsStoryViewShow(false)}
  />
</Modal>;
```

### ProgressBar

ProgressBar customisation can be controlled through StoryContainer itself. `enableProgress` to make visible the progressbar.`progressIndex` to start story from any index. `barStyle` to customize look feel of progressbar.`onChangePosition` trigger when progressbar index will change returns current index.

```js
<StoryContainer
  enableProgress={true}
  //Callback when progressbar index changes
  onChangePosition={position => {}}
  progressIndex={0}
  barStyle={{
    barHeight: 2,
    barInActiveColor: 'red',
    barActiveColor: 'blue',
  }}
  stories={userStories[0].stories}
  maxVideoDuration={25}
/>
```

### UserHeaderView

This is an individual component, To display user details on header like instagram/whatsapp. In `renderHeaderComponent` of StoryContainer, Custom component can be assigned.

```js
<StoryContainer
renderHeaderComponent={() => (
  <UserHeaderView
    userImage={{ uri: userStories[0].profile ?? '' }}
    userName={userStories[0].username}
    userMessage={userStories.[0].title}
    onImageClick={() => {
      console.log('User profile image tapped')
    }}
    onClosePress={() => {
      setIsStoryViewShow(false);
    }}
  />
)}
/>
```

### Footer

This is an individual component, To display footer like instagram. Any textinput props can be directly passed to `Footer`. In `renderFooterComponent` of StoryContainer, Custom component can be assigned.

```js
<StoryContainer
  renderFooterComponent={userStories => (
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
  )}
/>
```

### Custom View

Pass any custom view in story view. It will be rendered in top of story view as it have an absolute position. In `renderCustomView` of StoryContainer, Any custom component can be assigned.

```js
<StoryContainer
  renderCustomView={() => (
    <Pressable>
      <Text>Close</Text>
    </Pressable>
  )}
/>
```

---

## Story Data

```javascript
[{
  id: string;
  username: string;
  title: string;
  profile: string;
  stories:Array<Story>[
    {
      id: string;
      url: string;
      type: 'image' | 'video';
      duration: number
      isReadMore: boolean
      storyId: number
    }
  ]
}]
```

## Props

### MultiStory

<br />

> | Name                | Default | Type                              | <div style="width:290px">Description</div>                                  |
> | :------------------ | :-----: | :-------------------------------- | --------------------------------------------------------------------------- |
> | **stories\***       |    0    | StoriesType[]                     | Array of multiple user stories                                              |
> | ref                 |  null   | MultiStoryRef                     | To access `close` story method                                              |
> | storyContainerProps |   {}    | StoryContainerProps               | Customize all story props, detailed props in below `StoryContainer` section |
> | onChangePosition    |  null   | (progressIndex, storyIndex) => {} | Callback when progress index changes                                        |
> | onComplete          |  null   | () => {}                          | Callback when stories closed or complete                                    |
> | `props`             |    -    | FlatListProps                     | Pass any `FlatList` props to customize horizontal user list                 |

---

<br />

### MultiStoryContainer

<br />

> | Name                | Default | Type                             | <div style="width:290px">Description</div>                                  |
> | :------------------ | :-----: | :------------------------------- | --------------------------------------------------------------------------- |
> | **stories\***       |    0    | StoriesType[]                    | Array of multiple user stories                                              |
> | **visible\***       |  false  | boolean                          | Hide / show story view                                                      |
> | userStoryIndex      |    0    | number                           | Pass clicked index of horizontal user list.                                 |
> | storyContainerProps |   {}    | StoryContainerProps              | Customize all story props, detailed props in below `StoryContainer` section |
> | onChangePosition    |  null   | (progressIndex, userIndex) => {} | Callback when progress index changes                                        |
> | onComplete          |  null   | () => {}                         | Callback when stories closed or complete                                    |
> | `props`             |    -    | StoryContainerProps              | Pass any `StoryContainerProps` props to customize story                     |

---

<br />

### StoryContainer

<br />

> | Name                    | Default | Type                                                    | <div style="width:290px">Description</div>                             |
> | :---------------------- | :-----: | :------------------------------------------------------ | ---------------------------------------------------------------------- |
> | **visible\***           |  false  | boolean                                                 | Hide / show story view                                                 |
> | **stories\***           |   []    | StoryType[]                                             | Array of stories                                                       |
> | backgroundColor         | #000000 | string                                                  | Background color of Stroyview                                          |
> | maxVideoDuration        |  null   | number                                                  | Override video progress duration (default is actual duration of video) |
> | style                   |   {}    | boolean                                                 | Style of story view                                                    |
> | showSourceIndicator     |  true   | boolean                                                 | Display indicator while video loading                                  |
> | sourceIndicatorProps    |   {}    | ActivityIndicatorProps                                  | To override indicator props                                            |
> | onComplete              |  null   | () => {}                                                | Callback when all stories completes                                    |
> | renderHeaderComponent   |  null   | (userStories, progressIndex, storyIndex) => JSX.Element | Render Header component (`UserHeaderView`) or custom component         |
> | renderHeaderComponent   |  null   | (userStories, progressIndex, storyIndex) => JSX.Element | Render Footer component (`Footer`) or custom component                 |
> | renderCustomView        |  null   | (userStories, progressIndex, storyIndex) => JSX.Element | Render any custom view on Story                                        |
> | storyContainerViewProps |   {}    | ViewProps                                               | Root story view props                                                  |
> | headerViewProps         |   {}    | ViewProps                                               | Header view wrapper props                                              |
> | footerViewProps         |   {}    | ViewProps                                               | Footer view wrapper props                                              |
> | customViewProps         |   {}    | ViewProps                                               | Custom view wrapper props                                              |
> | videoProps              |   {}    | VideoProperties                                         | To override video properties                                           |

---

<br />

### StoryContainer: Progressbar

<br />

> | Name              |                                                       Default                                                       | Type             | <div style="width:290px">Description</div>                             |
> | :---------------- | :-----------------------------------------------------------------------------------------------------------------: | :--------------- | ---------------------------------------------------------------------- |
> | progressIndex     |                                                          0                                                          | boolean          | To start story with any index                                          |
> | barStyle          | {<br />`barActiveColor`: #ffffff' <br /> `barInActiveColor`: rgba(255, 255, 255, 0.5) <br /> `barHeight` : 2<br />} | BarStyleProps    | Progressbar Style: (`barActiveColor`, `barInActiveColor`, `barHeight`) |
> | enableProgress    |                                                        true                                                         | boolean          | To display progressbar                                                 |
> | progressViewProps |                                                         {}                                                          | ViewProps        | ProgressBar view wrapper props                                         |
> | onChangePosition  |                                                        null                                                         | (position) => {} | Callback when progress index changes                                   |

---

<br />

### UserHeaderView

<br />

> | Name              | Default | Type                | <div style="width:290px">Description</div>             |
> | :---------------- | :-----: | :------------------ | ------------------------------------------------------ |
> | userImage         |   {}    | ImageSourcePropType | Circular view image                                    |
> | userName          |   ''    | string              | To display username                                    |
> | userMessage       |   ''    | string              | Display text below username                            |
> | customCloseButton |  null   | any                 | To Render custom close button or to hide pass fragment |
> | closeIconProps    |   {}    | ViewProps           | ProgressBar view wrapper props                         |
> | onImageClick      |  null   | () => {}            | Callback on user image click                           |
> | containerStyle    |   {}    | ViewStyle           | Root view style changes                                |
> | userImageProps    |   {}    | ImageProps          | User Image props                                       |
> | userMessageProps  |   {}    | TextProps           | User Message Props                                     |
> | userNameProps     |   {}    | TextProps           | User Name Props                                        |

---

<br />

### Footer

<br />

> | Name                    | Default | Type           | <div style="width:290px">Description</div>             |
> | :---------------------- | :-----: | :------------- | ------------------------------------------------------ |
> | customInput             |  null   | TextInput      | Render any custom text input                           |
> | shouldShowSendImage     |  true   | bool           | Show/hide send icon image                              |
> | onIconPress             |  null   | () => {}       | Callback on send icon press                            |
> | iconProps               |   {}    | ImageProps     | Additional props to customize 'send' image view        |
> | shouldShowTextInputSend |  true   | bool           | Show/hide send text inside text input (like instagram) |
> | onSendTextPress         |  null   | () => {}       | Callback on send text press                            |
> | textProps               |   {}    | TextProps      | Additional props to customize 'send' text view         |
> | viewProps               |   {}    | ViewProps      | Root view props                                        |
> | `props`                 |    -    | TextInputProps | Pass any `TextInput` props on `Footer` component       |

---

## Example

A full working example project is here [Example](./example/src/App.tsx)

```sh
$ yarn
$ yarn example ios   // For ios
$ yarn example android   // For Android
```

# TODO

- [ ] Customize StoryAvatar in reference of Instagram
- [ ] Add `seen` functionality on StoryAvatar and stories
- [ ] Customized Story example
- [ ] Refactor Cube transition (make perfect cube in reference of Instagram)
- [ ] Add Support for different transitions effect
- [ ] Landscape support

<br />

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## License

- [MIT License](LICENSE)
