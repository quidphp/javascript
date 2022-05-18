/*
 * This file is part of the QuidPHP package <https://quidphp.com>
 * Author: Pierre-Philippe Emond <emondpph@gmail.com>
 * License: https://github.com/quidphp/javascript/blob/master/LICENSE
 */
 
// html
// script containing event listeners functions for target elements

// import
import { Arr, Bool, Pojo, Str, Vari } from '../index.js';

// export
export default {
    
    // valueAttr
    // retourne l'attribut à utiliser pour la valeur d'un tag selflcosing
    valueAttr: {
        br: 'data-value',
        hr: 'data-value',
        img: 'src',
        meta: 'content',
        link: 'href',
        input: 'value'
    },
    
    
    // htmlEscapes
    // convertiseur pour les caractères html à escape
    htmlEscapes: {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    },
    
    
    // isSelfClosing
    // retourne vrai si la balise se ferme dans l'ouverture
    isSelfClosing: function(tag) 
    {
        return Arr.in(tag,['br','hr','img','meta','link','input'])
    },
    
    
    // escape
    // permet de faire un escape des caractères html dangereux sur une string
    // transforme < > ' " &
    escape: function(value)
    {
        let r = null;
        const $inst = this;
        Str.typecheck(value);
        
        return value.replace(/[&<>"']/g,function(value) {
            return $inst.htmlEscapes[value];
        });
    },
    
    
    // start
    // ouvre une tag html
    start: function(tag,value,attr) 
    {
        let r = '';
        Str.typecheck(tag,true);
        const isSelfClosing = this.isSelfClosing(tag);
        const attrStr = this.attr(attr,tag,value);
        
        r += "<";
        r += tag;
        
        if(Str.isNotEmpty(attrStr))
        {
            r += " ";
            r += attrStr;
        }
        
        if(isSelfClosing === true)
        r += "/>";
        
        else
        {
            r += ">";
            r += this.value(value);
        }
        
        return r;
    },
    
    
    // end
    // ferme une tag html
    end: function(tag) 
    {
        let r = '';
        Str.typecheck(tag,true);
        const isSelfClosing = this.isSelfClosing(tag);
        
        if(isSelfClosing === false)
        {
            r += "</";
            r += tag;
            r += ">";
        }
        
        return r;
    },
    
    
    // value
    // permet de préparer la valeur du input
    value: function(value,isAttr)
    {
        if(value === true)
        value = (isAttr === true)? 1:'&nbsp;';
        
        else if(value === false)
        value = (isAttr === true)? 0:'';
        
        if(isAttr !== true)
        {
            if(Pojo.is(value))
            value = Pojo.values(value);
            
            if(Arr.is(value))
            value = value.join(', ');
        }
        
        return Str.cast(value,true);
    },
    
    
    // attr
    // génère la string d'attribut pour la balise
    // possible de fournir une tag et une valeur
    attr: function(attr,tag,value)
    {
        let r = '';
        const isSelfClosing = this.isSelfClosing(tag);
        attr = this.attrToPojo(attr);
        
        if(isSelfClosing === true && Pojo.keyExists(tag,this.valueAttr))
        {
            const valueAttr = Pojo.get(tag,this.valueAttr);
            
            if(valueAttr != null)
            {
                const current = Pojo.get(valueAttr,attr);
                
                if(current == null || value != null)
                attr[valueAttr] = this.value(value,true);
            }
        }
        
        attr = this.prepareAttr(attr);
        r = Pojo.str(attr,"="," ",true);
        
        return r;
    },
    
    
    // attrToPojo
    // permet de transformer un argument attr en pojo
    attrToPojo: function(attr)
    {
        let r = {};
        
        if(Str.isNotEmpty(attr))
        r = {class: attr};
        
        if(Pojo.is(attr))
        r = attr;
        
        return r;
    },
    
    
    // prepareAttr
    // utilisé pour préparer un objet attr
    // remplace les clés camelcase
    // gestion de la clé data contenant un objet
    // gestion des classes en tableau
    prepareAttr: function(attr)
    {
        let r = {};
        Pojo.typecheck(attr);
        
        const defaultKeyValue = function(key,value) {
            return {
                key: Str.fromCamelCase('-',key),
                value: (Bool.is(value))? Bool.toInt(value):value
            } 
        };
        
        Pojo.each(attr,function(value,key) {
            const keyValue = defaultKeyValue(key,value);
            key = keyValue.key;
            value = keyValue.value;
            
            if(key === 'class' && Arr.is(value))
            value = value.join(' ');
            
            else if(key === 'data' && Pojo.is(value))
            {
                Pojo.each(value,function(value2,key2) {
                    const keyValue2 = defaultKeyValue(key2,value2);
                    const newKey = 'data-'+keyValue2.key;
                    r[newKey] = keyValue2.value;
                });
                value = null;
            }
            
            if(value != null)
            r[key] = value;
        });
        
        return r;
    },
    
    
    // tag
    // ouvre et ferme une tag avec contenu et attribut
    tag: function(tag,value,attr) 
    {
        return this.start(tag,value,attr)+this.end(tag);
    },
    
    
    // tagCond
    // ouvre et ferme une tag avec contenu et attribut seulement si la valeur n'est pas vide
    tagCond: function(tag,value,attr)
    {
        return (Vari.isNotEmpty(this.value(value)))? this.tag(tag,value,attr):'';
    },
    
    
    // div
    // ouvre et ferme une tag div avec contenu et attribut
    div: function(value,attr) 
    {
        return this.tag('div',value,attr);
    },
    
    
    // span
    // ouvre et ferme une tag span avec contenu et attribut
    span: function(value,attr) 
    {
        return this.tag('span',value,attr);
    },
    
    
    // ul
    // ouvre et ferme une tag ul avec contenu et attribut
    ul: function(value,attr) 
    {
        return this.tag('ul',value,attr);
    },
    
    
    // li
    // ouvre et ferme une tag li avec contenu et attribut
    li: function(value,attr) 
    {
        return this.tag('li',value,attr);
    },
    
    
    // input
    // ouvre et ferme une tag input avec valeur et attribut
    input: function(value,attr) 
    {
        return this.tag('input',value,Pojo.replace({type: 'text'}, this.attrToPojo(attr)));
    },
    
    
    // button
    // ouvre et ferme une tag button avec contenu et attribut
    button: function(value,attr) 
    {
        return this.tag('button',value,Pojo.replace({type: 'button'}, this.attrToPojo(attr)));
    }
}