declare module "cases" {
    function cases<T1>(data: [T1][], callback: (arg1: T1, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2>(data: [T1, T2][], callback: (arg1: T1, arg2: T2, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3>(data: [T1, T2, T3][], callback: (arg1: T1, arg2: T2, arg3: T3, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3, T4>(data: [T1, T2, T3, T4][], callback: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3, T4, T5>(data: [T1, T2, T3, T4, T5][], callback: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3, T4, T5, T6>(data: [T1, T2, T3, T4, T5, T6][], callback: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3, T4, T5, T6, T7>(data: [T1, T2, T3, T4, T5, T6, T7][], callback: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    function cases<T1, T2, T3, T4, T5, T6, T7, T8>(data: [T1, T2, T3, T4, T5, T6, T7, T8][], callback: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8, done: Mocha.Done) => void): Mocha.AsyncFunc | undefined;
    
    namespace cases {}
    export = cases;
}