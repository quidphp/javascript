/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// obj
// script with a set of helper functions related to objects

// import
import { Arr, Func, Pojo, Scalar, Str, Vari } from '../index.js';

// objBase
// base methods for objects
const ObjBase = {
    
    // is
    // retourne vrai si c'est un objet
    is: function(value)
    {
        return Vari.type(value) === 'object';
    },

    
    // isEqual
    // compare plusieurs objets (ou array)
    // retourne vrai si les valeurs contenus sont égales
    isEqual: function() 
    {
        let r = false;
        const args = Array.from(arguments);
        
        if(args.length > 1 && this.is(args[0]))
        r = Vari.isEqual.apply(null,args);
        
        return r;
    },
    
    
    // length
    // retourne la longueur de l'objet
    length: function(value) 
    {
        this.typecheck(value);
        const keys = Object.keys(value);
        
        return keys.length;
    }
}


// objKeyValue
// method related to keys and values within an object
const ObjKeyValue = {
    
    // isKey
    // retourne vrai si la valeur est une clé de propriété valide
    isKey: function(prop)
    {
        return Scalar.isNotBool(prop);
    },
    
    
    // keyExists
    // retourne vrai si l'objet a la propriété, ne cherche pas dans le prototype
    keyExists: function(prop,obj)
    {
        return (this.isKey(prop) && this.is(obj))? obj.hasOwnProperty(prop):false
    },
    
    
    // keys
    // retourne les clés de l'objet
    keys: function(obj)
    {
        this.typecheck(obj);
        return Object.keys(obj);
    },
    
    
    // values
    // retourne les valeurs de l'objet
    values: function(obj)
    {
        this.typecheck(obj);
        return Object.values(obj);
    },
    
    
    // get
    // permet de retourner la valeur d'une propriété d'un objet
    get: function(prop,obj)
    {
        this.typecheck(obj);
        return (this.keyExists(prop,obj))? obj[prop]:undefined;
    },
    
    
    // toArray
    // retourne un array à partir de la valeur
    toArray: function(value)
    {
        this.typecheck(value);
        return Array.from(this.values(value));
    },
    
    
    // valueFirst
    // retourne le première valeur dans l'object
    valueFirst: function(obj)
    {
        let r = undefined;
        const keys = this.keys(obj);
        
        if(keys != null)
        {
            const key = keys[0];
            r = obj[key];
        }
        
        return r;
    },
    
    
    // valueLast 
    // retourne la dernière valeur dans l'objet
    valueLast: function(obj)
    {
        let r = undefined;
        const keys = this.keys(obj);
        
        if(keys != null)
        {
            const key = keys[keys.length-1];
            r = obj[key];
        }
        
        return r;
    },
    
    
    // find
    // retourne la première valeur de l'objet dont le callback retourne true
    find: function(loop,callback)
    {
        let r = undefined;
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            const result = callback(value,key);
            
            if(result)
            {
                r = value;
                return false;
            }
        });
        
        return r;
    },
    
    
    // findKey
    // retourne la première clé dont la valeur remplit la condition de la closure
    // la clé est envoyé en deuxième argument
    findKey: function(loop,callback) 
    {
        let r = null;
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            if(callback(value,key))
            {
                r = key;
                return false;
            }
        });

        return r;
    },
    
    
    // some
    // vérifie qu'au moins une entrée de l'objet passe le test de la fonction anonyme
    some: function(loop,callback)
    {
        let r = false;
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            if(callback(value,key))
            {
                r = true;
                return false;
            }
        });

        return r;
    },
    
    
    // every
    // vérifie que toutes les entrée de l'objet passe le test de la fonction anonyme
    every: function(loop,callback)
    {
        let r = true;
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            if(!callback(value,key))
            return r = false;
        });

        return r;
    },
    
    
    // reduce
    // retourne une valeur simple à partir d'un tableau
    reduce: function(r,loop,callback)
    {
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            r = callback(r,value,key);
        });
        
        return r;
    },
    
    
    // accumulate
    // comme reduce, mais le return est automatiquement append
    // si le callback retourne null, continue
    accumulate: function(r,loop,callback)
    {
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            const result = callback(value,key);

            if(result == null)
            return true;

            else if(Arr.is(r))
            r.push(result);
            
            else if(Pojo.is(r))
            r[key] = result;
            
            else
            r += result;
        });

        return r;
    },
    
    
    // str
    // permet de convertir un objet en string
    // possible de spécifier deux séparateurs
    // possible de quote les valeurs (à ce moment html escape est utilisé)
    str: function(obj,separator,separator2,quote) 
    {
        const $inst = this;
        separator = (Str.is(separator))? separator:'=';
        separator2 = (Str.is(separator2))? separator2:' ';
        
        return this.reduce('',obj,function(r,value,key) {
            if(Str.isNotEmpty(key))
            {
                value = Str.cast(value,true);
                
                if(quote === true)
                value = Str.quote(value,false,true);
                
                if(r.length)
                r += separator2;
                
                r += key;
                r += separator;
                r += value;
                
                return r;
            }
        });
    },
    
    
    // climb
    // permet de grimper dans un objet à partir d'un tableau
    // si on passe une string ou divise par /
    climb: function(array,r) 
    {
        if(Str.is(array))
        array = Str.explode("/",array);
        
        Arr.typecheck(array);
        this.typecheck(r);
        const $inst = this;
        
        Arr.each(array,function(value) {
            if($inst.keyExists(value,r))
            r = r[value];
            
            else
            {
                r = undefined;
                return false;
            }
        });
        
        return r;
    }
}


