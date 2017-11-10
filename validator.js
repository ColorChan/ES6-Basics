/**
 * Created by Administrator on 2017/11/9
 */

let strategies = {
    noEmpty(item, errMsg) {
        if (item === '') {
            return errMsg
        }
    },
    imgExtension(item, errMsg) {
        let ImgReg = /\.(jpe?g|png|bmp)$/i;
        if (!ImgReg.test(item.name)) {
            return errMsg
        }
    },
    imgSize(item, errMsg) {
        if (item.size > 1024 * 1024 * 2) {
            return errMsg
        }
    }
}

class Validator {
    constructor() {
        // validateFunArray用来存储验证函数: [fun, fun, ...]
        this.validateFunArray = []
    }
    itemRules(rules) {
        // this.validateFuArray = []
        for (let rule of rules) {
            (() => {
                // strategyArray : [ 需要验证的val, 报错信息 ]
                this.validateFunArray.push(function (item) {
                    let strategyArray = []
                    let strategy = rule.strategy.split(':')[0]
                    strategyArray.push(item, rule.errMsg)
                    return strategies[strategy].apply(Object, strategyArray)
                })
            })(rule)
        }
    }
    startValidate(item) {
        for (let validateFun of this.validateFunArray) {
            if (validateFun(item)) {
                return validateFun(item)
            }
        }
    }
}

export const validator = new Validator()


/**
 * usecase
 *
 * validator.itemRules([{strategy: 'strategy01', errMsg: 'xxx'}])
 * console.log(validator.startValidate(item))
 *
 */
