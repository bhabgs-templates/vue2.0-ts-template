import { Vue, Component } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { routes } from '@/router';

interface State {
  defaultKey: string;
  defaultGroup: Array<string>;
}

@Component
export default class SiderBox extends Vue {
  private state: State = {
    defaultKey: '/',
    defaultGroup: ['/'],
  };

  private routerData: RouteConfig[] = [];

  private created() {
    this.reset();
  }

  private reset() {
    this.routerData = routes[0].children || [];
    this.resetRouter(this.routerData, '/', routes[0]);
    this.state.defaultKey = this.$route.path;
  }

  private resetRouter(
    router: RouteConfig[] = [],
    pu: string = '/',
    route: RouteConfig,
  ) {
    router.map((item, key) => {
      const { path } = item;
      if (pu === path) {
        item.meta.url = `${path}`;
      } else {
        item.meta.url = `${pu}/${path}`;
      }

      item.meta.url = item.meta.url.replace('//', '/');

      if (this.$route.path === item.meta.url) {
        this.state.defaultGroup.push(route.path);
      }
      if ((item.children || []).length > 0) {
        return this.resetRouter(item.children, item.meta.url, item);
      }
      return item;
    });
  }

  private renderItem(router: RouteConfig[] = []): JSX.Element[] {
    return router.map((item) => {
      if ((item.children || []).length > 0) {
        return this.renderGroup(item);
      }

      return (
        <a-menu-item key={item.meta.url}>
          <router-link tag='div' class='span-nav-link' to={item.meta.url}>
            {item.meta.name}
          </router-link>
        </a-menu-item>
      );
    });
  }

  private renderGroup(router: RouteConfig): JSX.Element {
    return (
      <a-sub-menu key={router.path}>
        <span slot='title'>
          {/* <a-icon type='mail' /> */}
          <span>{router.meta.name}</span>
        </span>
        {this.renderItem(router.children)}
      </a-sub-menu>
    );
  }

  private render() {
    return (
      <a-layout-sider width='200' style='background: #fff;'>
        <a-menu
          default-selected-keys={[this.state.defaultKey]}
          default-open-keys={this.state.defaultGroup}
          mode='inline'
          theme='light'
        >
          {this.renderItem(this.routerData)}
        </a-menu>
      </a-layout-sider>
    );
  }
}
