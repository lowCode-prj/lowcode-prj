export function getResult(num, index, threshold) {
    let color;
    let result1 = true
    let result2 = true
    let item = threshold[0]
    if (item.judge1 && item.value1) {
        switch (item.judge1) {
            case ">":
                if (num > item.value1) {
                    result1 = true
                } else {
                    result1 = false
                }
                break;
            case "<":
                if (num < item.value1) {
                    result1 = true
                } else {
                    result1 = false
                }
                break;
            case "<=":
                if (num <= item.value1) {
                    result1 = true
                } else {
                    result1 = false
                }
                break;
            case ">=":
                if (num >= item.value1) {
                    result1 = true
                } else {
                    result1 = false
                }
                break;
            default:
                break;
        }
    }else{
        result1=null
    }
    if (item.judge2 && item.value2) {
        switch (item.judge2) {
            case ">":
                if (num > item.value2) {
                    result2 = true
                } else {
                    result2 = false
                }
                break;
            case "<":
                if (num < item.value2) {
                    result2 = true
                } else {
                    result2 = false
                }
                break;
            case "<=":
                if (num <= item.value2) {
                    result2 = true
                } else {
                    result2 = false
                }
                break;
            case ">=":
                if (num >= item.value2) {
                    result2 = true
                } else {
                    result2 = false
                }
                break;
            default:
                break;
        }
    }else{
        result2=null
    }
    if ((result1 && result2) || (result1==null&& result2) || (result1&& result2==null)) {
        color = item.color[index];
    }

    //   console.log(color)
    return color;
}

// 此方法或许还有参考价值，暂时没删
// export function getResult(num, index, threshold) {
//     let color;
//     if (threshold && threshold.length > 0) {
//         threshold.forEach(item => {
//             if (item.judge && item.value) {
//                 switch (item.judge) {
//                     case ">":
//                         if (num > item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     case "<":
//                         if (num < item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     case "<=":
//                         if (num <= item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     case ">=":
//                         if (num >= item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     case "==":
//                         if (num == item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     case "!=":
//                         if (num != item.value) {
//                             color = item.color[index];
//                         }
//                         break;
//                     default:
//                         break;
//                         // execute default code block
//                 }
//             }
//         });
//     }
//     //   console.log(color)
//     return color;
// }