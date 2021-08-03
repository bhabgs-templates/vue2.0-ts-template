import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LoginBox extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  private visible: boolean = false;

  private async login() {
    this.loginLoading = true;
    const a = await this.$axios.get(
      `/app/login?password=${this.password}&username=${this.username}`,
    );

    this.loginLoading = false;
    if (a.code !== 'M0000') {
      this.$message.error(a.msg || '');
    } else {
      sessionStorage.setItem('token', a.data.access_token);
      this.$nextTick(() => {
        this.$router.go(0);
      });
    }
  }

  private loginLoading: boolean = false;

  private password: string = 'zx111222';

  private username: string = '13682192877';

  private render(): JSX.Element {
    return (
      <a-modal
        title='登录'
        visible={this.visible}
        onOk={this.login}
        confirmLoading={this.loginLoading}
      >
        <a-input v-model={this.username}>
          <a-icon slot='prefix' type='user' />
        </a-input>
        <a-input
          style='margin-top: 1rem;'
          type='password'
          v-model={this.password}
        >
          <a-icon slot='prefix' type='eye' />
        </a-input>
      </a-modal>
    );
  }
}
