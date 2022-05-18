/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */

// num
// script with functions related to numbers

// import
import { Integer, Scalar, Vari } from '../index.js';

// numPrimitive
// méthodes pour des valeurs numériques
const NumPrimitive =  {
    
    // is
    // retourne vrai si la valeur est un nombre
    is: function(value)
    {
        let r = false;
        const type = Vari.type(value);
        
        if(type === "number" || type === "string")
        r = !isNaN(value - parseFloat(value));
        
        return r;
    },
    
    
    // isEmpty
    // retourne vrai si c'est une variable numérique vide
    isEmpty: function(value)
    {
        return (this.is(value))? Vari.isEmpty(this.cast(value)):false;
    },
    
    
    // isNotEmpty
    // retourne vrai si c'est une variable numérique non-vide
    isNotEmpty: function(value)
    {
        return (this.is(value))? Vari.isNotEmpty(this.cast(value)):false;
    },
    
    
    // isPositive
    // retourne vrai si c'est une variable numérique positive (> 0)
    // si allowZero est true, retourne true si zero
    isPositive: function(value,allowZero)
    {
        let r = false;
        
        if(this.is(value))
        {
            value = this.cast(value);
            
            if(value > 0 || (allowZero === true && value === 0))
            r = true;
        }
        
        return r;
    },
    
    
    // isNegative
    // retourne vrai si c'est une variable numérique positive (< 0)
    // si allowZero est true, retourne true si zero
    isNegative: function(value,allowZero)
    {
        let r = false;
        
        if(this.is(value))
        {
            value = this.cast(value);
            
            if(value < 0 || (allowZero === true && value === 0))
            r = true;
        }
        
        return r;
    },
    
    
    // isOdd
    // vérifie que la valeur est un chiffre impair
    isOdd: function(value)
    {
        return (this.is(value) && !Integer.is(value / 2));
    },
    
    
    // isEven
    // vérifie que la valeur est un chiffre pair
    isEven: function(value)
    {
        return (this.is(value) && Integer.is(value / 2));
    },
    
    
    // isNan
    // retourne vrai si la valeur est nan
    isNan: function(value)
    {
        return isNaN(value);
    },
    
    
    // cast
    // retourne la variable sous forme de nombre
    cast: function(value)
    {
        return (Scalar.isNotBool(value) && value !== '')? parseFloat(value):null;
    },
    
    
    // str
    // retourne le nombre sous forme de string
    str: function(value)
    {
        this.typecheck(value);
        return Number(value).toString();
    }
}


// numFormat
// contient des méthodes pour formatter un chiffre
const NumFormat = {
    
    // decimal
    // permet de formatter un nombre en forçant le nombre de décimal
    decimal: function(value,decimal)
    {
        this.typecheck(value);
        decimal = (Integer.is(decimal))? decimal:2;
        
        return value.toFixed(decimal);
    },

    // round
    // arrondi le nombre sous forme de int
    round: function(value)
    {
        value = this.cast(value);
        this.typecheck(value);

        return Math.round(value);
    },
    
    
    // floor
    // amène le nombre au int plus petit
    floor: function(value)
    {
        value = this.cast(value);
        this.typecheck(value);
        
        return Math.floor(value);
    },
    
    
    // ceil
    // amène le nombre au int plus grand
    ceil: function(value)
    {
        value = this.cast(value);
        this.typecheck(value);
        
        return Math.ceil(value);
    }
}

// export
export { NumPrimitive, NumFormat };