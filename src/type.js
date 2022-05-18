/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */

// type
// script with common methods for all variable types

// import
import { Arr, Vari } from '../index.js';

// export
export default {  
    
    // is
    // retourne vrai si c'est une variable du type
    is: function(value)
    {
        return Vari.type(value) !== 'object';
    },

    
    // are
    // retourne vrai si la valeur est un tableau contenant des variables du type
    are: function(value)
    {
        const $inst = this;
        
        return (Arr.is(value))? Arr.each(value,function(v) {
            return $inst.is(v);
        }):false;
    },
    
    
    // isEmpty
    // retourne vrai si c'est une variable du type vide
    isEmpty: function(value)
    {
        return (this.is(value))? Vari.isEmpty(value):false;
    },
    
    
    // isNotEmpty
    // retourne vrai si c'est une variable du type non-vide
    isNotEmpty: function(value)
    {
        return (this.is(value))? Vari.isNotEmpty(value):false;
    },
    
    
    // typecheck
    // envoie une erreur si la valeur n'est pas du type
    // si type est true, doit être du type et non vide
    // si type est false, accepte null + undefined
    typecheck: function(value,type)
    {
        if(((type === true && !this.isNotEmpty(value)) || (type !== true && !this.is(value))) && !(type === false && value == null))
        throw new Error(value);
        
        return value;
    },
    
    
    // typechecks
    // envoie une exception si la valeur n'est pas un tableau contenant des valeurs du type
    typechecks: function(value,type)
    {
        if(Arr.is(value))
        {
            const $inst = this;
            
            Arr.each(value,function(ele) {
                $inst.typecheck(ele,type);
            });
        }
        
        else
        throw new Error(value);
        
        return value;
    }
}