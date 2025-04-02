import React, { useState, useRef, useEffect } from 'react'
function RdianTodegree({onSetDtR}){
    const [check, setCheck] = useState(true);
    const [select, setSelect] = useState('degree');
    const radioObj1 = useRef(null);
    const radioObj2 = useRef(null);


    useEffect(()=>{
        onSetDtR(select);
    },[select, check])
    
    const clickChecked=( id )=>{
        if (select !== id){
            console.log( id, select)
            setSelect( id );
            setCheck((prev)=> !prev );
        }
    }
    return(
        <>
            <label>
                <input type="radio" name="rtd" className='rtd' id="degree" ref={radioObj1} checked={check} onClick={ (e) => clickChecked(e.target.id)}/> 
                Degree
            </label>
            <label>
                <input type="radio" name="rtd" className='rtd' id="radian" ref={radioObj2} checked={!check} onClick={ (e) => clickChecked(e.target.id)}/>
                Radian
            </label>
        </>
    )
}

export default RdianTodegree;
