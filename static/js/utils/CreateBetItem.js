/**
 *
 * @param betNumbers
 * @param betType
 * @param betRate
 * @param optionalFields
 * @param ticketCost
 * @param ticketCount
 * @param unitPrice
 * @returns {Array}
 */
function createBetItem(betNumbers,betType,betRate,optionalFields,ticketCost,ticketCount,unitPrice){var numberType=betNumbers.numberType,subGameId=betNumbers.subGameId,numbers=betNumbers.numbers,optionalMin=betNumbers.optionalMin;var oddMax=betRate.oddMax,oneNoteLimit=betRate.oneNoteLimit,singleLimit=betRate.singleLimit;var leftName=betType.leftName,rightName=betType.rightName;var numberString='',mapIndex=0,needSeperatorInCol=false;if(numberType==="button"){var rows_1=[];if(numbers.length===1){needSeperatorInCol=true}numbers.forEach(function(item){var colString=[];item.cols.forEach(function(subItem){if(subItem.data_selected){colString.push(subItem.label)}});if(colString.length===0){colString.push('?')}rows_1.push(colString.join(needSeperatorInCol?',':''))});numberString=rows_1.join()}else{numberString=numbers.join()}if(optionalMin>0){numberString=optionalFields.sort().join('').replace(/1/g,'万').replace(/2/g,'千').replace(/3/g,'百').replace(/4/g,'十').replace(/5/g,'个')+'|'+numberString}var betArray=[];var oddArray=oddMax.split(',');var betName=rightName&&leftName!==rightName?leftName+"("+rightName+")":leftName;if(subGameId==="300312"||subGameId==="300412"||subGameId==="300512"){numbers[0].cols.forEach(function(item,index){if(item.data_selected){betArray.push({betName:betName,bonus:oddArray[index],lotteryNum:item.label,odds:oddMax,oneNoteLimit:oneNoteLimit,optionalMin:optionalMin,orderNum:1,singleLimit:singleLimit,subGameId:subGameId,totalAmount:unitPrice,unitPrice:unitPrice})}})}else{betArray.push({betName:betName,bonus:oddMax,lotteryNum:numberString,odds:oddMax,oneNoteLimit:oneNoteLimit,optionalMin:optionalMin,orderNum:ticketCount,singleLimit:singleLimit,subGameId:subGameId,totalAmount:ticketCost,unitPrice:unitPrice})}return betArray};