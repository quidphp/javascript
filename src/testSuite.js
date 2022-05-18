/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */
 
// testSuite
// script with a method to run a suite of tests

// import
import { Pojo } from '../index.js';

// export
export default function(value) 
{
    return Pojo.each(value,function(suite,key) {
        return suite();
    });
}