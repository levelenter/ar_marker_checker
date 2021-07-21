import FirebaseLogin from "../frontend/views/FirebaseLogin.vue";

import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8J2voIvCd4DkB8J9u-l0ogfBub41LEcc",
  authDomain: "block-vrock-1532736157223.firebaseapp.com",
  databaseURL: "https://block-vrock-1532736157223.firebaseio.com",
  projectId: "block-vrock-1532736157223",
  storageBucket: "block-vrock-1532736157223.appspot.com",
  messagingSenderId: "683158767480",
  appId: "1:683158767480:web:6917ccb4c15951c1e5ea8d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
  title: "LeafProject/Login",
  component: FirebaseLogin,
  argTypes: {
    title: { control: { type: "String" } },
    size: { control: { type: "select", options: ["small", "medium", "large"] } },
    onClick: {}
  }
};

const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { FirebaseLogin },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {};
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: "<FirebaseLogin :title='open' :id='test' />"
});

export const template = Template.bind({});
template.args = {};
