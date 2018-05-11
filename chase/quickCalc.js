
    var fhRound = function (value, digit) {
        if (digit === void 0) { digit = 3; }
        return Math.round(value * (Math.pow(10, digit))) / Math.pow(10, digit);
    };
    /**
     * 随机取整，
     * @param plus 倍数
     * @param add 偏移
     */
    var getRandomInt = function (plus, add) {
        if (add === void 0) { add = 0; }
        return Math.floor(Math.random() * plus + add);
    };
    /**
     * 排列,有重复
     * @param arr 数据
     * @param num 选几个数
     */
    var arrange = function (arr, num) {
        var result = [];
        (function f(t, a, n) {
            if (n === 0)
                return result.push(t);
            for (var i = 0, l = a.length; i < l; i++) {
                f(t.concat([a[i]]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
            }
        })([], arr, num);
        return result;
    };
    /**
     * 组合,无重复
     * @param arr 数据
     * @param num 选几个数
     */
    var combination = function (arr, num) {
        var result = [];
        (function f(t, a, n) {
            if (n === 0)
                return result.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat([a[i]]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return result;
    };
    /**
     * 从每个子数组中取一位
     * @param arr 二维数组
     */
    var allCombination = function (arr) {
        var result = [];
        (function f(t, a, n) {
            if (n < a.length) {
                a[n].forEach(function (item) {
                    if (n === a.length - 1) {
                        result.push(t.concat([item]));
                    }
                    else {
                        f(t.concat([item]), a, n + 1);
                    }
                });
            }
        })([], arr, 0);
        return result;
    };
    /**
     * numberTimes 每一行的选中的数量相乘，就是最后的结果，直选复式
     * @param numbers 选择的号码
     */
    var numberTimesClac = function (numbers) { return numbers.reduce(function (prev, item) { return prev * item.length; }, 1); };
    /**
     * fixedBet 每个号码固定对应几注
     * @param firstRow 第一行
     * @param countArr 每个号码对应的注数
     */
   var fixedBetClac = function (firstRow, countArr) { return firstRow.reduce(function (prev, item) { return prev + countArr[item]; }, 0); };
    /**
     * combineTimes 先对二维数组进行组合，然后把组合里每个数据的所有数组长度相乘，就是注数
     * @param numbers 二维数组
     * @param n 组合的关键参数
     * @param optionalFields 任选的位置
     */
    var combineTimesClac = function (numbers, n) {
        return combination(numbers, n).reduce(function (prev, item) { return prev + item.reduce(function (subPrev, subItem) { return subPrev * subItem.length; }, 1); }, 0);
    };
    /**
     * optionalFour 任四组选的 组选12 的专用方法
     * @param firstRow 第一行
     * @param secondRow 第二行
     * @param n 组选12传2
     * @param optionalFields 任选的位置
     */
    var optionalFourClac = function (firstRow, secondRow, n) {
        var ticketCount = 0;
        // 遍历选中的三重号
        firstRow.forEach(function (item) {
            var itemIndex = secondRow.indexOf(item);
            // 如果与单号有重复
            if (itemIndex > -1) {
                // 有重合就去掉重合的号码，重新对选中的单号进行 Cx1
                ticketCount += combination(secondRow.slice(0, itemIndex).concat(secondRow.slice(itemIndex + 1)), n).length;
            }
            else {
                // 加上单号选1的组合 Cx1
                ticketCount += combination(secondRow, n).length;
            }
        });
        return ticketCount;
    };
    /**
     * 计算胆拖
     * @param firstRow 胆码
     * @param secondRow 拖码
     * @param n 至少选几个号码
     */
    var calcDantuo = function (firstRow, secondRow, n) {
        return firstRow.length > 0 ? combination(secondRow, n - firstRow.length).length : 0;
    };
    /**
     * noOneEqual 的计算函数
     * @param numbers 选择的号码
     */
    var noOneEqualCalc = function (numbers) {
        var allPossibleCombines = allCombination(numbers);
        var ticketCount = 0;
        allPossibleCombines.forEach(function (item) {
            var isEffect = true;
            item.forEach(function (sub, index) {
                if (item.indexOf(sub) !== index) {
                    isEffect = false;
                }
            });
            if (isEffect) {
                ticketCount++;
            }
        });
        return ticketCount;
    };
});
/**
 * 快速排序
 * @param arr 要排序的数组
 */
// export const quickSort = <T>(arr: T[]): T[] => {
//     if (arr.length <= 1) { return arr; }
//     const pivotIndex = Math.floor(arr.length / 2);
//     const pivot = arr.splice(pivotIndex, 1)[0];
//     let left: T[] = [], right: T[] = [];
//     arr.forEach(item => {
//         if (item < pivot) {
//             left.push(item);
//         } else {
//             right.push(item);
//         }
//     })
//     return quickSort(left).concat([pivot], quickSort(right));
// };
