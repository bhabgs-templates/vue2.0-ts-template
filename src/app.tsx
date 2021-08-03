import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private render(): JSX.Element {
    return <router-view />;
  }
}
