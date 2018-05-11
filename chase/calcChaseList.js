//define(["require", "exports", "./quickCalc"], function (require, exports, quickCalc_1) {
//  "use strict";
//  Object.defineProperty(exports, "__esModule", { value: true });
    var calcChaseTimesByProfit = function (_a) {
        var profit = _a.profit, hasPay = _a.hasPay, betItem = _a.betItem;
        var odds = betItem.odds, totalAmount = betItem.totalAmount;
        var oddArray = odds.split(',').map(function (item) { return parseFloat(item); }).sort(function (a, b) { return a - b; });
        var oddMin = oddArray[0];
        var betTimes = calcBetTimes(betItem);
        var maxBonus = oddMin * betTimes - totalAmount;
        if (maxBonus <= 0) {
            return 0;
        }
        var chaseTimes = Math.ceil((profit + hasPay) / (betTimes * oddMin - totalAmount));
        return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes;
    };
    var calcChaseTimesByProfitRate = function (_a) {
        var profitRate = _a.profitRate, hasPay = _a.hasPay, betItem = _a.betItem;
        var odds = betItem.odds, totalAmount = betItem.totalAmount;
        var oddArray = odds.split(',').map(function (item) { return parseFloat(item); }).sort(function (a, b) { return a - b; });
        var oddMin = oddArray[0];
        var betTimes = calcBetTimes(betItem);
        // 盈利率上限
        var profitRateMax = (oddMin * betTimes - totalAmount) / totalAmount * 100;
        if (hasPay === 0) {
            // 目标超过最大可能，返回0
            if (profitRate > profitRateMax) {
                return 0;
            }
            else {
                return 1;
            }
        }
        var chaseTimes = Math.ceil(hasPay * (profitRate / 100 + 1) / (oddMin * betTimes - totalAmount - profitRate * totalAmount / 100));
        return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes;
    };
    var calcProfitByChaseTimes = function (_a) {
        var chaseTimes = _a.chaseTimes, betItem = _a.betItem, hasPay = _a.hasPay;
        // 下注号码可能中奖的注数，一般情况下是一注
        var subGameId = betItem.subGameId, lotteryNum = betItem.lotteryNum, odds = betItem.odds, optionalMin = betItem.optionalMin;
        var betTimes = calcBetTimes(betItem);
        var oddArray = odds.split(',').map(function (item) { return parseFloat(item); }).sort(function (a, b) { return a - b; });
        var oddMin = oddArray[0];
        var oddMax = oddArray[oddArray.length - 1];
        var profit = {
            min: calcProfitAndRate({ odds: oddMin, chaseTimes: chaseTimes, betTimes: betTimes, hasPay: hasPay }),
            max: calcProfitAndRate({ odds: oddMax, chaseTimes: chaseTimes, betTimes: betTimes, hasPay: hasPay })
        };
        if (oddArray.length === 1) {
            return {
                profit: profit.min.profit.toFixed(3),
                profitRate: profit.min.profitRate + '%'
            };
        }
        else {
            return {
                profit: profit.min.profit.toFixed(3) + '~' + profit.max.profit.toFixed(3),
                profitRate: profit.min.profitRate + '%~' + profit.max.profitRate + '%'
            };
        }
    };
    var calcProfitAndRate = function (_a) {
        var odds = _a.odds, chaseTimes = _a.chaseTimes, betTimes = _a.betTimes, hasPay = _a.hasPay;
        var all = odds * chaseTimes * betTimes;
        var real = all - hasPay;
        return {
            profit: real,
            profitRate: fhRound(real / hasPay * 100)
        };
    };
    /**
     * 计算注单最大可中注数
     * @param betItem 注单
     */
    var calcBetTimes = function (betItem) {
        var betTimes = 1;
        var subGameId = betItem.subGameId, lotteryNum = betItem.lotteryNum, optionalMin = betItem.optionalMin;
        if (subGameId === "300101") {
            var lotteryNumArray = lotteryNum.replace(/\?/g, '').split(',');
            betTimes = lotteryNumArray.reduce(function (prev, item) { return item.length > 0 ? ++prev : prev; }, 0);
        }
        if (optionalMin > 0) {
            var optionalNum = lotteryNum.split('|')[0];
            betTimes = quickCalc_1.combination(optionalNum.split(''), optionalMin).length;
        }
        return betTimes;
    };
    var calcChaseList = {
        calcChaseTimesByProfit: calcChaseTimesByProfit,
        calcChaseTimesByProfitRate: calcChaseTimesByProfitRate,
        calcProfitByChaseTimes: calcProfitByChaseTimes,
    };
//  exports.default = calcChaseList;
//});
