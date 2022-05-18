/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// arr
// script with some objects related to array manipulation

// import
import { Arr, ArrLike, Func, Integer, Num, Pojo, Str, Vari } from '../index.js';

// arrBase
// fonctions relatives à la lecture de tableau
const ArrBase = {
    
    // is
    // retourne vrai si la valeur est un tableau
    is: function(value) 
    {
        return Array.isArray(value);
    },
    
    
    // in
    // retourne vrai si la valeur est dans le tableau
    // retourne un boolean
    in: function(value,array) 
    {
        return (this.is(array))? Array.prototype.includes.call(array,value):null;
    },
    
    
    // keys
    // retourne un tableau avec clés du présent tableau
    keys: function(array)
    {
        this.typecheck(array);
        
        return Array.from(Array.prototype.keys.call(array));
    },
    
    
    // valueFirst
    // retourne le première valeur dans le tableau
    valueFirst: function(array)
    {
        this.typecheck(array);
        return (array.length)? array[0]:undefined;
    },
    
    
    // valueLast 
    // retourne la dernière valeur dans le tableau
    valueLast: function(array)
    {
        this.typecheck(array);
        return (array.length)? array[array.length-1]:undefined;
    },
    
    
    // keyFirst
    // retourne la première clé d'un tableau
    keyFirst: function(array)
    {
        this.typecheck(array);
        return (array.length)? 0:undefined;
    },
    
    
    // keyLast
    // retourne la dernière clé d'un tableau
    keyLast: function(array)
    {
        this.typecheck(array);
        return (array.length)? array.length-1:undefined;
    },
    
    
    // search
    // retourne l'index de la valeur dans le tableau
    search: function(value,array) 
    {
        let r = null;
        this.typecheck(array);
        
        r = Array.prototype.indexOf.call(array,value);
        r = (r === -1)? null:r;
        
        return r;
    },
    
    
    // slice
    // fait un slice sur un tableau avec un start et un end
    slice: function(start,end,array)
    {
        let r = null;
        this.typecheck(array);
        
        start = Integer.is(start)? start:0;
        end = Integer.is(end)? end:undefined;
        r = Array.prototype.slice.call(array,start,end);
        
        return r;
    },
    
    
    // sliceStart
    // fait un slice à partir du début d'un tableau
    sliceStart: function(start,array)
    {
        return this.slice(start,true,array);
    },
    
    
    // merge
    // retourne un nouveau tableau avec le contenu de tous les tableaux merged (concat)
    merge: function(array)
    {
        let r = null;
        this.typecheck(array);
        
        const args = ArrLike.sliceStart(1,arguments);
        r = Array.prototype.concat.apply(array,args);
        
        return r;
    },
    
    
    // clean
    // retourne un nouveau tableau avec les valeurs vides retirés
    clean: function(array)
    {
        return this.filter(array,function(ele) {
            return Vari.isNotReallyEmpty(ele);
        });
    },
    
    
    // valueStrip
    // permet de retourner un nouveau tableau sans la valeur donné en argument
    valueStrip: function(value,array) 
    {
        return this.filter(array,function(v) {
            return (v === value)? false:true;
        });
    },
    

    // find
    // retourne la première valeur de l'objet dont le callback retourne true, utilise la méthode du prototype
    find: function(array,callback) {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.find.call(array,callback);
    },
    
    
    // some
    // vérifie qu'au moins une entrée du tableau passe le test de la fonction anonyme
    some: function(array,callback)
    {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.some.call(array,callback);
    },
    
    
    // every
    // vérifie que toutes les entrée du tableau passe le test de la fonction anonyme
    every: function(array,callback)
    {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.every.call(array,callback);
    },
    
    
    // map
    // permet de créer un nouvel objet avec les valeurs changés selon la fonction de rappel, utilise la méthode du prototype
    map: function(array,callback)
    {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.map.call(array,callback);
    },
    
    
    // filter
    // permet de créer un nouvel objet avec seulement les entrées qui retournent true, utilise la méthode du prototype
    filter: function(array,callback)
    {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.filter.call(array,callback);
    },
    
    
    // reduce
    // retourne une valeur simple à partir d'un tableau
    // changement de l'ordre des arguments, de même la clé est envoyé au callback en troisième argument
    reduce: function(r,array,callback)
    {
        this.typecheck(array);
        Func.typecheck(callback);
        
        return Array.prototype.reduce.call(array,callback,r);
    },
    
    
    // column
    // retourne un tableau avec une seule propriété de chaque pojo dans le tableau
    column: function(prop,array)
    {
        const r = [];
        Str.typecheck(prop,true);
        
        this.each(array,function(value) {
            if(Pojo.is(value) && Pojo.keyExists(prop,value))
            r.push(value[prop]);
        });
        
        return r;
    },
    
    
    // new
    // retourne la cible pour la copie
    new: function()
    {
        return [];
    }
}


// arrWriteSelf
// fonctions relatives à l'écriture sur des tableaux (en référence)
const ArrWriteSelf = {
    
    // mergeRef
    // permet de fusionner plusieurs tableaux dans le premier tableau
    // le premier tableau est modifié
    mergeRef: function(array)
    {
        this.typecheck(array);
        let r = array;
        const inst = this;
        const args = ArrLike.sliceStart(1,arguments);
        
        this.each(args,function(value) {
            if(!Arr.is(value))
            value = [value];
            
            Array.prototype.push.apply(r,value);
        });
        
        return r;
    },
    
    
    // reverseRef
    // permet de renverser le tableau courant
    reverseRef: function(array)
    {
        this.typecheck(array);
        return array.reverse();
    },
    
    
    // spliceValue
    // permet de retourner le même tableau sans la valeur donné en argument
    // retourne la valeur splice
    spliceValue: function(value,array,replace)
    {
        let r = null;
        let index = this.search(value,array);
        this.typecheck(array);
        
        let args = [index,1];
        if(typeof(replace) !== 'undefined')
        args.push(replace);
        
        r = Array.prototype.splice.apply(array,args);
        
        return r;
    }
}

// arrLoop
// fonctions relatives à certains loops spéciaux
const ArrLoop = {
    
    // timeouts
    // permet de lancer un callback sur chaque element du tableau avec timeout différent (selon index)
    timeouts: function(array,timeout,indexTimeout,callback) 
    {
        Integer.typecheck(timeout);
        Integer.typecheck(indexTimeout);
        Func.typecheck(callback);
        
        return Arr.each(array,function(value, index) {
            const funcTimeout = timeout + (index * indexTimeout);
            
            const funcWrap = function() {
                callback(value,index,funcTimeout);
            }
            Func.timeout(funcTimeout,funcWrap);
        });
    },
    
    
    // oddEven
    // permet d'appeler une méthode de callback différents selon si l'élément est odd ou even
    oddEven: function(array,funcOdd,funcEven) 
    {
        Func.typechecks([funcOdd,funcEven],false);
        
        return Arr.each(array,function(value,index) {
            const key = index + 1;
            
            if(Num.isOdd(key))
            {
                if(funcOdd != null)
                funcOdd(value,index)
            }
            
            else if(funcEven != null)
            funcEven(value,index);
        });
    }
}

// export
export { ArrBase, ArrWriteSelf, ArrLoop };