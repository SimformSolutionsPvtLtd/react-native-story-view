![Story View - Simform](./assets/banner.png)

# react-native-story-view

[![npm version](https://img.shields.io/badge/npm%20package-0.0.1-orange)](https://www.npmjs.org/package/react-native-story-view) [![Android](https://img.shields.io/badge/Platform-Android-green?logo=android)](https://www.android.com) [![iOS](https://img.shields.io/badge/Platform-iOS-green?logo=apple)](https://developer.apple.com/ios) [![MIT](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

---

This library for status/stories features like Instagram/WhatsApp or other social media, It is simple to use and fully customizable.
It works on both android and iOS platforms.


## Quick Access

[Installation](#installation) | [StoryView](#storyview) | [Usage](#usage) | [Props](#props) | [Example](#example) | [License](#license)

## Installation

##### 1. Install library, react-native-video

```bash
$ npm install react-native-video react-native-story-view
# --- or ---
$ yarn add react-native-video react-native-story-view
```

##### 2. Install cocoapods in the ios project

```bash
cd ios && pod install
```

##### Know more about [react-native-video](https://www.npmjs.com/package/react-native-video)

---

## StoryView

#### 🎬 Preview

---

![Default StoryView](./assets/StoryView.gif)

## Usage
StoryView is mainly divided into three individual components StoryContainer, UserHeaderView and Footer. We'll look usage and customization of all these.

<br />
Checkout Story View Example
<a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/App.tsx'><b>here</b></a>
<br />
Checkout Stories Data Format <a href='https://github.com/SimformSolutionsPvtLtd/react-native-story-view/blob/develop/example/src/constants/stories.ts'><b> here</b></a>.

<br />

### *Story Data Format*

Define the users' stories array in the below format. There will be multiple users and multiple stories inside.

```js
 const userStories = [
  { 
    id: 1, //unique id
    username: 'John', //user name on header
    title: '', //title below username
    profile: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', //user profile picture
    stories: [
      {
        id: 0,
        url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // story url
        type: 'image', //image or video type of story
        duration: 2, //default duration
        storyId: 1, //unique story id
      },
      {
        id: 1,
        url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video',
        duration: 0,
        storyId: 2,
      },
    ],
  },
  {
    id:2,
    username: 'Chris',
    ...
  }

```

---
### *StoryContainer*
This is the root component of StoryView, which provides all functionality of story view and customization.

#### Basic Usage

```js
        const [isStoryViewShow, setIsStoryViewShow] = useState(false);

        <StoryContainer
          visible={isStoryViewShow}
          stories={userStories[0].stories}
          footerComponent={
            <Footer
              onIconPress={() => {}}
            />
          }
          headerComponent={
            <UserHeaderView
              userImage={{ uri: userStories[0].profile ?? '' }}
              userName={userStories[0].username}
              userMessage={userStories.[0].title}
              onImageClick={() => {}}
              onClosePress={() => {
                setIsStoryViewShow(false);
              }}
            />
          }
          //Callback when all stories completes
          onComplete={() => setIsStoryViewShow(false)}
        />

```



### *ProgressBar*
ProgressBar customisation can be controlled through StoryContainer itself. `enableProgress` to make visible the progressbar.`progressIndex` to start story from any index. `barStyle` to customize look feel of progressbar.`onChangePosition` trigger when progressbar index will change returns current index.

```js
       <StoryContainer
          enableProgress={true}
          //Callback when progressbar index changes
          onChangePosition={(position) =>{
          }}
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

### *UserHeaderView*
This is an individual component, To display user details on header like instagram/whatsapp. In `headerComponent` of StoryContainer, Custom component can be assigned.

```js
       <StoryContainer
          headerComponent={
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
          }
      />

```

### *Footer*
This is an individual component, To display footer like instagram. Any textinput props can be directly passed to `Footer`. In `footerComponent` of StoryContainer, Custom component can be assigned.

```js
       <StoryContainer
          footerComponent={
            <Footer
              onIconPress={() => {
                console.log("Share icon clicked")
              }}
              onSendTextPress={() =>{
                console.log("Message sent")
              }}
              shouldShowSendImage={true}
              shouldShowTextInputSend={true}
              placeholder="Enter Message
            />
          }
      />

```

### *Custom View*
Pass any custom view in story view. It will be rendered in top of story view as it have an absolute position. In `customView` of StoryContainer, Any custom component can be assigned.

```js
       <StoryContainer
          customView={
            <Pressable>
              <Text>Close</Text>
            </Pressable>
          }
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

<br />

### StoryContainer
<br />

> | Name                          |                Default                | Type                | <div style="width:290px">Description</div>                  |
> | :---------------------------- | :-----------------------------------: | :------------------ | ----------------------------------------------------------- |
> | **visible\***               |                 false                 | boolean             | Hide / show story view                              |
> | **stories\***         |                 []                 | StoryType[] | Array of user stories                              |
> | backgroundColor          |                  #000000                   | string          | Background color of Stroyview                                     |
> | maxVideoDuration          |                  null                   | number          | Override video progress duration (default is actual duration of video)                                     |
> | style                 |                 {}                  | boolean             | Style of story view                       |
> | showSourceIndicator            |                 true                  | boolean             | Display indicator while video loading                |
> | sourceIndicatorProps       |            {}            | ActivityIndicatorProps              | To override indicator props                              |
> | onComplete          |                 null                  | () => {}             | Callback when all stories completes                       |
> | headerComponent       |                   null                   | FunctionComponentElement            | Render Header component (`UserHeaderView`) or custom component                                  |
> | footerComponent        |                  null                   | FunctionComponentElement           | Render Footer component (`Footer`) or custom component                                          |
> | customView          |                 null                 | FunctionComponentElement             | Render any custom view on Story                 |
> | storyContainerViewProps             |                  {}                   | ViewProps      | Root story view props                                          |
> | headerViewProps         |                  {}                   | ViewProps           | Header view wrapper props                                   |
> | footerViewProps             |                  {}                   | ViewProps           | Footer view wrapper props                                         |
> | customViewProps           |                  {}                   | ViewProps           | Custom view wrapper props                                       |
> | videoProps                |                  {}                   | VideoProperties           | To override video properties                               |

---
<br />


### StoryContainer: Progressbar
<br />

> | Name                          |                Default                | Type                | <div style="width:290px">Description</div>                  |
> | :---------------------------- | :-----------------------------------: | :------------------ | ----------------------------------------------------------- |
> | progressIndex               |                 0                 | boolean             | To start story with any index                               |
> | barStyle          |                  {<br />`barActiveColor`: #ffffff' <br /> `barInActiveColor`: rgba(255, 255, 255, 0.5) <br />  `barHeight` : 2<br />}                   | BarStyleProps          | Progressbar Style: (`barActiveColor`, `barInActiveColor`, `barHeight`)                                      |
> | enableProgress                 |                 true                  | boolean             | To display progressbar                       |
> | progressViewProps            |                 {}                  | ViewProps             | ProgressBar view wrapper props                |
> | onChangePosition       |            null            | (position) => {}              | Callback when progress index changes                              |

---
<br />

### UserHeaderView
<br />

> | Name                          |                Default                | Type                | <div style="width:290px">Description</div>                  |
> | :---------------------------- | :-----------------------------------: | :------------------ | ----------------------------------------------------------- |
> | userImage               |         {}                         | ImageSourcePropType             | Circular view image                               |
> | userName                 |                 ''                  | string             | To display username                       |
> | userMessage       |            ''            | string              | Display text below username                              |
> | customCloseButton       |            null            | any              | To Render custom close button or to hide pass fragment                              |
> | closeIconProps            |                 {}                  | ViewProps             | ProgressBar view wrapper props                |
> | onImageClick            |                 null                  | () => {}             | Callback on user image click                  |
> | containerStyle       |            {}            | ViewStyle              | Root view style changes                              |
> | userImageProps            |                 {}                  | ImageProps             | User Image props                |
> | userMessageProps       |            {}            | TextProps              | User Message Props                             |
> | userNameProps       |            {}            | TextProps              | User Name Props                             |
---
<br />

### Footer
<br />

> | Name                          |                Default                | Type                | <div style="width:290px">Description</div>                  |
> | :---------------------------- | :-----------------------------------: | :------------------ | ----------------------------------------------------------- |
> | customInput               |         null                         | TextInput             | Render any custom text input                               |
> | shouldShowSendImage                 |                 true                  | bool             | Show/hide send icon image                       |
> | onIconPress                 |                 null                  | () => {}             | Callback on send icon press                       |
> | iconProps                 |                 {}                  | ImageProps             | Additional props to customize 'send' image view                       |
> | shouldShowTextInputSend       |            true            | bool              | Show/hide send text inside text input (like instagram)                              |
> | onSendTextPress       |            null            | () => {}              | Callback on send text press                               |
> | textProps       |            {}            | TextProps              | Additional props to customize 'send' text view                              |
> | viewProps            |                 {}                  | ViewProps             | Root view props                |
> | `props`            |                 -                 | TextInputProps             | Pass any `TextInput` props on `Footer` component                |  
---

## Example

A full working example project is here [Example](./example/src/App.tsx)
```sh
$ yarn
$ yarn example ios   // For ios
$ yarn example android   // For Android
```

## Find this library useful? ❤️

Support it by joining [stargazers](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/stargazers) for this repository.⭐

## Bugs / Feature requests / Feedbacks

For bugs, feature requests, and discussion please use [GitHub Issues](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=bug&late=BUG_REPORT.md&title=%5BBUG%5D%3A), [GitHub New Feature](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEATURE%5D%3A), [GitHub Feedback](https://github.com/SimformSolutionsPvtLtd/react-native-story-view/issues/new?labels=enhancement&late=FEATURE_REQUEST.md&title=%5BFEEDBACK%5D%3A)

## 🤝 How to Contribute

We'd love to have you improve this library or fix a problem 💪
Check out our [Contributing Guide](CONTRIBUTING.md) for ideas on contributing.

## License

- [MIT License](LICENSE)