/**
 * Created by hanyonglu on 2017/11/8.
 */
/**
 *
 * @param betNumbers
 * var betNumbers ={
		 dantuoMax?: number // 11选5的胆拖
    end?: number // 结束位数
    hasSub: boolean // 是否显示遗漏冷热
    inputFormat?: number // 单式输入格式，限定每注有几个号码
    max?: number // 最大值
    maxSame?: number // 每注最多有几个号码能一样 -1表示没有上限
    min?: number // 最小值
    minSame?: number // 每注最少有几个号码能一样
    numberType: string // 选号类型， button 或者 input
    numberUnitFormat?: number // 用于单式的校验，每个号码是几位数
    numbers: any[] // button时，是一个二维数组， input时，是所有输入的号码数组
    optionalMin: number // 用于任选 1-常规 2-任选
    quickBtnOption: Array<InormalOptionProps<quickChooseNumberLabel, quickChooseNumberValue>> // 快捷选号
    start?: number // 起始位数
    subGameId: string // 子玩法id
          };
 * @param optionalFields
 * @returns {number}
 */
function calcChooseBetCount(betNumbers,optionalFields){var subGameId=betNumbers.subGameId,dantuoMax=betNumbers.dantuoMax,numbers=betNumbers.numbers,optionalMin=betNumbers.optionalMin;var ticketCount=0,newNumbers=[];numbers.forEach(function(row){var selectedNumber=[];row.cols.forEach(function(col,index){if(col.data_selected){selectedNumber.push(index)}});newNumbers.push(selectedNumber)});var firstRow=newNumbers[0],secondRow=newNumbers[1];if(calcBetCountConfig.numberTimes[subGameId]){switch(subGameId){case "300305":case "300405":case "300505":ticketCount=3*numberTimesClac(newNumbers);break;default:ticketCount=numberTimesClac(newNumbers);break}}if(calcBetCountConfig.fixedBet[subGameId]){ticketCount=fixedBetClac(firstRow,fixedBetNumberConfig.plusAndCrossValueArray[subGameId]);}if(calcBetCountConfig.baodan[subGameId]){ticketCount=firstRow.length*fixedBetNumberConfig.baodanFixedValue[subGameId]}if(calcBetCountConfig.oneCombine[subGameId]){ticketCount=newNumbers.reduce(function(prev,item){return prev+combination(item,1).length},0)}if(calcBetCountConfig.twoCombine[subGameId]){ticketCount=combination(firstRow,2).length}if(calcBetCountConfig.threeCombine[subGameId]){ticketCount=combination(firstRow,3).length}if(calcBetCountConfig.combineTimes[subGameId]){switch(subGameId){case "301001":ticketCount=combineTimesClac(newNumbers,2);break;case "301101":ticketCount=combineTimesClac(newNumbers,3);break;case "301201":ticketCount=combineTimesClac(newNumbers,4);break}}if(calcBetCountConfig.twoArrange[subGameId]){ticketCount=arrange(firstRow,2).length}if(calcBetCountConfig.moreCombine[subGameId]){ticketCount=combination(firstRow,parseInt(subGameId.charAt(5))).length}if(calcBetCountConfig.noOneEqual[subGameId]){ticketCount=noOneEqualCalc(newNumbers)}if(calcBetCountConfig.dantuo[subGameId]){ticketCount=calcDantuo(firstRow,secondRow,dantuoMax)}if(subGameId==='400701'){ticketCount=firstRow.length*secondRow.length;}if(subGameId==="301203"){ticketCount=combination(firstRow,4).length;}if(subGameId==="301204"){ticketCount=optionalFourClac(firstRow,secondRow,2);}if(optionalMin>0){ticketCount*=combination(optionalFields,optionalMin).length}return{ticketCount:ticketCount,newNumbers:newNumbers}};function calcInputBetCount(betNumbers,inputNumber,optionalFields){if(/^[\d,\s,,,;]*$/.test(inputNumber)){var orginalNumbers=inputNumber.replace(/[\s,,,;]+/g,',').split(',');var inputFormat_1=betNumbers.inputFormat,max_1=betNumbers.max,maxSame_1=betNumbers.maxSame,min_1=betNumbers.min,minSame_1=betNumbers.minSame,numberUnitFormat_1=betNumbers.numberUnitFormat,optionalMin=betNumbers.optionalMin;var reg_1=new RegExp("\\B(?=(\\d{"+numberUnitFormat_1+"})+(?!\\d))",'g');var numbers_1=[],msg_1='';orginalNumbers.forEach(function(item){if(item!==''){var arr_1=item.replace(reg_1,',').split(','),sameNumber_1=1,content_1='';arr_1.forEach(function(unit){if(unit.length!==numberUnitFormat_1){content_1=item+"\u683C\u5F0F\u4E0D\u6B63\u786E"}});if(arr_1.length!==inputFormat_1){content_1=item+"\u4E0D\u662F"+inputFormat_1+"\u4E2A\u53F7\u7801\uFF0C\u65E0\u6CD5\u4F5C\u4E3A\u4E00\u6CE8"}else{var sortNumbers=arr_1.sort();var maxNumber=parseInt(sortNumbers[arr_1.length-1]),minNumber=parseInt(sortNumbers[0]);if(maxNumber>max_1||minNumber<min_1){content_1=item+"\u4E2D\u6709\u4E0D\u5C5E\u4E8E\u8BE5\u73A9\u6CD5\u7684\u53F7\u7801"}}if(!content_1){arr_1.forEach(function(item){var same=0;arr_1.forEach(function(sub){if(item===sub){same+=1}});if(same>sameNumber_1){sameNumber_1=same}});if(sameNumber_1<minSame_1){content_1="\u6BCF\u6CE8\u53F7\u7801\u81F3\u5C11\u6709"+minSame_1+"\u4E2A\u76F8\u540C\u7684\u6570\uFF0C"+item+"\u4E2D\u53EA\u6709"+sameNumber_1+"\u4E2A\u76F8\u540C\u7684\u6570"}if(maxSame_1>0&&sameNumber_1>maxSame_1){content_1="\u6BCF\u6CE8\u53F7\u7801\u81F3\u591A\u6709"+maxSame_1+"\u4E2A\u76F8\u540C\u7684\u6570\uFF0C"+item+"\u4E2D\u6709"+sameNumber_1+"\u4E2A\u76F8\u540C\u7684\u6570"}}if(content_1){if(!msg_1){msg_1=content_1}}else{numbers_1.push(item)}}});return{msg:msg_1,numbers:numbers_1,ticketCount:optionalMin>0?numbers_1.length*combination(optionalFields,optionalMin).length:numbers_1.length}}else{return{msg:'您输入的号码不合规范，请参考玩法说明',numbers:[],ticketCount:0}}};