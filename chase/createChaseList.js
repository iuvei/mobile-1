//var __assign = (this && this.__assign) || Object.assign || function(t) {
//  for (var s, i = 1, n = arguments.length; i < n; i++) {
//      s = arguments[i];
//      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//          t[p] = s[p];
//  }
//  return t;
//};
//define(["require", "exports", "./calcChaseList", "moment", "../../services/enum", "../interface", "../../services/fetchInfo"], function (require, exports, calcChaseList_1, moment_1, enum_1, interface_1, fetchInfo_1) {
//  "use strict";
//  Object.defineProperty(exports, "__esModule", { value: true });
    var createChaseList = function (_a) {
        var confirmBetFields = _a.confirmBetFields, betList = _a.betList, chaseList = _a.chaseList, periodNo = _a.periodNo, gameType = _a.gameType, isFirst = _a.isFirst;
        var chaseAfterPercent = confirmBetFields.chaseAfterPercent, chaseBeforePercent = confirmBetFields.chaseBeforePercent, chaseBeforePeriod = confirmBetFields.chaseBeforePeriod, chaseMinNumber = confirmBetFields.chaseMinNumber, chaseMinPercent = confirmBetFields.chaseMinPercent, chasePeriods = confirmBetFields.chasePeriods, chasePrePay = confirmBetFields.chasePrePay, chaseTimes = confirmBetFields.chaseTimes, chaseWinType = confirmBetFields.chaseWinType, confirmBetType = confirmBetFields.confirmBetType;
        // 普通追号
        var newChaseList = [], finalChaseList = [], targetChasePeriods = chasePeriods.value, msg = '';
        // 是否重新生成追号方案，两者的区别在于是否使用现有追号的倍数
        if (isFirst) {
            for (var i = 0; i < chasePeriods.value; i++) {
                newChaseList.push({
                    currentPay: 0,
                    hasPay: 0,
                    profit: '',
                    profitRate: '',
                    periodNo: createChasePeriod(periodNo, i, gameType),
                    times: chaseTimes.value
                });
            }
        }
        else {
            newChaseList = chaseList.reduce(function (prev, item, index) {
                return prev.concat([
                    __assign({}, item, { periodNo: createChasePeriod(periodNo, index, gameType), times: item.times })
                ]);
            }, newChaseList);
        }
        // 如果是常规追号
        if (confirmBetType.value === enum_1.confirmBetTypeEnum.common) {
            var hasPay_1 = 0;
            newChaseList.forEach(function (item) {
                var times = item.times;
                var currentPay = 0;
                // 多条投注的情况下，每条追号的当前投入，要把所有投注的金额相加
                currentPay = betList.reduce(function (prev, item) { return prev + item.totalAmount * times; }, 0);
                currentPay = parseFloat(currentPay.toFixed(2));
                hasPay_1 += currentPay;
                hasPay_1 = parseFloat(hasPay_1.toFixed(2));
                // 默认不计算盈利
                var profit = {
                    profit: '--',
                    profitRate: '--'
                };
                // 如果只有一条投注，再来计算盈利
                if (betList.length === 1) {
                    profit = calcChaseList_1.default.calcProfitByChaseTimes({
                        chaseTimes: times,
                        betItem: betList[0],
                        hasPay: hasPay_1
                    });
                }
                finalChaseList.push({
                    currentPay: currentPay,
                    hasPay: hasPay_1,
                    periodNo: item.periodNo,
                    profit: profit.profit,
                    profitRate: profit.profitRate,
                    times: times,
                });
            });
        }
        else {
            // 高级追号，只有一条投注
            var hasPay_2 = chasePrePay.value;
            var betItem_1 = betList[0];
            // 最低盈利率
            if (chaseWinType.value === 1) {
                newChaseList.forEach(function (item, index) {
                    var times = 0;
                    if (isFirst) {
                        times = calcChaseList_1.default.calcChaseTimesByProfitRate({
                            profitRate: chaseMinPercent.value,
                            hasPay: hasPay_2,
                            betItem: betItem_1
                        });
                        times = times >= chaseTimes.value ? times : chaseTimes.value;
                    }
                    else {
                        times = item.times;
                    }
                    // 如果倍数为0，不添加此条追号
                    if (times !== 0 && times < 99999) {
                        var currentPay = betItem_1.totalAmount * times;
                        currentPay = parseFloat(currentPay.toFixed(2));
                        hasPay_2 += currentPay;
                        hasPay_2 = parseFloat(hasPay_2.toFixed(2));
                        var profit = calcChaseList_1.default.calcProfitByChaseTimes({
                            chaseTimes: times,
                            betItem: betItem_1,
                            hasPay: hasPay_2
                        });
                        finalChaseList.push({
                            periodNo: item.periodNo,
                            times: times,
                            currentPay: currentPay,
                            hasPay: hasPay_2,
                            profit: profit.profit,
                            profitRate: profit.profitRate,
                        });
                    }
                });
            }
            // 前n期多少最低盈利率，后面最低多少盈利率
            if (chaseWinType.value === 2) {
                newChaseList.forEach(function (item, index) {
                    var targetProfitRate;
                    if (index < chaseBeforePeriod.value) {
                        targetProfitRate = chaseBeforePercent.value;
                    }
                    else {
                        targetProfitRate = chaseAfterPercent.value;
                    }
                    var times = 0;
                    if (isFirst) {
                        times = calcChaseList_1.default.calcChaseTimesByProfitRate({
                            profitRate: targetProfitRate,
                            hasPay: hasPay_2,
                            betItem: betItem_1
                        });
                        times = times >= chaseTimes.value ? times : chaseTimes.value;
                    }
                    else {
                        times = item.times;
                    }
                    if (times !== 0 && times < 99999) {
                        var currentPay = betItem_1.totalAmount * times;
                        currentPay = parseFloat(currentPay.toFixed(2));
                        hasPay_2 += currentPay;
                        hasPay_2 = parseFloat(hasPay_2.toFixed(2));
                        var profit = calcChaseList_1.default.calcProfitByChaseTimes({
                            chaseTimes: times,
                            betItem: betItem_1,
                            hasPay: hasPay_2
                        });
                        finalChaseList.push({
                            currentPay: currentPay,
                            hasPay: hasPay_2,
                            periodNo: item.periodNo,
                            profit: profit.profit,
                            profitRate: profit.profitRate,
                            times: times,
                        });
                    }
                });
            }
            // 最低盈利多少元
            if (chaseWinType.value === 3) {
                newChaseList.forEach(function (item, index) {
                    var times = 0;
                    if (isFirst) {
                        times = calcChaseList_1.default.calcChaseTimesByProfit({
                            profit: chaseMinNumber.value,
                            hasPay: hasPay_2,
                            betItem: betItem_1
                        });
                        times = times >= chaseTimes.value ? times : chaseTimes.value;
                    }
                    else {
                        times = item.times;
                    }
                    if (times !== 0 && times < 99999) {
                        var currentPay = betItem_1.totalAmount * times;
                        currentPay = parseFloat(currentPay.toFixed(2));
                        hasPay_2 += currentPay;
                        hasPay_2 = parseFloat(hasPay_2.toFixed(2));
                        var profit = calcChaseList_1.default.calcProfitByChaseTimes({
                            chaseTimes: times,
                            betItem: betItem_1,
                            hasPay: hasPay_2
                        });
                        finalChaseList.push({
                            currentPay: currentPay,
                            hasPay: hasPay_2,
                            periodNo: item.periodNo,
                            profit: profit.profit,
                            profitRate: profit.profitRate,
                            times: times,
                        });
                    }
                });
            }
        }
        if (finalChaseList.length < targetChasePeriods) {
            fetchInfo_1.fhMessage({ type: 'error', msg: "\u60A8\u8BBE\u5B9A\u7684\u6761\u4EF6\u53EA\u80FD\u751F\u6210" + finalChaseList.length + "\u671F\u8FFD\u53F7", destory: true });
        }
        else {
            fetchInfo_1.fhMessage({ msg: '生成追号方案成功', destory: true });
        }
        return finalChaseList;
    };
    /**
     * 生成追号下一期的期号
     * @param period 当前期号
     * @param offset 期数偏移
     * @param gameId 彩种id
     */
    var createChasePeriod = function (period, offset, gameType) {
        var periodNoAll = gameType.periodNoAll, kindId = gameType.kindId;
        if (kindId === interface_1.PK10_KINDID) {
            return parseInt(period) + offset + '';
        }
        else {
            var digit = period.length - 8;
            // 当前期号的日期
            var periodTime = period.substr(0, 8);
            // 转化为moment型，方便后面计算
            var momentTime = moment_1.default(periodTime, 'YYYYMMDD');
            var nowPeriodString = period.substr(8, digit);
            // 当前期号
            var nowPeriod = parseInt(period.substr(8, digit));
            // 目标期号
            var targetPeriod = nowPeriod + offset;
            var targetTime = void 0;
            if (targetPeriod > periodNoAll) {
                targetPeriod -= periodNoAll;
                targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
            }
            else {
                targetTime = periodTime;
            }
            var targetPeriodString = targetPeriod + '';
            return targetTime + targetPeriodString.padStart(digit, '0');
        }
    };
//  exports.default = createChaseList;
//});
