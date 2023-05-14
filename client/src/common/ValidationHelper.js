export class ValidationHelper {
    static isString(arg) {
        return arg !== null && typeof arg === 'string';
    }

    static isEmptyString(arg) {
        return this.isString(arg) && arg.length === 0;
    }

    static isNotEmptyString(arg) {
        return this.isString(arg) && !this.isEmptyString(arg);
    }

    static isUndefined(arg) {
        return arg === undefined;
    }

    static isNull(arg) {
        return arg == null;
    }

    static isUndefinedOrNull(arg) {
        return this.isUndefined(arg) || this.isNull(arg);
    }

    static isNotUndefinedOrNull(arg) {
        return !this.isUndefinedOrNull(arg);
    }

    static isUndefinedOrTrue(arg) {
        return this.isUndefined(arg) || arg === true;
    }

    static isUndefinedOrFalse(arg) {
        return this.isUndefined(arg) || arg === false;
    }
}