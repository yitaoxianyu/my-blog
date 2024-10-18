// src/shims-vue.d.ts
//让ts项目认识vue文件，vue文件导入类型
declare module "*.vue" {
    import {DefineComponent} from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
  