// objEach
// methods for looping over an object
const ObjEach = {
    
    // each
    // méthode utilisé pour faire un for each sur un array, array like, un objet ou une string
    // retourne true si le loop a complêté
    each: function(loop,callback) 
    {
        let r = true;
        Func.typecheck(callback);
        let keys = this.keys(loop);
        let key;
        let value;
        let result;
        
        for (var i = 0; i < keys.length; i++) 
        {
            key = keys[i];
            value = loop[key];
            result = callback(value,key);
            
            if(result === false)
            {
                r = false;
                break;
            }
        }
        
        return r;
    }
}


// objCopyFilterMap
// methods for copying, filtering and map an object
const ObjCopyFilterMap = {
    
    // copy
    // permet de copier un objet
    copy: function(value)
    {
        this.typecheck(value);
        return Object.assign(this.new(),value);
    },
    
    
    // new
    // retourne la cible pour créer un nouvel objet du même type
    new: function()
    {
        return {};
    },
    
    
    // filter
    // permet de créer un nouvel objet avec seulement les entrées qui retournent true
    filter: function(loop,callback)
    {
        let r = this.new();
        Func.typecheck(callback);
        const keepKey = (Array.isArray(r))? false:true;
        
        this.each(loop,function(value,key) {
            const result = callback(value,key);
            key = (keepKey === false)? r.length:key;
            
            if(result)
            r[key] = value;
        });
        
        return r;
    },
    
    
    // map
    // permet de créer un nouvel objet avec les valeurs changés selon la fonction de rappel
    map: function(loop,callback)
    {
        let r = this.new();
        Func.typecheck(callback);
        
        this.each(loop,function(value,key) {
            const result = callback(value,key);
            r[key] = result;
        });
        
        return r;
    }
}


// objWrite
// methods for written on a copy of the object
const ObjWrite = {
    
    // set
    // permet d'ajouter une nouvelle propriété à un objet
    // l'objet retourner est une copie
    set: function(prop,value,obj)
    {
        let r = this.copy(obj);
        r[prop] = value;
        
        return r;
    },
    
    
    // unset
    // permet de retirer une propriété d'un objet
    // l'objet retourner est une copie
    unset: function(prop,obj)
    {
        let r = this.copy(obj);
        delete r[prop];
        
        return r;
    },

    
    // unsets
    // permet de retirer plusieurs propriétés d'un objet
    // l'objet retourner est une copie
    unsets: function(props,obj)
    {
        let r = this.copy(obj);
        const $inst = this;
        
        Arr.each(props,function(prop) {
            if($inst.keyExists(prop,obj))
            delete r[prop];
        });
        
        return r;
    },
    
    
    // replace
    // retourne un nouvel objet contenant le résultat d'un merge unidimensionnel de tous les objets données en argument
    replace: function() 
    {
        let r = this.new();
        let args = Array.from(arguments);
        
        if(args.length > 0)
        {
            const $inst = this;
            
            Arr.each(args,function(value) {
                $inst.typecheck(value,false);
                
                if(value != null)
                r = Object.assign(r,value);
            });
        }
        
        return r;
    }
}


// objWriteSelf
// methods for writing within the object without copying it
const ObjWriteSelf = {
    
    // setRef
    // permet d'ajouter une nouvelle propriété à un objet
    // l'objet retourner est le même (pas une copie)
    setRef: function(prop,value,obj)
    {
        this.typecheck(obj);
        obj[prop] = value;
        
        return obj;
    },
    
    
    // unsetRef
    // permet de retirer une propriété d'un objet
    // l'objet retourner est le même (pas une copie)
    unsetRef: function(prop,obj)
    {
        this.typecheck(obj);
        
        if(this.keyExists(prop,obj))
        delete obj[prop];
        
        return obj;
    },
    
    
    // unsetsRef
    // permet de retirer plusieurs propriétés d'un objet
    // l'objet retourner est le même (pas une copie)
    unsetsRef: function(props,obj)
    {
        this.typecheck(obj);
        const $inst = this;
        
        Arr.each(props,function(prop) {
            if($inst.keyExists(prop,obj))
            delete obj[prop];
        });
        
        return obj;
    }
}


// objProto
// methods related to object prototype
const ObjProto = {
    
    // keyExists
    // retourne vrai si l'objet a la propriété, cherche dans le protype
    keyExists: function(prop,obj)
    {
        return (this.isKey(prop) && this.is(obj))? (prop in obj):false
    }
}

// objFactory
// méthode pour merger plusieurs objets, avec support pour prototype
const ObjFactory = function(prototype)
{
    const r = Object.create((prototype === true)? {}:(prototype || null));
    const args = Array.prototype.slice.call(arguments,1);
    Object.assign.apply(null,[r].concat(args));
    
    return r;
}

// export
export { ObjBase, ObjKeyValue, ObjEach, ObjCopyFilterMap, ObjWrite, ObjWriteSelf, ObjProto, ObjFactory };