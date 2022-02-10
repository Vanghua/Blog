// 卡车类
class Trucks {
    constructor(num, capacity, costPerKilo, timePerKilo) {
        // 卡车数量
        this.num = num
        // 卡车容量
        this.capacity = capacity
        // 卡车每公里开销，单位元
        this.costPerKilo = costPerKilo
        // 卡车每公里所需时间，单位小时
        this.timePerKilo = timePerKilo
        // 存储卡车的数组
        this.trucks = []
        // 存储卡车调度所需要的最小开销
        this.minCost = Infinity
        // 所有卡车参数初始化
        this.init()
    }

    // 初始化所有卡车
    init() {
        for(let i = 0; i < this.num; i ++) {
            this.trucks[i] = {}
            // 编号为i的卡车的下次发车时间
            this.trucks[i].departureTime = 0
            // 编号为i的卡车的行车路线
            this.trucks[i].route = []
            // 编号为i的卡车的装车方案
            this.trucks[i].ware = []
            // 编号为i的卡车在当前装车方案和行车路线下的开销
            this.trucks[i].cost = 0
        }
    }
}

// 城市类
class Cities {
    constructor(arr) {
        // 城市的数量
        this.num = arr.length
        // 城市的坐标
        this.cities = arr
    }

    // 计算两城市之间的欧几里得距离
    static getDistance(cityA, cityB) {
        return Math.sqrt(((cityA[0] - cityB[0]) ** 2) + ((cityA[1] - cityB[1]) ** 2))
    }

    // 计算一个路径列表的总距离
    static getSumDistance(route) {
        // 途径城市的总距离
        let dis = route.reduce((a, b, index) => route[index + 1] ? a + Cities.getDistance(b, route[index + 1]) : a, 0)
        // 算上离开仓库到第一个城市，和从最后一个城市回到仓库的距离
        dis += Cities.getDistance([0, 0], route[0]) + Cities.getDistance(route[route.length - 1], [0, 0])
        return dis
    }
}

// 仓库类
class WareHouse {
    // 仓库位置默认在笛卡尔平面的原点
    constructor(num) {
        // 该仓库存储着发往num个城市的货物
        this.num = num
        // 货物信息
        this.wares = []
        // 初始化仓库信息
        this.init()
    }

    init() {
        // 初始化发往每个城市的货物数量是100
        for(let i = 0; i < this.num; i ++) {
            this.wares[i] = []
            // 每个城市随机添加100个待发送货物，货物体积为1-10，货物紧急程度为1-3
            for(let j = 0; j < 100; j ++)
                this.wares[i].push(new Ware(Math.ceil(Math.random() * 10), Math.ceil(Math.random() * 3), i))
        }
    }
}

// 货物类
class Ware {
    // 货物体积，紧急程度，货物编号，发往的城市
    constructor(volume, degree, targetCity, id = Math.floor(Math.random() * 10000)) {
        this.volume = volume
        this.degree = degree
        this.targetCity = targetCity
    }
}

// 设置初始参数
function setParameters() {
    let citiesData = [[100, 100], [0, 200], [200, 0], [200, 200], [60, 30], [30, 60], [70, 40], [40, 70]]
    // 在此模型下卡车数量少于城市数量，如果卡车数量多于城市数量可以考虑设置每个城市的专线
    // 下面参数代表着有三辆卡车，每辆车的容量都是10个单位，每公里开销为5元，每公里所需时间是0.01小时
    let trucks = new Trucks(3, 10, 5, 0.01)
    let cities = new Cities(citiesData)
    let warehouse = new WareHouse(citiesData.length)
    return {
        trucks, cities, warehouse
    }
}

// 模拟退火参数设置
function setAnnealParameters() {
    let startT = 2000
    let endT = 1e-8
    let alpha = 0.98
    return {
        startT, endT, alpha
    }
}

// 生成初始解决方案
function getFirstAns(trucksNum, citiesNum) {
    // 参数是卡车数量和城市数量
    // cities是将所有城市平均分给每个卡车，每个卡车需要前往的城市的数量
    let cities = Math.floor(citiesNum / trucksNum)
    let result = []
    for(let i = 0; i < trucksNum; i ++) {
        result[i] = []
        for (let j = 0; j < cities; j++)
            result[i].push(i * cities + j)
        // 最后一个卡车特殊考虑
        if(i == trucksNum - 1)
            // citiesNum / trucksNum不一定是一个整数，最后一个卡车分配的城市要加上剩余的城市
            for(let j = result[i][cities - 1] + 1; j < citiesNum; j ++)
                result[i].push(j)
    }
    return result
}

