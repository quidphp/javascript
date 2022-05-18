/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */

// index
// entry file for the module

// simple import
import Datetime from './src/datetime.js';
import Debug from './src/debug.js';
import Env from './src/env.js';
import Factory from './src/factory.js';
import Html from './src/html.js';
import Json from './src/json.js';
import Nav from './src/nav.js';
import TestSuite from './src/testSuite.js';
import Validate from './src/validate.js';
import Vari from './src/vari.js';

// type import
import { ArrBase, ArrWriteSelf, ArrLoop } from './src/arr.js';
import ArrLikeRead from './src/arrLike.js';
import BoolPrimitive from './src/bool.js';
import FuncObj from './src/func.js';
import IntegerPrimitive from './src/integer.js';
import { NumPrimitive, NumFormat } from './src/num.js';
import { ObjBase, ObjKeyValue, ObjEach, ObjCopyFilterMap, ObjWrite, ObjWriteSelf, ObjProto } from './src/obj.js';
import PojoObj from './src/pojo.js';
import ScalarPrimitive from './src/scalar.js';
import StrPrimitive from './src/str.js';
import Type from './src/type.js';

// build
const Arr = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,ArrBase,ArrWriteSelf,ArrLoop);
const ArrLike = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ArrBase,ArrLikeRead,ArrLoop);
const Bool = Factory(Type,BoolPrimitive);
const Func = Factory(Type,ObjBase,FuncObj);
const Integer = Factory(Type,NumPrimitive,IntegerPrimitive);
const Num = Factory(Type,NumPrimitive,NumFormat);
const Obj = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,ObjProto);
const Pojo = Factory(Type,ObjBase,ObjKeyValue,ObjEach,ObjCopyFilterMap,ObjWrite,ObjWriteSelf,PojoObj);
const Scalar = Factory(Type,ScalarPrimitive);
const Str = Factory(Type,ObjBase,ObjKeyValue,ObjEach,StrPrimitive);
const Tool = { Type, ArrLoop };
const Test = { };
const Component = { };

// shortcut
const d = console.log;
const assert = Debug.assertThrow.bind(Debug);
const logError = Debug.logError.bind(Debug);
const Shortcut = { d, assert, logError };

// export
export { Arr, ArrLike, Bool, Component, Datetime, Debug, Env, Factory, Func, Html, Integer, Json, Nav, Num, Obj, Pojo, Scalar, Shortcut, Str, Validate, Vari, Test, TestSuite, Tool };