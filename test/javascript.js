/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */

// node
// script to test the node files

// import
import * as Quid from '../index.js';
const { Arr, ArrLike, Bool, Datetime, Env, Func, Html, Integer, Json, Nav, Num, Obj, Pojo, Scalar, Shortcut, Str, Test, Validate, Vari } = Quid;
const { d, assert, logError } = Shortcut;

// node
Test.Node = function()
{   
    let r = true;
    
    try 
    {
        // prepare
        const noop = function() { };
        const isEmpty = Str.isEmpty.bind(Str);
        
        // js
        assert(Object.getPrototypeOf(Obj) === Object.getPrototypeOf(Str));
        assert(Arr.is !== Obj.is);
        assert(Obj.each === Str.each);
        assert(!(false == null));
        assert(!(0 == null));
        assert(!('' == null));
        assert(null == null);
        assert(undefined == null);
        assert(!([] == true));
        
        // arr
        assert(Arr.is([]));
        assert(!Arr.is({}));
        assert(!Arr.is(arguments));
        assert(Arr.in(null,[null]));
        assert(!Arr.in(null,null));
        assert(!Arr.in(true,[false]));
        assert(Arr.isEqual(Arr.keys([1,2,3]),[0,1,2]));
        assert(Arr.search(2,[1,2,3]) === 1);
        assert(Arr.isEqual(Arr.slice(1,3,[2,4,6,8,10]),[4,6]));
        assert(Arr.isEqual(Arr.slice(1,undefined,[2,4,6,8,10]),[4,6,8,10]));
        assert(Arr.isEqual(Arr.slice(null,null,[2,4,6,8,10]),[2,4,6,8,10]));
        assert(Arr.isEqual(Arr.sliceStart(2,[2,4,6,8,10]),[6,8,10]));
        let spliceArr = [12,3,40];
        Arr.spliceValue(3,spliceArr);
        assert(Arr.isEqual(spliceArr,[12,40]));
        assert(Arr.isEqual(Arr.spliceValue(40,spliceArr,'ok'),[40]));
        assert(Arr.isEqual(spliceArr,[12,'ok']));
        assert(Vari.isEqual(Arr.valueStrip(3,[3,2,3,1,5]),[2,1,5]));
        assert(Arr.isEmpty([]));
        assert(Arr.isNotEmpty([null]));
        assert(Arr.isNotEmpty([1,2,3]));
        assert(!Arr.isNotEmpty([]));
        assert(!Arr.isEmpty(''));
        assert(Arr.isEqual(Arr.typecheck([]),[]));
        assert(Arr.isEqual(Arr.typecheck([1],true),[1]));
        assert(Arr.typecheck(undefined,false) === undefined);
        assert(Arr.isEqual([],[]));
        assert(!Arr.isEqual({},{}));
        let arr = [3,2,3,1,5];
        assert(Arr.valueFirst(arr) === 3);
        assert(Arr.valueLast(arr) === 5);
        assert(Arr.valueFirst([]) === undefined);
        assert(Arr.valueStrip('8',arr) !== arr);
        assert(Arr.keyFirst(arr) === 0);
        assert(Arr.keyLast(arr) === 4);
        assert(Arr.isEqual(Arr.valueStrip('8',arr),arr));
        let arrKey;
        assert(Vari.isEqual(Arr.copy([1,2,3]),[1,2,3]));
        let arrCopy = [1,2,3];
        assert(Arr.copy(arrCopy) !== arrCopy);
        assert(Arr.each([1,2,3],function(value,key) {
            assert(value !== this);
            arrKey = key;
        }));
        assert(arrKey === 2);
        assert(Arr.length([1,2,3]) === 3);
        assert(Arr.isEqual(Arr.set(1,'z',['a','b','c']),['a','z','c']));
        assert(Arr.isEqual(arrCopy,[1,2,3]));
        assert(Arr.setRef(2,4,arrCopy) === arrCopy);
        let mergeRef = [1,2,3];
        assert(Arr.mergeRef(mergeRef,'what',[4,5,6],arguments) === mergeRef);
        assert(Arr.isEqual(Arr.merge([1,2,3],'what',[4,5,6],arguments),mergeRef));
        assert(Arr.merge(mergeRef) !== mergeRef);
        assert(Arr.mergeRef(mergeRef) === mergeRef);
        assert(Arr.length(mergeRef) === 8);
        assert(Arr.isEqual(arrCopy,[1,2,4]));
        assert(Arr.length(Arr.merge([1,2,3],[4,5,6],arguments)) === 7);
        assert(Arr.some([1,'2',3],function(value,index,arr) {
            assert(Arr.is(arr));
            return Str.is(value);
        }));
        assert(!Arr.some([1,'2',3],function(value,index,arr) {
            return Obj.is(value);
        }));
        assert(!Arr.every([1,'2',3],function(value,index,arr) {
            assert(Arr.is(arr));
            return Str.is(value);
        }));
        assert(Arr.every([1,2,3],function(value,index,arr) {
            return Integer.is(value);
        }));
        assert(Arr.find([1,2,3],function(value,index,arr) {
            assert(Integer.is(value));
            assert(Integer.is(index));
            assert(Arr.is(arr));
            return value === 2;
        }) === 2);
        assert(Arr.isEqual(Arr.map([1,2,3],function(value,index,arr) {
            assert(Arr.is(arr));
            return index;
        }),[0,1,2]));
        assert(Arr.filter([1,2,3],function(value,key,array) {
            if(value === 1)
            assert(key === 0);
            assert(Arr.is(arr));
            return value === 2;
        }).length === 1);
        assert(Arr.reduce("",['test','ok','what'],function(r,value,index,arr) {
            assert(Arr.is(arr));
            return r += index+value;
        }) === '0test1ok2what');
        assert(Arr.isEqual(Arr.replace([1,2,2],[4,5],[0]),[0,5,2]));
        assert(Arr.isEqual(Arr.clean([null,undefined,0,'0',[],{},false,true,'',1]),[0,'0',false,true,1]));
        assert(Arr.timeouts([1,2,3],20,20,function(value) {
            assert(Integer.is(value));
        }));
        assert(Arr.oddEven([1,2,3],function(value) {
            assert(value !== 2);
        },function(value) {
            assert(value === 2);
        }));
        assert(Arr.findKey([3,4,5],function(value,index,arr) {
            assert(arr == null);
            return (value === 4);
        }) === 1);
        assert(Arr.accumulate(0,[2,3,4],function(value,index,arr) {
            assert(arr == null);
            return value;
        }) === 9);
        assert(Arr.accumulate('',['eh','ok','what'],function(value,index) {
            return value;
        }) === 'ehokwhat');
        assert(Arr.isEqual(Arr.accumulate([],['eh','ok','what'],function(value,index) {
            return index+value;
        }),["0eh","1ok","2what"]));
        assert(Arr.isEqual(Arr.column('test',[{ test: 'OK'},{test2: 'WELL', test: 'OK2'},{test2: 'NOP'}]),['OK','OK2']));
        
        // arrLike
        assert(!ArrLike.is([]));
        assert(!ArrLike.is({}));
        assert(!ArrLike.is(function() { }));
        assert(ArrLike.is(arguments));
        assert(!ArrLike.is(2));
        assert(!ArrLike.is('str'));
        assert(!ArrLike.is(null));
        assert(ArrLike.isEmpty(arguments));
        assert(!ArrLike.isNotEmpty(arguments));
        assert(ArrLike.typecheck(arguments) === arguments);
        assert(ArrLike.typecheck(undefined,false) === undefined);
        assert(ArrLike.length(arguments) === 0);
        assert(ArrLike.toArray(arrCopy) === arrCopy);
        
        // bool
        assert(!Bool.is('true'));
        assert(!Bool.is(function() { }));
        assert(!Bool.is(null));
        assert(!Bool.is(1));
        assert(Bool.is(true));
        assert(Bool.typecheck(true));
        assert(Bool.typecheck(false) === false);
        assert(Bool.toggle(false) === true);
        assert(Bool.isEmpty(false));
        assert(!Bool.isEmpty(0));
        assert(Bool.isNotEmpty(true));
        assert(Bool.toInt(true) === 1);
        assert(Bool.toInt(false) === 0);
        assert(Bool.typecheck(null,false) === null);
        assert(Bool.typecheck(false) === false);
        assert(Bool.typecheck(true,false) === true);
        
        // datetime
        assert(Num.is(Datetime.now()));
        assert(Num.is(Datetime.year()));
        assert(Str.length(Datetime.localeFormat('fr-CA')) >= 19);
        assert(Datetime.ymd(null,2010,2,3) === "2010-02-03");
        assert(Datetime.ymd(1519241542) === "2018-02-21");
        assert(Datetime.his(1519241542) === "14:32:22");
        
        // debug
        
        // env
        if(typeof window === 'undefined')
        {
            assert(Env.isNode());
            assert(!Env.isBrowser());
            assert(!Env.isWindow('test'));
            assert(!Env.isTarget('test'));
        }
        else
        {
            assert(!Env.isNode());
            assert(Env.isBrowser());
            assert(Env.isWindow(window));
            assert(Env.isTarget(window));
            assert(Env.isTarget(document));
            const html = document.querySelector("html");
            assert(Env.isTarget(html));
        }
        
        // factory
        
        // func
        assert(!Func.is('test'));
        assert(Func.is(noop));
        assert(Func.length(noop) === 0);
        Func.typecheck(noop);
        Func.typecheck(null,false);
        Func.timeout(null,function() {
            assert(true);
        });
        assert(Func.is(Func.debounce(2,function() {})));
        assert(Func.is(Func.throttle(2,function() {})));
        const debounceFunc = Func.debounce(100,function(arg) {
            assert(arg === 99);
        });
        for (var i = 0; i < 100; i++) {
            debounceFunc(i);
        }
        const throttleFunc = Func.throttle(50,function(arg) {
            assert(Integer.is(arg));
        });
        for (var i = 0; i < 100; i++) {
            let arg = i;
            Func.timeout(arg,function() { throttleFunc(arg) });
        }
        
        // html
        assert(Html.isSelfClosing('br'));
        assert(!Html.isSelfClosing('div'));
        assert(Html.escape("L'arti\"cle") === "L&#39;arti&quot;cle");
        assert(Html.escape("<test>ok</test>") === "&lt;test&gt;ok&lt;/test&gt;");
        assert(Html.start('div','james') === '<div>james');
        assert(Html.start('img',null,{src: "james.jpg"}) === "<img src='james.jpg'/>");
        assert(Html.start('img','bleh.jpg',{src: "james.jpg"}) === "<img src='bleh.jpg'/>");
        assert(Html.start('div','james',{class: "ok", dataTest: "ok2" }) === "<div class='ok' data-test='ok2'>james");
        assert(Html.end('div') === '</div>');
        assert(Html.end('input') === '');
        assert(Html.value(2) === '2');
        assert(Html.attr({src: "james.jpg"}) === "src='james.jpg'");
        assert(Html.attr({src: "james.jpg"},'input','what') === "src='james.jpg' value='what'");
        assert(Html.tag('span','ok',{id: "test"}) === "<span id='test'>ok</span>");
        assert(Html.tag('input','ok',{value: "test", name: "NOé"}) === "<input value='ok' name='NOé'/>");
        assert(Html.tagCond('ul',false,'ok') === '');
        assert(Html.tagCond('ul','','ok') == '');
        assert(Html.tagCond('ul',null,'ok') == '');
        assert(Html.tagCond('ul',0,'ok') === "<ul class='ok'>0</ul>");
        assert(Html.tagCond('ul','0','ok') === "<ul class='ok'>0</ul>");
        assert(Html.tagCond('ul',true,'ok') === "<ul class='ok'>&nbsp;</ul>");
        assert(Html.div('well',{myattr: "L'article", myattr2: 'L"article'}) === "<div myattr='L&#39;article' myattr2='L&quot;article'>well</div>");
        assert(Html.span({tag: "2", well: "OK"}) === '<span>2, OK</span>');
        assert(Html.ul('meh') === '<ul>meh</ul>');
        assert(Html.li(null,{class: ['test','test2']}) === "<li class='test test2'></li>");
        assert(Html.span(null,{a: '', b: true, c: false, d: null, e: ['1','2']}) === "<span a='' b='1' c='0' e='[&quot;1&quot;,&quot;2&quot;]'></span>");
        assert(Html.span(false,{ test: 3, data: { test: 2, ok: 'WHAT', james: [1,2], james2: {ok: 'Mé'}}}) === "<span test='3' data-test='2' data-ok='WHAT' data-james='[1,2]' data-james2='{&quot;ok&quot;:&quot;Mé&quot;}'></span>");
        assert(Html.button(true) === "<button type='button'>&nbsp;</button>");
        assert(Html.button({test: "OKÉÉÉ", ble: 'MEH'}) === "<button type='button'>OKÉÉÉ, MEH</button>");
        assert(Html.button([1,2,3]) === "<button type='button'>1, 2, 3</button>");
        assert(Html.input(true,{type: 'email'}) === "<input type='email' value='1'/>");
        assert(Html.input(false,{type: 'text'}) === "<input type='text' value='0'/>");
        assert(Html.input(null,{type: 'text'}) === "<input type='text' value=''/>");
        assert(Html.div('ok','whatEscape') === "<div class='whatEscape'>ok</div>");
        assert(Html.button("ok","james") === "<button type='button' class='james'>ok</button>");
        
        // integer
        assert(!Integer.is('2'));
        assert(Integer.is(2));
        assert(!Integer.is(2.2));
        assert(Integer.cast(true) === null);
        assert(Integer.cast('2.3') === 2);
        assert(Integer.cast('2.6') === 2);
        assert(Integer.cast('25px') === 25);
        assert(Integer.cast(4) === 4);
        assert(Integer.cast(2.3) === 2);
        assert(Integer.cast('') === null);
        assert(Integer.toBool(1) === true);
        assert(Integer.toBool(0) === false);
        assert(Integer.toggle(1) === 0);
        assert(Integer.toggle(2) === null);
        assert(Integer.is(Integer.unique()));
        assert(Integer.unique() !== Integer.unique());
        assert(Integer.str(40) === '40');
        assert(Integer.isEmpty(0));
        assert(!Integer.isEmpty('0'));
        assert(!Integer.isNotEmpty('1'));
        assert(Integer.isNotEmpty(1));
        assert(Integer.isNotEmpty(-1));
        assert(Integer.isPositive(2));
        assert(!Integer.isPositive(0));
        assert(Integer.isPositive(0,true));
        assert(!Integer.isPositive('2'));
        assert(!Integer.isPositive(-1));
        assert(Integer.isNegative(-1));
        assert(!Integer.isNegative(0));
        assert(Integer.isNegative(0,true));
        assert(Integer.typecheck(1) === 1);
        assert(Integer.typecheck(0) === 0);
        assert(Integer.typecheck(null,false) === null);
        assert(Arr.length(Integer.range(0,100,1)) === 101);
        assert(Arr.length(Integer.range(1,100,1)) === 100);
        assert(Arr.length(Integer.range(2,18,3)) === 6);
        
        // json
        assert(Json.encode({ok: 2}) === '{"ok":2}');
        assert(Pojo.isEqual(Json.decode('{"ok":2}'),{ok: 2}));
        const jObj = {ok: 2};
        assert(Json.recode(jObj) !== jObj);
        assert(Pojo.isEqual(Json.recode(jObj),jObj));
        
        // nav
        assert(Nav.isFirst(0,10));
        assert(!Nav.isFirst(2,10));
        assert(Nav.hasPrev(0,10,true));
        assert(!Nav.hasPrev(0,10));
        assert(Nav.hasPrev(2,10));
        assert(Nav.hasNext(2,10));
        assert(Nav.hasNext(8,10));
        assert(!Nav.hasNext(9,10));
        assert(Nav.hasNext(9,10,true));
        assert(Nav.isLast(9,10));
        assert(!Nav.isLast(10,10));
        assert(Nav.isIndex(2,10));
        assert(!Nav.isIndex(-2,10));
        assert(Nav.getFirst(10) === 0);
        assert(Nav.getPrev(1,10) === 0);
        assert(Nav.getNext(9,10,true) === 0);
        assert(Nav.getLast(10) === 9);
        assert(Nav.getIndex(0,10) === 0);
        assert(Nav.getIndex(20,10) === null);
        assert(Nav.index('first',2,10) === 0);
        assert(Nav.index('last',2,10) === 9);
        assert(Nav.index('prev',2,10) === 1);
        assert(Nav.index('next',2,10) === 3);
        assert(Nav.index('next',9,10) === null);
        assert(Nav.index('next',9,10,true) === 0);
        assert(Nav.index('prev',0,10) === null);
        assert(Nav.index('prev',0,10,true) === 9);
        assert(Nav.index(2,0,10,true) === 2);
        assert(Nav.index(0,0,10,true) === 0);
        assert(Nav.index(11,0,10,true) === null);
        
        // num
        assert(!Num.is('what'));
        assert(!Num.is('2 px'));
        assert(Num.is('2'));
        assert(Num.is('2.3'));
        assert(Num.is(2));
        assert(Num.is(2.2));
        assert(!Num.isNan(2));
        assert(Num.cast('1.2') === 1.2);
        assert(Num.cast('1,2') === 1);
        assert(Num.cast(1) === 1);
        assert(Num.cast(1.2) === 1.2);
        assert(Num.cast(null) === null);
        assert(Num.cast([]) === null);
        assert(Num.str('2.3') === '2.3');
        assert(Num.cast("4.3px") === 4.3);
        assert(Num.str(4) === '4');
        assert(Num.str(2.3) === '2.3');
        assert(Num.isEmpty('0'));
        assert(Num.isEmpty(0));
        assert(!Num.isEmpty(true));
        assert(Num.isNotEmpty('1.1'));
        assert(Num.isNotEmpty(1.1));
        assert(Num.isPositive('2.2'));
        assert(!Num.isPositive('0'));
        assert(Num.isPositive('0',true));
        assert(Num.isNegative('-2.2'));
        assert(Num.typecheck('0') === '0');
        assert(Num.typecheck(2.1,true) === 2.1);
        assert(Num.isOdd(1));
        assert(!Num.isEven(1));
        assert(Num.isEven(2));
        assert(Num.isOdd(11));
        assert(!Num.isOdd(0));
        assert(Num.isEven(0));
        assert(Num.decimal(2) === '2.00');
        assert(Num.decimal(2.034) === '2.03');
        assert(Num.decimal(2.034,3) === '2.034');
        assert(Num.decimal(2.034,0) === '2');
        assert(Num.round("4.2") === 4);
        assert(Num.round(4.2) === 4);
        assert(Num.round(4) === 4);
        assert(Num.ceil("4.2") === 5);
        assert(Num.ceil(4.2) === 5);
        assert(Num.ceil(4) === 4);
        assert(Num.floor("4.2") === 4);
        assert(Num.floor(4.2) === 4);
        assert(Num.floor(4) === 4);
        
        // obj
        assert(Obj.is({}));
        assert(Obj.is([]));
        assert(Obj.is(arguments));
        assert(Obj.is(function() { }));
        assert(!Obj.is('test'));
        assert(!Obj.is(null));
        assert(!Obj.is(undefined));
        assert(!Obj.is(true));
        assert(Obj.length({ test: 2, ok: 3}) === 2);
        assert(Obj.length({}) === 0);
        assert(Obj.length([1,2,3]) === 3);
        assert(Obj.length({test: 2}) === 1);
        assert(Obj.isEqual([],[]))
        assert(!Obj.isEqual({},[]));
        assert(!Obj.isEqual({},{},[]));
        assert(Obj.isEqual({},{},{}));
        assert(Obj.isEqual([2],[2],[2]));
        assert(!Obj.isEqual([2],[2],[1]));
        assert(Obj.isEqual({test: 2},{test: 2}));
        assert(!Obj.isEqual({test: 2},{test: 3}));
        assert(!Obj.isEqual('test','test'));
        assert(!Obj.isEqual('test','testz'));
        assert(!Obj.isEqual(3,3));
        assert(!Obj.isEqual(3,4));
        assert(!Obj.isEqual(null,null));
        assert(!Obj.isEqual(null,undefined));
        let objGetSet = { test: 3};
        assert(Obj.get('test',objGetSet) === 3);
        assert(Obj.set('test',4,objGetSet) !== objGetSet);
        assert(Obj.get('test',objGetSet) === 3);
        assert(Obj.unset('test',objGetSet) !== objGetSet);
        assert(Obj.str({str: 2, what: 'ok', loop: [1,2], meh: { what: 2 }}) === 'str=2 what=ok loop=[1,2] meh={"what":2}');
        assert(Obj.str({str: 2, what: 'ok', loop: [1,2], meh: { what: 2 }},'!') === 'str!2 what!ok loop![1,2] meh!{"what":2}');
        assert(Obj.str({str: 2, what: 'ok', loop: [1,2], meh: { what: 2 }},'=',' ',true) === "str='2' what='ok' loop='[1,2]' meh='{&quot;what&quot;:2}'");
        assert(Obj.str({str: 2, what: 'ok', loop: [1,2], meh: { what: 2 }},'=',true,true) === "str='2' what='ok' loop='[1,2]' meh='{&quot;what&quot;:2}'");
        let objCopy = { test: 3};
        assert(Obj.copy(objCopy) !== objCopy);
        assert(Obj.isEqual(Obj.new(),{}));
        assert(Obj.length(Obj.replace(objCopy,{test2: 4})) === 2);
        assert(Obj.isEmpty({}));
        assert(Obj.isEmpty([]));
        assert(Obj.isEmpty(function() { }));
        assert(!Obj.isEmpty({ok: 2}));
        assert(!Obj.isEmpty([2]));
        assert(!Obj.isEmpty(null));
        assert(!Obj.isEmpty(false));
        assert(!Obj.isEmpty(undefined));
        assert(Obj.isEmpty(function() { return 2; }));
        assert(Obj.isNotEmpty({ok: 2}));
        assert(Obj.isNotEmpty([2]));
        assert(!Obj.isNotEmpty(2));
        assert(!Obj.isNotEmpty(null));
        assert(Obj.length({ test: 2, ok: 3}) === 2);
        let objKey;
        let objVal;
        assert(Obj.each({test: 'ok', what: 3},function(value,key) {
            assert(value !== this);
            objKey = key;
            objVal = value;
        }));
        assert(objKey === 'what');
        assert(objVal === 3);
        assert(Obj.each({test: 'ok', what: 3},function(value,key) {
            objKey = key;
            objVal = value;
            return false;
        }) === false);
        assert(objKey === 'test');
        assert(objVal === 'ok');
        let variVal;
        assert(Obj.each({ok: 2},function(value) {
            variVal = value;
        }));
        assert(variVal === 2);
        let length = 0;
        
        // pojo
        assert(Pojo.is({}));
        assert(!Pojo.is([]));
        assert(!Pojo.is(arguments));
        assert(!Pojo.is(function() { }));
        assert(!Pojo.is('test'));
        assert(!Pojo.is(null));
        assert(!Pojo.is(undefined));
        let replace = {test:2, ok: {what: true}};
        let pojoGetSet = {};
        assert(Pojo.isEqual(Pojo.replaceRecursive({test:2, ok: {what: true}},null,{ok: {james: false}}),{test: 2, ok: {what: true, james: false}}));
        assert(Pojo.isEqual(Pojo.replaceRecursive({test: 2},{test: { ok: 3}},{test: { ok: {ok: 1}, ok2: [1,2,3]}}),{test: {ok: {ok: 1}, ok2: [1, 2, 3]}}));
        assert(Pojo.climb(['test','what'],{test: {what: 'LOL'}}) === 'LOL');
        assert(Pojo.climb(['test','whatz'],{test: {what: 'LOL'}}) === undefined);
        assert(Pojo.climb('test/what',{test: {what: 'LOL'}}) === 'LOL');
        assert(Pojo.isEqual(Pojo.replace(replace,{ok: {james: false}}),{test: 2, ok: {james: false}}));
        assert(Pojo.isEqual(replace,{test:2, ok: {what: true}}));
        assert(Pojo.set('meh',2,pojoGetSet) !== pojoGetSet);
        assert(Pojo.isEqual(Pojo.set('meh',2,pojoGetSet),{meh: 2}));
        assert(Pojo.setRef('meh',2,pojoGetSet) === pojoGetSet);
        assert(Pojo.get('meh',pojoGetSet) === 2);
        assert(Pojo.isEqual(Pojo.gets(['meh','ok','what'],{ok: 3, meh: 4, whatz: 'LOL'}),{meh:4, ok:3, what: undefined}));
        assert(Pojo.isEmpty(Pojo.unsets(['meh'],pojoGetSet)));
        assert(Pojo.unset('meh',pojoGetSet) !== pojoGetSet);
        assert(Pojo.isEqual(Pojo.unset('meh',pojoGetSet),{}));
        assert(Pojo.unsetRef('meh',pojoGetSet) === pojoGetSet);
        pojoGetSet.meh = 2;
        assert(Pojo.unsetsRef(['meh','test'],pojoGetSet) === pojoGetSet);
        assert(Pojo.isEmpty(pojoGetSet));
        assert(Pojo.get('meh',pojoGetSet) === undefined);
        assert(Pojo.isEqual(Pojo.copy(replace),replace));
        assert(Pojo.copy(replace) !== replace);
        assert(Pojo.isEmpty({}));
        assert(!Pojo.isEmpty([]));
        assert(!Pojo.isNotEmpty({}));
        assert(Pojo.isNotEmpty({test: 2}));
        assert(!Pojo.isEqual([],[]));
        assert(Pojo.isEqual({ok: 2},{ok: 2}));
        assert(!Pojo.isEqual({ok: 2},{ok: 3}));
        assert(Pojo.isKey(2));
        assert(Pojo.keyExists('test',{test: 2}));
        assert(!Pojo.keyExists('test',{testz: 2}));
        assert(Pojo.valueFirst(replace) === 2);
        assert(Pojo.valueLast(replace) === replace.ok);
        assert(Pojo.get('what',pojoGetSet) === undefined);
        let pojoMapFilter = { test: 3, ok: 'what', james: { lol: true}, final: null, undef: undefined};
        assert(Pojo.length(Pojo.filter(pojoMapFilter,function(value) {
            return (Pojo.is(value))? false:true;
        })) === 4);
        assert(Pojo.length(pojoMapFilter) === 5);
        assert(Pojo.map(pojoMapFilter,function(value) {
            return (Pojo.is(value))? false:true;
        })['final'] === true);
        assert(Pojo.isEqual(Pojo.find(pojoMapFilter,function(value,key) {
            return Pojo.is(value);
        }),{lol: true}));
        assert(Arr.length(Pojo.toArray(pojoMapFilter)) === 5);
        assert(Pojo.findKey({james: 3, test: '4'},function(value,index) {
            return Str.is(value);
        }) === 'test');
        assert(Pojo.isEqual(Pojo.accumulate({},{james: 3, test: '4'},function(value,index) {
            return index;
        }),{james: 'james', test: 'test'}));
        assert(!Pojo.some({james: 3, james2: 'ok'},function(value) {
            return Arr.is(value);
        }));
        assert(Pojo.some({james: 3, james2: 'ok'},function(value) {
            return Str.is(value);
        }));
        assert(!Pojo.every({james: 3, james2: 'ok'},function(value) {
            return Str.is(value);
        }));
        assert(Pojo.every({james: 3, james2: 4},function(value,key) {
            return Integer.is(value) && Str.is(key);
        }));
        assert(Pojo.reduce("",{james: 'test', ok: 'OK'},function(r,value,key) {
            return r += value+key;
        }) === 'testjamesOKok');
        
        // scalar
        assert(Scalar.is('test'));
        assert(Scalar.is(2));
        assert(Scalar.is(true));
        assert(Scalar.is(false));
        assert(!Scalar.is(null));
        assert(Scalar.isNotBool(1));
        assert(!Scalar.isNotBool(false));
        assert(!Scalar.isEmpty(1));
        assert(Scalar.isEmpty(false));
        assert(Scalar.isNotEmpty(1));
        assert(!Scalar.isNotEmpty(false));
        assert(Scalar.typecheck('') === '');
        assert(Scalar.typecheck(true,true) === true);
        assert(Scalar.typecheck(false) === false);
        assert(Scalar.typecheck(null,false) === null);
        assert(Scalar.cast('2.4','int') === 2);
        assert(Scalar.cast('1','bool') === true);
        assert(Scalar.cast('2.4','num') === 2.4);
        assert(Scalar.cast('5d','int') === 5);
        assert(Scalar.cast('5d','bool') === null);
        assert(Scalar.toBool(1) === true);
        assert(Scalar.toBool('true') === true);
        assert(Scalar.toBool(0) === false);
        assert(Scalar.toBool(false) === false);
        
        // str
        assert(Str.is('WHAT'));
        assert(Str.is(''));
        assert(!Str.is([]));
        assert(!Str.is(null));
        assert(Str.are(['test','ok']));
        assert(Arr.length(Str.typechecks(['test','ok',null],false)) === 3);
        assert(Str.isStart('a','as'));
        assert(!Str.isStart(3,'3s'));
        assert(Str.isEnd('s','as'));
        assert(!Str.isEnd('a','as'));
        assert(Str.isEqual('test','test'));
        assert(Str.isEqual('2',2));
        assert(Str.isEqual(true,'true'));
        assert(Str.isEqual(undefined,''));
        assert(Str.isEqual(undefined,null));
        assert(Str.in('a','as') === true);
        assert(Str.in('é','aÉè') === false);
        assert(Str.icompare('E','e'));
        assert(Str.icompare('e','e'));
        assert(Str.icompare('éÈ','Éè'));
        assert(!Str.icompare('2',2));
        assert(Str.cast(2) === '2');
        assert(Str.cast(false) === 'false');
        assert(Str.cast(true) === 'true');
        assert(Str.cast(null) === '');
        assert(Str.cast(undefined) === '');
        assert(Str.pos('a','as') === 0);
        assert(Str.pos('é','aéè') === 1);
        assert(Str.pos('é','aÉè') === null);
        assert(Str.lower('AE') === 'ae');
        assert(Str.lowerFirst('as') === 'as');
        assert(Str.lowerFirst('As') === 'as');
        assert(Str.lowerFirst('És') === 'és');
        assert(Str.upper('ae') === 'AE');
        assert(Str.upperFirst('as') === 'As');
        assert(Str.upperFirst('As') === 'As');
        assert(Str.trim(' As ') === 'As');
        assert(Str.quote('what',true) === '"what"');
        assert(Str.quote('what') === "'what'");
        assert(Str.quote("L'article\"de",false,true) === "'L&#39;article&quot;de'");
        assert(Str.sub(2,true,'what') === 'at');
        assert(Str.sub(2,true,'éèà') === 'à');
        assert(Str.excerpt(3,'okkkkk','...') === 'okk...');
        assert(Str.excerpt(12,'okkkkk','...') === 'okkkkk');
        assert(Obj.isEqual(Str.explode('-','la-vie-ok'),['la','vie','ok']));
        assert(Str.explodeIndex(2,'-','la-vie-ok') === 'ok');
        assert(Str.explodeIndex('2','-','la-vie-ok') === undefined);
        assert(Str.explodeIndex(3,'-','la-vie-ok') === undefined);
        assert(!Str.isEmpty('WHAT'));
        assert(Str.isEmpty(''));
        assert(!Str.isEmpty('as'));
        assert(isEmpty(''));
        assert(!Str.isNotEmpty(''));
        assert(Str.isNotEmpty('as'));
        assert(Str.typecheck('ok') === 'ok');
        assert(Str.typecheck('') === '');
        assert(Str.typecheck(null,false) === null);
        assert(Str.typecheck(undefined,false) === undefined);
        assert(Str.typecheck('',false) === '');
        let val = null;
        assert(Str.each('abcde',function(value) {
            assert(value !== this);
            val = value;
        }));
        assert(Arr.isEqual(Str.keys('whaé'),['0','1','2','3']));
        assert(Arr.isEqual(Str.values('whaé'),['w','h','a','é']));
        assert(Str.length('whaé') === 4);
        assert(val === 'e');
        assert(Str.each('abcde',function(value) {
            val = value;
            return (value === 'c')? false:true;
        }) === false)
        assert(val === 'c');
        let strVal = 'wéè';
        assert(Str.get(1,strVal) === 'é');
        assert(Str.valueFirst('éèè') === 'é');
        assert(Str.find('john',function(ele) {
            return ele != 'j';
        }) === 'o');
        assert(Arr.length(Str.toArray('what')) === 4);
        assert(Str.removeAllWhitespace(' ads das sda ') === 'adsdassda');
        assert(Str.fromCamelCase('-','data') === 'data')
        assert(Str.fromCamelCase('-','marginTopRight') === 'margin-top-right');
        assert(Str.fromCamelCase('|','marginTopRight') === 'margin|top|right');
        assert(Str.toCamelCase('-','margin-top-right') === 'marginTopRight');
        assert(Str.toCamelCase(' ',' margin top right ') === 'marginTopRight');
        assert(Str.toCamelCase('_',' margin top right ') === 'margintopright');
        assert(Str.toCamelCase('-','-margin--top--right-') === 'marginTopRight');
        assert(Str.every("aaaa",function(value,key) {
            return (value === 'a' && Num.is(key))
        }));
        assert(Str.reduce("","aaaa",function(r,value,key) {
            return r += value+key;
        }) === 'a0a1a2a3');
        assert(Str.toNum("30MB") === 30);
        assert(Str.toNum("1,4") === 1);
        assert(Str.toNum("1.4") === 1.4);
        assert(Str.toInt("1,4") === 1);
        assert(Str.slug("OK LA VIE EST BONNE") === 'ok-la-vie-est-bonne');
        assert(Str.slug("OK-LAé À@#?& VIE EST BONNE") === 'ok-la-vie-est-bonne');
        assert(Str.keepNumber("(515) 509-1502 #poste 12345") === '515509150212345');
        assert(Str.replace({ '[test]': 'OK', what: 'well'},"tout va [test] what WHAT!") === "tout va OK well WHAT!");
        
        // validate
        assert(Validate.isNumericDash("213-123"));
        assert(Validate.isNumericDash("213123"));
        assert(!Validate.isNumericDash("213_123"));
        assert(Validate.isEmail("test@test.com"));
        assert(!Validate.isEmail("testtest.com"));
        assert(Validate.isEmail('bla@bla.zzzzzzz'));
        assert(Validate.isRegexStr("bla"));
        assert(Validate.isRegexStr(new RegExp("/asd/")));
        assert(Validate.regex("212","^[0-9\-]+$"))
        assert(!Validate.trigger('test',true,"^[0-9\-]+$"));
        assert(!Validate.trigger('abc-de',true,"^[0-9\-]+$"));
        assert(!Validate.trigger('',1,"^[0-9\-]+$"));
        assert(Validate.trigger('',false,"^[0-9\-]+$"));
        assert(Validate.required('test',true));
        assert(!Validate.required('',true));
        assert(Validate.required('test',1));
        assert(Validate.required('test',0));
        assert(!Validate.required('',1));
        assert(Validate.required('',0));
        assert(Validate.pattern('',"^[0-9\-]+$"));
        assert(Validate.pattern('01-2',"^[0-9\-]+$"));
        assert(!Validate.pattern('abc',"^[0-9\-]+$"));
        
        // vari
        assert(Vari.is(null));
        assert(!Vari.is(undefined));
        assert(Vari.isEmpty(null));
        assert(Vari.isEmpty({}));
        assert(Vari.isEmpty(false));
        assert(!Vari.isEmpty(true));
        assert(Vari.isEmpty(''));
        assert(Vari.isEmpty([]));
        assert(!Vari.isEmpty('0'));
        assert(Vari.isEmpty(0));
        assert(!Vari.isEmpty(1));
        assert(Vari.isEmpty(undefined));
        assert(Vari.isNotEmpty(2));
        assert(!Vari.isNotEmpty(null));
        assert(!Vari.isReallyEmpty(0));
        assert(Vari.isNotReallyEmpty(0));
        assert(Vari.isNull(null));
        assert(!Vari.isNull(undefined));
        assert(!Vari.isUndefined(null));
        assert(Vari.isUndefined(undefined));
        assert(Vari.isEqual('test','test'));
        assert(!Vari.isEqual('test','testz'));
        assert(Vari.isEqual(3,3));
        assert(!Vari.isEqual(3,4));
        assert(Vari.isEqual(null,null));
        assert(!Vari.isEqual(null,undefined));
        assert(Vari.isEqualStrict(null,null));
        assert(Vari.isEqualStrict('test','test'));
        assert(!Vari.isEqualStrict([],[]));
        assert(Vari.type('test') === 'string');
        assert(Vari.type({}) === 'object');
        assert(Vari.type([]) === 'object');
        assert(Vari.type(function() { }) === 'object');
        assert(Vari.type(2) === 'number');
        assert(Vari.type(2.3) === 'number');
        assert(Vari.type(null) === 'null');
        assert(Vari.type(true) === 'boolean');
        assert(Vari.type(undefined) === 'undefined');
    } 
    
    catch (e) 
    {
        r = false;
        logError(e);
    }
    
    return r;
}

// export
export * from '../index.js';