// 计算在该解决方案下的车辆装载信息
// 参数指某一辆卡车，卡车的容量（所有卡车都一样），仓库信息
function computeLoadInfo(truck, truckCapacity, warehouse) {
    let capacity = truckCapacity
    // pointer为指针数组，pointer[i]存储着“仓库中要发往城市i的货物列表”中“即将出库的货物”
    let pointer = new Array(truck.route.length)

    loop: while(capacity) {
        // 记录当前容量
        var cap = capacity
        // 当前卡车要经过route中的城市，因此仓库中要发往这些城市的货物按比例装入卡车
        for(let i = 0; i < truck.route.length; i ++) {
            let city = truck.route[i]
            let wareList = warehouse.wares[city]

            // 如果出库序号到达了发往城市city的货物列表的最后，那么此时仓库中发往city城市的货物已经全部出库
            if(pointer[city] === wareList.length)
                continue

            // 仓库中要发往city城市的货物出库一个，序号是pointer[city]，此时卡车容量减少
            if(capacity - wareList[pointer[city]].volume > 0)
                capacity -= wareList[pointer[city]].volume
            else
                break loop
            // 卡车装车方案中记录下当前卡车装载了发往city城市的第pointer[city]个货物
            (truck.ware[city] || (truck.ware[city] = [])).push(wareList[pointer[city] ++])
        }
        // 如果一轮按比例装载后容量未发生变化，说明仓库货物已经发送完毕，车辆装不满就可以发车
        if(cap === capacity)
            break
    }
}

// 更新在该解决方案下的车辆运输信息
function updateTruckInfo(result, warehouse, trucks) {
    result.forEach((route, index) => {
        let truck = trucks.trucks[index]
        // 该路线的总距离
        let sumDistance = Cities.getSumDistance(route)
        // 更新该车辆的路线
        truck.route = route
        // 更新该车辆下次发车信息，为行走完该路线的时间
        truck.departureTime = sumDistance / trucks.timePerKilo
        // 更新该车辆该路线下的开销
        truck.cost = sumDistance * trucks.costPerKilo
        // 计算车辆装载信息
        computeLoadInfo(truck, trucks.capacity, warehouse)
    })
}

// 解决方案对应的开销，此函数即代价函数
function getCost(result) {

}

// Metropolis接受准则
const Metropolis = (E, ENew, T) => ENew < E ? 1 : Math.E ** (-(ENew - E) / T)

// 模拟退火干扰函数
function getNewAns(result, trucksNum, citiesNum) {
    let resultNew = result.slice(0)
    // 在解决方案中随机交换两个城市，即在卡车A和卡车B的路线中随机交换两个城市
    // 随机选择两个卡车的途径城市列表
    let truckA = Math.floor(Math.random() * result.length)
    let truckB = Math.floor(Math.random() * result.length)
    // 随机选择这两个列表中的两个城市
    let cityA = Math.floor(Math.random() * result[truckA].length)
    let cityB = Math.floor(Math.random() * result[truckB].length)
    // 交换这两个城市
    resultNew[truckA][cityA] = resultNew[truckA][cityA] ^ resultNew[truckB][cityB]
    resultNew[truckB][cityB] = resultNew[truckA][cityA] ^ resultNew[truckB][cityB]
    resultNew[truckA][cityA] = resultNew[truckA][cityA] ^ resultNew[truckB][cityB]

    // 除了交换城市，每个卡车途径城市的数量也应该被扰动
    // 随机选择两个卡车的途径城市列表
    truckA = Math.floor(Math.random() * result.length)
    truckB = Math.floor(Math.random() * result.length)
    // 随机选择第一个卡车列表中的某个途径城市
    cityA = Math.floor(Math.random() * result[truckA].length)
    // 将卡车A途径城市中的城市A删除，并加入到卡车B途径城市列表中去
    result[truckA].length > 1 && resultNew[truckB].push(resultNew[truckA].splice(cityA, 1)[0])

    return resultNew
}

// 模拟退火
function anneal({trucks, cities, warehouse}) {
    // 初始化获得模拟退火参数
    let {
        startT, endT, alpha
    } = setAnnealParameters()

    // 为模拟退火生成初始解决方案
    let result = getFirstAns(trucks.num, cities.num)

    // T是当前温度
    let T = startT

    while(T > endT) {
        // 降温
        T *= alpha
    }
}

// 主函数
(() => {
    anneal(setParameters())
})()