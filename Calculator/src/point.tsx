import React, { useState, useRef, useEffect, useCallback } from 'react'
function PointSet({onSetPoint}){
    const [sendData, setSendData] = useState('F');
    const btnObj1 = useRef(null);
    const btnObj2 = useRef(null);
    const btnObj3 = useRef(null);
    const btnObj4 = useRef(null);
    const btnObj5 = useRef(null);

    // const stableOnSetPoint = useCallback(onSetPoint, []); 

    useEffect(()=>{
        const btnList = [btnObj1.current, btnObj2.current, btnObj3.current, btnObj4.current, btnObj5.current];
        btnList.forEach(( element, index, array )=>{
            if(element.value === sendData){
                element.classList.add('active');
            }else{
                element.classList.remove('active');

            }
        })

        onSetPoint(sendData);
    },[sendData])
    
    const getPoint=( pointVal )=>{
        setSendData( pointVal );
    }
    return(
        <>
            <button type="button" value='F' ref={btnObj1} onClick={(e)=>{ getPoint(e.target.value)}}>F</button>
            <button type="button" value='4' ref={btnObj2} onClick={(e)=>{ getPoint(e.target.value)}}>4</button>
            <button type="button" value='3' ref={btnObj3} onClick={(e)=>{ getPoint(e.target.value)}}>3</button>
            <button type="button" value='2' ref={btnObj4} onClick={(e)=>{ getPoint(e.target.value)}}>2</button>
            <button type="button" value='0' ref={btnObj5} onClick={(e)=>{ getPoint(e.target.value)}}>0</button>
        </>
    )
}

export default PointSet;
