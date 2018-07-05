import {NativeModules, NativeEventEmitter} from 'react-native'

const {RNActivityRecognition} = NativeModules

const emitter = new NativeEventEmitter(RNActivityRecognition)
let subscription = null

export default {
    STATIONARY: RNActivityRecognition.IOS_STATIONARY,
    WALKING: RNActivityRecognition.IOS_WALKING,
    AUTOMOTIVE: RNActivityRecognition.IOS_AUTOMOTIVE,

    subscribe(success: Function) {
        subscription = emitter.addListener(
            'ActivityDetection',
            (activity) => {
                success({
                    ...activity,
                    get sorted() {
                        return Object.keys(activity)
                            .map(type => ({type: type, confidence: activity[type]}))
                    }
                })
            }
        )
        return () => subscription.remove()
    },

    // getHistory: RNActivityRecognition.getHistory,
    getHistory: (options: {startDate: string, endDate: string}) => new Promise((resolve, reject) => {
        RNActivityRecognition.getHistory(options, (err, res) => err ? reject(err) : resolve(res))
    }),

    start: (time: number) => new Promise((resolve, reject) => {
        RNActivityRecognition.startActivity(time, logAndReject.bind(null, resolve, reject))
    }),

    startMocked: (time: number, mockActivity: string) => new Promise((resolve, reject) => {
        RNActivityRecognition.startMockedActivity(time, mockActivity, logAndReject.bind(null, resolve, reject))
    }),

    stopMocked: () => new Promise((resolve, reject) => {
        RNActivityRecognition.stopMockedActivity(logAndReject.bind(null, resolve, reject))
    }),

    stop: () => new Promise((resolve, reject) => {
        RNActivityRecognition.stopActivity(logAndReject.bind(null, resolve, reject))
    }),
}

const logAndReject = (resolve, reject, errorMsg) => errorMsg ? reject(errorMsg) : resolve()
