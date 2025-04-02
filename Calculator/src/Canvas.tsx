import React, { useState, useRef, useEffect} from 'react'
import List from './Graph.tsx'
import { FaPlus, FaMinus } from "react-icons/fa";
import { SlArrowDown, SlArrowUp,  SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiResetLeftFill } from "react-icons/ri";

function Canvas2(){
    const canObj = useRef(null);
    const [listObj, setListObj] = useState([]);
    const [graphList, setGraphList] = useState([]);
    const [moveX, setMoveX] = useState(0);
    const [moveY, setMoveY] = useState(0);
    const [scaleV, setScaleV] = useState(30);
    useEffect(()=>{
        
        const can = canObj.current;
        const pen = can.getContext('2d');
        pen.clearRect(0, 0, can.width, can.height);
        let sc = scaleV;
        // 중앙선 잡음
        const printDot = (x: number = 0, y: number = 0, w: number = 1, h: number = 1)=>{
            pen.fillRect(
                x + (can.width / 2) + (moveX * sc),
                (y *-1) + (can.height / 2) + (moveY* sc),
                w, h )
        }
        // 중앙선 잡는함수
        const initXY=()=>{
            pen.fillStyle = '#152A3F';
            pen.font ='10px Arial';
            pen.textAlign = "center";


            for (let i = (can.width)*-1; i <= (can.width); i++) {
                printDot(i, 0);
                printDot(0, i);
                if(i % sc === 0){
                    printDot(i, 2, 1, 5);
                    printDot(-2, i, 5, 1);

                    // pen.textAlign = "center";
                    pen.fillText(i/sc , i + (can.width / 2) + (moveX * sc) , 15 + (can.height / 2) + (moveY* sc) );
                    if(i !== 0 ){
                        pen.fillText((i/sc)*-1 , 15 + (can.width / 2) + (moveX* sc) , i + 5 + (can.height / 2) + (moveY * sc) );
                    }

                }
            }
            // for (let i = (can.height)*-2; i <= (can.height)*2; i++) {
            //     printDot(0, i);
            //     if(i % sc === 0){
            //         printDot(-2, i, 5, 1);
            //         pen.fillText(i/sc , 10 + (can.width / 2) + (moveX* sc) , i + 10 + (can.height / 2) + (moveY * sc) )
            //     }
            // }
        }
        // 선 그리는 함수
        const createG = ( obj ) => {
            pen.fillStyle = obj.color;
            
            const drawStraight=()=>{
                for (let x = (can.width/2)*-1; x <= (can.width/2); x = x + (1/sc)) {
                    let y = ( obj.a * x )+ (obj.b);
                    printDot(x* sc, y* sc);
                }
            }
            const drawOneCurve=()=>{
                for (let x = (can.width)*-1; x <= (can.width); x = x + (1/sc)) {
                    let y = ( obj.a * (x**2) ) + ( obj.b * x ) + obj.c;
                    printDot(x * sc, y * sc);
                }
                
            }
            const drawTwoCurve=()=>{
                for (let x = (can.width/2)*-1; x <= (can.width/2); x = x + (1/sc)) {
                    let y = ( obj.a * (x**3) ) + ( obj.b * (x**2) ) + ( obj.c * x )+( obj.d );
                    printDot(x * sc, y * sc);
                }
            }
            const drawThreeCurve=()=>{
                for (let x = (can.width/2)*-1; x <= (can.width/2); x = x + (1/sc)) {
                    let y = ( obj.a * (x**4) ) + ( obj.b * (x**3) ) + ( obj.c * (x**2) )+( obj.d * x )+( obj.e);
                    printDot(x * sc, y * sc);
                }
            }
            const drawcCircle=()=>{
                printDot( obj.x * sc, obj.y * sc );
                const dTor = Math.PI / 180 ;
                for (let d = 0; d <=360; d = d + (1)) {
                    let x = obj.x * sc +  (obj.r * Math.cos(dTor * d) *sc);
                    let y = obj.y * sc +  (obj.r * Math.sin(dTor * d) *sc);
                    printDot( x, y );
                }
            }
            
            switch( obj.type ){
                case 'straight' : drawStraight();
                    break;
                case 'one-curve' : drawOneCurve();
                    break;
                case 'two-curve' : drawTwoCurve();
                    break;
                case 'three-curve' : drawThreeCurve();
                    break;
                case 'circle' : drawcCircle();
                    break;
            }

            pen.fillStyle = '#000000';
        }
        // 랜더 하는 함수
        const renderItem = ( obj ) => {
            let t: string = '';
            let s: any[]=[];
            // console.log(Object.keys(obj).length )
            if( Object.keys(obj).length === 6 ){
                    t = 'f(x) = ';
                    if(obj.a !== 0) s.push( <>( {obj.a} )x</>)
                    if(obj.a !== 0 && obj.b !== 0) s.push( <>+</>)
                    if(obj.b !== 0) s.push( <>( {obj.b} )</>)
                
            }
            if( Object.keys(obj).length === 7 ){
                if('r' in obj){
                    console.log('cirrle')
                    t = `${obj.r}<sup>2</sup> = `;
                    s.push(
                        <>
                            ( {obj.x} )<sup>2</sup> +
                            ( {obj.y} )<sup>2</sup>   
                        
                        </>
                    );
                }else{
                    t = 'f(x) = ';
                    if(obj.a !== 0) s.push( <> ( {obj.a} )x<sup>2</sup> </>)
                    if(obj.a !== 0 && obj.b !== 0) s.push( <> + </>)
                    if(obj.b !== 0) s.push( <> ( {obj.b} )x</>)
                    if((obj.b !== 0 || obj.a !== 0) && obj.c !== 0 ) s.push( <> + </> )
                    if(obj.c !== 0) s.push( <> ( {obj.c} ) </> )
                }
            }
            if( Object.keys(obj).length === 8 ){
                t = 'f(x) = ';
                if(obj.a !== 0) s.push( <> ( {obj.a} )x<sup>3</sup> </>)
                if(obj.a !== 0 && obj.b !== 0) s.push( <> + </>)
                if(obj.b !== 0) s.push( <> ( {obj.b} )x<sup>2</sup> </>)
                if((obj.b!== 0 || obj.a !== 0) && obj.c !== 0 ) s.push( <> + </> )
                if(obj.c !== 0) s.push( <> ( {obj.c} )x</>)
                if((obj.c !== 0 || obj.b !== 0 || obj.a !== 0) && obj.d !== 0 ) s.push( <> + </> )
                if(obj.d !== 0) s.push( <> ( {obj.d} ) </> )
            }
            if( Object.keys(obj).length === 9 ){
                t = 'f(x) = ';
                if(obj.a !== 0) s.push( <> ( {obj.a} )x<sup>4</sup> </>);
                if(obj.a !== 0 && obj.b !== 0) s.push( <> + </>);
                if(obj.b !== 0) s.push( <> ( {obj.b} )x<sup>3</sup> </>);
                if((obj.b!== 0 || obj.a !== 0) && obj.c !== 0 ) s.push( <> + </>);
                if(obj.c !== 0) s.push( <> ( {obj.c} )x<sup>2</sup> </>);
                if((obj.c !== 0 || obj.b!== 0 || obj.a !== 0) && obj.d !== 0 ) s.push( <> + </> );
                if(obj.d !== 0) s.push( <> ( {obj.d} )x</>);
                if((obj.d !== 0||obj.c !== 0 || obj.b !== 0 || obj.a !== 0) && obj.e !== 0 ) s.push( <> + </> );
                if(obj.e !== 0) s.push( <> ( {obj.e} ) </> );
            }
            return(
                <div className="inListItem">
                    <span dangerouslySetInnerHTML={{ __html: t }}></span>
                    <span>
                        {s}
                    </span>
                    <span className="viewColor">
                        <input type="color" value={obj.color} disabled />

                    </span>
                    <span className="delB">
                        <button type="button" onClick={ ()=> obj.f(obj.id) }>del</button>
                    </span>
                </div>
            )

        }
        initXY();

        let data: any[]=[];
        for(let object of graphList){
            createG(object);
            data.push( renderItem(object) );
        }
        setListObj((prev)=> data );

    },[moveX, moveY, scaleV, graphList])

    const setMove = ( po, value ) => {
        switch (po) {
            case 'x':
                setMoveX((prev)=> prev + value );
                break;
            case 'y':
                    setMoveY((prev)=> prev + value );
                break;
        }
    }
    const setScale = ( value ) => {
        if(scaleV + value < 30){ setScaleV((prev)=> prev) }
        else if(scaleV + value > 201){ setScaleV((prev)=> prev)  }
        else{ setScaleV((prev)=> prev + value)  }
    }
    const setReset = ( ) => {
        setMoveX(0)
        setMoveY(0)
        setScaleV(30)
    }
    const getGraphList=( items )=>{
        // console.log('부모 쪽에서 받음')
        // console.log(items)
        setGraphList( items )
    }
    return(
        <>
            <div id='can_area' className='can_area'>
                <canvas ref={canObj} id='can' className='can' width='700' height='500'></canvas>
                <div className="move_area" id="move_area">
                    <button type="button" className='move up' onClick={()=>setMove('y', 1)}><SlArrowUp/></button>
                    <button type="button" className='move donw' onClick={()=>setMove('y', -1)}><SlArrowDown/></button>
                    <button type="button" className='move right' onClick={()=>setMove('x', -1)}><SlArrowLeft/></button>
                    <button type="button" className='move left' onClick={()=>setMove('x', 1)}><SlArrowRight/></button>
                    <button type="button" className='move reset' onClick={()=>setReset()}> <RiResetLeftFill/> </button>
                    <button type="button" className='move zoomIn' onClick={()=>setScale(10)}><FaPlus/></button>
                    <button type="button" className='move zoomOut' onClick={()=>setScale(-10)}><FaMinus/></button>
                </div>
            </div>
            <div className='draw_info'>
                <div className="view_listArea">
                    {listObj}

                </div>
                <div className="addArea">
                        <List getCan={canObj} onGetData={( items )=>{getGraphList(items)}}/>
                </div>
            </div>
        </>
    )
}

export default Canvas2;
