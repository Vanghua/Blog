# 1.C++内存区域划分

> 大致可以分为如下4部分。
>
> 1. 本文不探讨new和malloc的区别，将其看作都是申请堆内存地址。
> 2. 下面存储内容举例只包括本文提到的内容。

栈内存：存储局部变量，函数参数

堆内存：存储new或malloc申请的内存，c++没有自动垃圾清理机制，需要程序员手动回收。

全局/静态存储区：存储全局变量和静态变量（const）。

常量存储区：常量字符串



# 2.对象和堆内存，栈内存

### 2.1 对象创建的方式

```c++
class A {
	public:
		string name;
		A() {
			this->name = "";
		}
		A(string name) {
			this->name = name;
		}
};
```

**1.非指针创建：**

```c++
A a("Danny");
```

**2.非指针创建：**

```c++
A a = A("Danny");
```

**3.指针创建：**

```c++
A *a = new A("Danny");
```



### 2.2 对象存储位置

使用非指针形式创建的对象存储在栈内存中，当函数作用域或块级作用域结束后会被立即销毁。

使用指针形式创建的对象存储在堆内存中，c++堆内存中的数据需要手动管理。



# 3.结构体和栈内存，堆内存

### 3.1 结构体的创建和初始化

```c++
struct student {
    string name;
  	int age;
    string gender;
};
```

**1. 非指针创建：**

```c++
struct student st;
```

**2. 指针创建：**

```c++
struct student *st = (struct student*)malloc(1 * sizeof(struct student));
```



### 3.2 结构体存储位置

使用非指针形式创建的结构体存储在栈内存中，当函数作用域或块级作用域结束后会被立即销毁。

使用指针形式创建的结构体存储在堆内存中，c++堆内存中的数据需要手动管理。



### 3.3 结构体的初始化

**1.顺序初始化**

```c++
struct student st = {"Danny", 20, "male"};
```

**2.无序初始化**

```c++
struct student st = {.name = "Danny", .age = 20, .gender = "male"};
// or
struct student st = {name: "Danny", age: 20, gender: "male"};
```

**3.c++风格初始化**

```c++
struct student {
    string name;
  	int age;
    string gender;
    student(string name, int age, string gender) {
        this->name = name;
        this->age = age;
        this->gender = gender;
    }
};
struct student st = student("Danny", 20, "male");
// 也可以使用new创建，在堆内存中开辟空间
struct student st2 = new student("Danny", 20, "male");
```

**注意事项**

>1. 在struct声明时在内部赋值初始化是不标准行为，在测试时发现会警告说该行为适用于c++11，在使用非指针形式创建结构体时发现初始化成功，使用指针形式创建结构体发现初始化失败。
>
>   ```c++
>   // 请不要使用下述不标准的初始化行为
>   struct student {
>       string name = "Danny";
>     	int age = 20;
>       string gender = "male";
>   };
>   ```
>
>2.  上述初始化仅适用于非指针形式创建的结构体，指针形式创建的结构体仍需手动赋值。



### 3.4 结构体排序

在此总结原因是长久未使用c++，忘记了STL中sort函数的参数要求。

**复习：**

1. sort中最后参数即自定义函数，要求对于非基本类型要传入const声明的参数来保证安全性，是源代码中的要求
2. sort中最后参数即自定义函数，返回值对排序的影响和JavaScript中的sort恰好相反。JavaScript中规则是返回值为1时，将会交换参数a，b的位置。在c++中下述例子，当返回值为true时，不会交换参数a，b的位置。
3. sort中最后参数即自定义函数，返回值的要求不同，JavaScript在这里比较严格必须返回1或0或-1，返回布尔值会导致函数不工作。但是在c++中不用担心这个问题。

```c++
#include <iostream>
#include <algorithm>
using namespace std;

struct student {
	    string name;
	  	int age;
	    string gender;
	    student(string name, int age, string gender) {
	        this->name = name;
	        this->age = age;
	        this->gender = gender;
	    }
	};

bool cmp (const struct student &a, const struct student &b) {
	return a.age > b.age;
}

int main() {	
	struct student st1 = student("Danny", 20, "male");
	struct student st2 = student("Jack", 22, "male");
	struct student st3 = student("John", 19, "male");
	struct student st4 = student("Sam", 28, "male");
	struct student st5 = student("Luke", 16, "male");
	struct student sts[5] = {
		st1, st2, st3, st4, st5
	};
	
	sort(sts + 0, sts + 5, cmp);
	
	for(int i = 0; i < 5; i ++)
		cout << sts[i].name << " " << sts[i].age << " " << sts[i].gender << endl;
}
```



# 4.数据与内存关系的理解

### 4.1 变量与内存的关系

变量可以看做是内存块的描述，变量可以描述内存中的数据，变量可以描述内存的地址。（在一些非严格语言，例如JavaScript中变量不能描述内存的地址）



### 4.2 访问变量

**常规访问变量：**（在非严格语言中只能常规访问变量）

访问变量即获取变量对应的内存中的数据，访问指针即获取指针类型变量对应的内存中的数据。

```c++
int *p, q = 2;
p = &q;
cout << p; //0x71fe14
```



**访问变量地址：**（在严格的偏底层的语言中允许访问变量对应内存的地址）

```c++
int q = 2;
cout << &q; // 0x71fe14
```

