/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/node/blob/master/LICENSE
 */
 
// debug
// script with functions related to debugging

// import
import { Scalar } from '../index.js';

// export
export default new function()
{   
    // status debug, peut être scalar
    let debug = false;
    
    
    // status
    // active ou désactive le débogagge
    this.status = (function()
    {
        return function(value) {
            if(Scalar.is(value))
            debug = value;
            
            return debug;
        }
    })()
    
    
    // is
    // retourne vrai si la valeur pour le débogagge est le même
    this.is = function(value)
    {
        return debug === true || debug === value;
    }
    
    
    // assertThrow
    // comme assert mais lance une erreur
    this.assertThrow = function(value) 
    {
        if(value !== true)
        throw new Error();
    },
    
    
    // logError
    // permet de logger une erreur
    this.logError = function(value)
    {
        console.error('Catched',value);
    }
}