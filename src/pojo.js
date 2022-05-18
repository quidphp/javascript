/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// pojo
// script with a set of helper functions related to plain objects

// import
import { Arr } from '../index.js';

// export
export default {
    
    // is
    // retourne vrai si c'est un objet plain
    is: function(value)
    {
        return (value != null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype && value.toString() === '[object Object]');
    },
    
    
    // gets
    // permet de retourner un nouveau pojo avec seulement les propriétés donnés en premier argumnet
    gets: function(props,obj)
    {
        let r = {};
        this.typecheck(obj);
        const $inst = this;
        
        Arr.each(props,function(prop) {
            r[prop] = ($inst.keyExists(prop,obj))? obj[prop]:undefined;
        });
        
        return r;
    },
    
    
    // replaceRecursive
    // retourne un nouvel objet contenant le résultat d'un merge multidimensionnel de tous les plain objets données en argument
    replaceRecursive: function() 
    {
        let r = null;
        let args = Array.from(arguments);
        
        if(args.length > 0)
        {
            r = this.copy(args[0]);
            const $inst = this;
            const loop = Arr.sliceStart(1,args);
            
            Arr.each(loop,function(value) {
                if(value != null)
                {
                    $inst.each(value,function(value2,key2) {
                        if($inst.is(r[key2]) && $inst.keyExists(key2,r))
                        r[key2] = $inst.replaceRecursive(r[key2],value2);
                        
                        else
                        r[key2] = value2;
                    });
                }
            });
        }

        return r;
    }
}