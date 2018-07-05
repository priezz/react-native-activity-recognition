#import <React/RCTEventEmitter.h>
#import <CoreMotion/CoreMotion.h>


@interface RNActivityRecognition : RCTEventEmitter <RCTBridgeModule>

@property(nonatomic, strong) CMMotionActivityManager *motionActivityManager;

- (NSDate *)parseISO8601DateFromString:(NSString *)date;
- (NSDate *)dateFromOptions:(NSDictionary *)options key:(NSString *)key withDefault:(NSDate *)defaultValue;


@end
  
