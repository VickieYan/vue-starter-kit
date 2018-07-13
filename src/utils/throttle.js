const throttle = (func, threshold = 100) => {
    let last 
    let deferTimer
    return function(...args) {
        const now = +new Date()
        if (last && now < last + threshold) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                func && func.apply(this, args)
            }, threshold)
        } else {
            last = now
            func && func.apply(this, args)
        }
    }
}

export default throttle