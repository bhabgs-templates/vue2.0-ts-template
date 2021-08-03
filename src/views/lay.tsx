import { Vue, Component, Watch } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { CheckToken, Utils } from '@bhabgs/micro-util';
import SiderBox from '@/components/siderBox/index';
import loginBox from '@/components/login_box';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { message } from 'ant-design-vue';

interface MyRouteConfig extends RouteConfig {
  query: STRINGKEY;
}

Component.registerHooks(['beforeRouteEnter']);
@Component({
  components: {
    siderBox: SiderBox,
    loginBox,
  },
})
export default class Lay extends Vue {
  @Watch('$route.meta.hideSide', { deep: true })
  private a() {
    this.hideSide = this.$route.meta.hideSide;
  }

  private visible: boolean = false;

  private created() {
    this.hideSide = this.$route.meta.hideSide;
  }

  private hideSide: boolean = false;

  private async beforeRouteEnter(
    to: MyRouteConfig,
    from: MyRouteConfig,
    next: Function,
  ) {
    const { userCode, netType, clientType } = Utils.reset();

    if (clientType === 'mobile') {
      const { token } = Utils.query.getAllQuery();
      // 从pad进入，直接获取token corpId
      sessionStorage.setItem('token', token);
      next((vm: any) => {});
    } else {
      const Util = new CheckToken({
        tokenPosition: {
          name: 'token',
          position: 'sessionStorage',
        },
        axios: {
          netType,
        },
      });
      const api =
        process.env.NODE_ENV === 'production' ? '' : 'http://192.168.5.97/api';
      const tokenType = await Util.checks(api, userCode || '');

      if (tokenType.type === 'ok') {
        next();
      } else {
        // type

        next((VM: any) => {
          VM.visible = true;
          setTimeout(() => {
            message.destroy();
            message.error('免登失败，请使用用户名密码登录.');
          }, 100);
        });
        // error 重新获取登录权限
      }
    }
  }

  private render(): JSX.Element {
    const padding = '0px';
    return (
      <a-config-provider locale={zhCN}>
        <a-layout id='layout'>
          {this.hideSide ? '' : <SiderBox />}
          <loginBox visible={this.visible} />
          <a-layout class='bodycenter'>
            <router-view />
          </a-layout>
        </a-layout>
      </a-config-provider>
    );
  }
}
