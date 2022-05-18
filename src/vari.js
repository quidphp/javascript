/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */
 
// vari
// script with a set of general functions related to variables

// import
import { Arr, ArrLike, Bool, Env, Func, Json, Num, Scalar, Str } from '../index.js';

// export
export default {    
    
    // is
    // vrai si pas non défini
    is: function(value)
    {
        return typeof(value) !== 'undefined';
    },

    
    // isEmpty
    // retourne vrai si la variable est vide
    isEmpty: function(value)
    {
        let r = true;
        
        if(Arr.is(value) || Str.is(value))
        r = (value.length > 0)? false:true;
        
        else if(Scalar.is(value))
        r = !value;
        
        else if(Env.isTarget(value))
        r = false;
        
        else if(value != null)
        {
            this.eachProto(value,function() {
                r = false;
                return false;
            });
        }
        
        return r;
    },
    
    
    // isNotEmpty
    // retourne vrai si la variable est non vide
    isNotEmpty: function(value)
    {
        return !this.isEmpty(value);
    },
    
    
    // isReallyEmpty
    // retourne vrai si la variable est vraiment vide (conserve les numériques et bool)
    isReallyEmpty: function(value)
    {
        return (!Num.is(value) && !Bool.is(value) && this.isEmpty(value))
    },
    
    
    // isNotReallyEmpty
    // retourne vrai si la variable n'est pas vraiment vide
    isNotReallyEmpty: function(value)
    {
        return !this.isReallyEmpty(value);
    },
    
    
    // isNull
    // retourne vrai si la valeur est null
    isNull: function(value)
    {
        return value === null;
    },
    
    
    // isUndefined
    // retourne vrai si la valeur est undefined
    isUndefined: function(value)
    {
        return value === undefined;
    },
    
    
    // isEqual
    // compare plusieurs variables
    // retourne vrai si les valeurs contenus sont égales
    isEqual: function() 
    {
        let r = false;
        let json = null;
        let jsonOld = undefined;
        
        r = ArrLike.each(arguments,function(value) {
            json = Json.encode(value);
            
            if(typeof jsonOld === 'undefined')
            jsonOld = json;
            
            else
            return (json === jsonOld);
        });
        
        return r;
    },
    
    
    // isEqualStrict
    // comme isEqual, mais les objects et array doivent être les mêmes variables
    isEqualStrict: function()
    {
        let r = false;
        let first = undefined;
        
        r = ArrLike.each(arguments,function(value) {
            if(typeof first === 'undefined')
            first = value;
            
            else
            return Object.is(first,value);
        });
        
        return r;
    },
    
    
    // type
    // retourne le vrai type d'une variable
    type: function(value)
    {
        let r = typeof value;
        const obj = {};
        
        if(value == null)
        r = value + "";
        
        else if(r === 'function')
        {
            const str = obj.toString.call(value);
            r = obj[str] || "object";
        }
        
        return r;
    },
    
    
    // check
    // envoie une erreur si la valeur n'est pas égale à la deuxième
    check: function(value,type)
    {
        if(value !== type)
        throw new Error([value,type]);
        
        return value;
    },
    
    
    // eachProto
    // fait un each en incluant les propriétés du prototype
    // retourne true si le loop a complêté
    eachProto: function(loop,callback)
    {
        let r = null;
        
        if(Func.is(callback))
        {
            r = true;
            var key;
            var value;
            let result;

            for (key in loop) 
            {
                value = loop[key];
                result = callback.call(value,value,key,loop);
                
                if(result === false)
                {
                    r = false;
                    break;
                }
            }
        }
        
        return r;
    }
}