1. Vuex存储对象的时间复杂度和空间复杂度小于localStorage。localStorage只能存储字符串，如果是存储对象的话需要结构化克隆，开销大。localStorage存储时存储到外部存储设备，存储时间没有Vuex快。



2. Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：见app.vue。子组件通过this.$store访问。



3. 怎样理解Vuex中存储的数据都是响应式的



