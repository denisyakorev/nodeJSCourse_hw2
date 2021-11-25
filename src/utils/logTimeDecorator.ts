export const logTime = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
   const originalMethod = descriptor.value;
    descriptor.value = function(...args: Parameters<typeof originalMethod>) {
        console.time(propertyKey);
        let returnValue = originalMethod.apply(this, args);
        console.timeEnd(propertyKey);
        return returnValue;
    }
};