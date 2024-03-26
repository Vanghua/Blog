

### 1.useState和useReducer区别

> * useState用于简单的原子状态管理，useReducer用于复杂的状态管理
> * 两者可以相互替换

### 2.useReducer使用场景

**轻量状态管理器**

> useReducer配合useContext使用，实现轻量状态管理器，用于深层组件通信，兄弟节点通信等情况。
>
> ```react
> import { useReducer, createContext, useContext, useMemo } from 'react'
> import { Button } from 'antd'
> 
> const Context = createContext()
> 
> const initialState = {
>   a: void 0,
>   b: void 0,
>   c: void 0
> }
> 
> const reducer = (state, action) => {
>   switch (action) {
>     case 'A':
>       return { ...state, a: 'a' }
>     case 'B':
>       return { ...state, b: 'b' }
>     case 'C':
>       return { ...state, c: 'c' }
>     default:
>       return state
>   }
> }
> 
> const A = () => {
>   const { state, dispatch: onChange } = useContext(Context)
> 
>   return useMemo(
>     () => {
>       console.log('renderA')
>       return (
>         <div>
>           {state.a}
>           <Button onClick={() => onChange('A')}>click</Button>
>         </div>
>       )
>     },
>     [state.a] // eslint-disable-line
>   )
> }
> 
> const B = () => {
>   const { state, dispatch: onChange } = useContext(Context)
> 
>   return useMemo(
>     () => {
>       console.log('renderB')
>       return (
>         <div>
>           {state.b}
>           <Button onClick={() => onChange('B')}>click</Button>
>         </div>
>       )
>     },
>     [state.b] // eslint-disable-line
>   )
> }
> 
> const C = () => {
>   const { state, dispatch: onChange } = useContext(Context)
> 
>   return useMemo(
>     () => {
>       console.log('renderC')
>       return (
>         <div>
>           {state.c}
>           <Button onClick={() => onChange('C')}>click</Button>
>         </div>
>       )
>     },
>     [state.c] // eslint-disable-line
>   )
> }
> 
> export default () => {
>   const [state, dispatch] = useReducer(reducer, initialState)
> 
>   return (
>     <Context.Provider value={{ state, dispatch }}>
>       <div>
>         <A />
>         <B />
>         <C />
>       </div>
>     </Context.Provider>
>   )
> }
> ```
>
> <font color=red>**注意：**</font>
>
> <font color=red>**因为接收context的组件接收的是reducer的state，reducer更新时通常是浅拷贝state，所以useContext在使用时会导致不必要的重新渲染。通常采用以下方法解决：**</font>
>
> <font color=red>**（1）记忆化**</font>
>
> state变化时仍然会导致A变化，但是返回值不会重新计算，能避免部分不必要的重新渲染。
>
> ```react
> const A = () => {
>   const { state, dispatch: onChange } = useContext(Context)
> 
>   return useMemo(
>     () => {
>       console.log('renderA')
>       return (
>         <div>
>           {state.a}
>           <Button onClick={() => onChange('A')}>click</Button>
>         </div>
>       )
>     },
>     [state.a] // eslint-disable-line
>   )
> }
> ```
>
> <font color=red>**（2）拆分context**</font>
>
> 拆分context即拆分reducer，不能避免无效的渲染，只是避免了一部分。更新state2时state1不受影响。
>
> ```react
> export default () => {
>   const [state1, dispatch1] = useReducer(reducer1, initialState1)
>   const [state2, dispatch2] = useReducer(reducer2, initialState2)
> 
>   return (
>       <Context1.Provider value={{ state1, dispatch1 }}>
>         <Context2.Provider value={{ state2, dispatch2 }}>
>           <div>
>             <A />
>             <B />
>             <C />
>           </div>
>         </Context2.Provider>
>       </Context1.Provider>
>   )
> }
> ```

